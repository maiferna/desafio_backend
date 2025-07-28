// IMPORTS
const { dbQuery } = require("./dbQueryUtil.js")
const bcrypt = require("bcryptjs");

const createRuta = async () => {
  const admin = await dbQuery(`
  SELECT id_usuario FROM usuarios WHERE role = 'admin' LIMIT 1;
`);
  const tecnico = await dbQuery(`
  SELECT id_usuario FROM usuarios WHERE role = 'tecnico' LIMIT 1;
`);

  // Chequear que existan, si no lanzar error o crear
  if (admin.rows.length === 0 || tecnico.rows.length === 0) throw new Error('Faltan usuarios admin o técnico');
  const idAdmin = admin.rows[0].id_usuario;
  const idTecnico = tecnico.rows[0].id_usuario;

  const instalaciones = await dbQuery(`
  SELECT id_instalacion FROM instalaciones ORDER BY RANDOM() LIMIT 4;
`);

  if (instalaciones.rows.length < 4) throw new Error('No hay suficientes instalaciones');

  const instalacionesIds = instalaciones.rows.map(row => row.id_instalacion);

  const fechaRuta = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  const rutaRes = await dbQuery(`
  INSERT INTO rutas (tecnico_responsable, tecnico, fecha)
  VALUES ($1, $2, $3)
  RETURNING id_ruta;
`, [idAdmin, idTecnico, fechaRuta]);

  const idRuta = rutaRes.rows[0].id_ruta;

  for (const idInstalacion of instalacionesIds) {
    await dbQuery(`
    INSERT INTO visitas (id_instalacion, id_ruta, estado)
    VALUES ($1, $2, 'Pendiente');
  `, [idInstalacion, idRuta]);
  }
  const visitas = await dbQuery(`
  SELECT id_visita, id_instalacion FROM visitas WHERE id_ruta = $1;
`, [idRuta]);

  // Puedes saltarte este paso si ya tienes estos servicios creados
  await dbQuery(`
  INSERT INTO servicios (nombre, descripcion, datos) VALUES
  (
    'Inspección Roedores',
    'Control y monitoreo de roedores',
    '{
      "tipo_cebadero": null,
      "numero_cebaderos": null,
      "actividad_detectada": null
    }'::jsonb
  ),
  (
    'Inspección Insectos',
    'Control y monitoreo de insectos',
    '{
      "tipo_trampa": null,
      "numero_trampas": null,
      "zonas_afectadas": null
    }'::jsonb
  ),
  (
    'Control Legionela',
    'Análisis y control de legionela',
    '{
      "temperatura_agua": null,
      "cloro_libre": null,
      "biofilm": null
    }'::jsonb
  );
`);
  const servicios = await dbQuery(`
  SELECT id_servicio, nombre FROM servicios WHERE nombre IN ('Inspección Roedores', 'Inspección Insectos', 'Control Legionela');
`);
  const serviciosMap = {};
  for (const row of servicios.rows) {
    serviciosMap[row.nombre] = row.id_servicio;
  }
  const serviciosTipos = ['Inspección Roedores', 'Inspección Insectos', 'Control Legionela'];

  for (const visita of visitas.rows) {
    // Elegir aleatoriamente 1-3 servicios
    const numServicios = Math.floor(Math.random() * 3) + 1;
    const serviciosSeleccionados = serviciosTipos.sort(() => 0.5 - Math.random()).slice(0, numServicios);

    for (const servicioNombre of serviciosSeleccionados) {
      const idServicio = serviciosMap[servicioNombre];

      // Insert ejecucion_servicio
      const ejecucionRes = await dbQuery(`
      INSERT INTO ejecuciones_servicios (id_visita, id_servicio, observaciones)
      VALUES ($1, $2, $3)
      RETURNING id_ejecucion_servicio;
    `, [visita.id_visita, idServicio, `Ejecución de servicio de ${servicioNombre} en la instalación ${visita.id_instalacion}`]);

      const idEjecucion = ejecucionRes.rows[0].id_ejecucion_servicio;

      let detalles = {};

      if (servicioNombre === 'Inspección Roedores') {
        detalles = {
          tipo_cebadero: 'Cebo bloque',
          numero_cebaderos: Math.floor(Math.random() * 10) + 1,
          actividad_detectada: Math.random() < 0.5
        };
      } else if (servicioNombre === 'Inspección Insectos') {
        detalles = {
          tipo_trampa: 'Trampa adhesiva',
          numero_trampas: Math.floor(Math.random() * 15) + 1,
          zonas_afectadas: 'Almacén, Cocina'
        };
      } else if (servicioNombre === 'Control Legionela') {
        detalles = {
          temperatura_agua: parseFloat((20 + Math.random() * 10).toFixed(2)),
          cloro_libre: parseFloat((0.1 + Math.random() * 1).toFixed(2)),
          biofilm: Math.random() < 0.5
        };
      }

      // Update la ejecución con los detalles JSON
      await dbQuery(`
        UPDATE ejecuciones_servicios
        SET observaciones = $1, datos = $2
        WHERE id_ejecucion_servicio = $3;
      `, [
        `Ejecución de servicio de ${servicioNombre} en la instalación ${visita.id_instalacion}`,
        detalles,
        idEjecucion
      ]);


      // Insertar productos usados (aleatorio 1-3 productos)
      const productos = await dbQuery(`
      SELECT id_producto FROM productos ORDER BY RANDOM() LIMIT 3;
    `);
      for (const prod of productos.rows) {
        const cantidad = Math.floor(Math.random() * 10) + 1;
        await dbQuery(`
        INSERT INTO ejecucion_productos (id_ejecucion_servicio, id_producto, cantidad)
        VALUES ($1, $2, $3);
      `, [idEjecucion, prod.id_producto, cantidad]);
      }

      // Añadir entre 1 y 3 puntos de control nuevos en la instalación de la visita
      const numPuntos = Math.floor(Math.random() * 3) + 1;

      for (let i = 0; i < numPuntos; i++) {
        // Para crear un punto de control necesitamos id_producto y grupo. Tomamos aleatoriamente grupo y producto
        const grupo = await dbQuery(`SELECT id_grupo_punto_control FROM grupos_punto_control ORDER BY RANDOM() LIMIT 1;`);
        const productoPunto = await dbQuery(`SELECT id_producto FROM productos WHERE tipo='trampa' ORDER BY RANDOM() LIMIT 1;`);
        await dbQuery(`
        INSERT INTO puntos_de_control (id_producto, id_instalacion, id_grupo_punto_control, localizacion, coordenadas)
        VALUES ($1, $2, $3, $4, $5);
      `, [productoPunto.rows[0].id_producto, visita.id_instalacion, grupo.rows[0].id_grupo_punto_control, `Zona ${i + 1}`, '43.3,-2.7']);
      }
    }
  }

}

const dbInit = async () => {
  try {
    // 1. Borrar tablas
    await dbQuery(`
      DO $$
      DECLARE
          r RECORD;
      BEGIN
          FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
              EXECUTE 'DROP TABLE IF EXISTS public.' || quote_ident(r.tablename) || ' CASCADE';
          END LOOP;
      END $$;
    `);

    // 2. Crear tablas
    await dbQuery(`
      CREATE TABLE clientes (
        id_cliente INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        tel VARCHAR(20) NOT NULL,
        direccion VARCHAR(100) NOT NULL,
        sector VARCHAR(50) NOT NULL
      );

      CREATE TABLE estados_punto_control (
        id_estado_punto_control INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        nombre VARCHAR(50) NOT NULL,
        color VARCHAR(20)  NOT NULL
      );

      CREATE TABLE plagas (
        id_plaga INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL
      );

      CREATE TABLE grupos_punto_control (
        id_grupo_punto_control INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        figura TEXT
      );

      CREATE TABLE productos (
        id_producto INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        descripcion TEXT,
        tipo VARCHAR(50) NOT NULL,
        unidad VARCHAR(20) NOT NULL
      );
    
      CREATE TABLE usuarios (
        id_usuario INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        id_cliente INT REFERENCES clientes(id_cliente) ON DELETE CASCADE,
        nombre VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL
      );

      CREATE TABLE instalaciones (
        id_instalacion INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        id_cliente INT REFERENCES clientes(id_cliente) ON DELETE CASCADE,
        nombre VARCHAR(100) NOT NULL,
        direccion VARCHAR(255) NOT NULL,
        latitud VARCHAR(20) NOT NULL,
        longitud VARCHAR(20) NOT NULL,
        localidad VARCHAR(50),
        puntos_control VARCHAR(100) NOT NULL,
        image VARCHAR(255)
      );

      CREATE TABLE servicios (
        id_servicio INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        descripcion TEXT,
        -- otros campos comunes se pueden añadir aquí si los defines más adelante
         datos JSONB
      );

      CREATE TABLE puntos_de_control (
        id_punto_control INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        id_producto INT REFERENCES productos(id_producto) ON DELETE SET NULL,
        id_instalacion INT REFERENCES instalaciones(id_instalacion) ON DELETE CASCADE,
        id_grupo_punto_control INT REFERENCES grupos_punto_control(id_grupo_punto_control) ON DELETE SET NULL,
        localizacion VARCHAR(100),
        coordenadas TEXT
      );

      CREATE TABLE rutas (
        id_ruta INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        tecnico_responsable INT REFERENCES usuarios(id_usuario) ON DELETE SET NULL,
        tecnico INT REFERENCES usuarios(id_usuario) ON DELETE SET NULL,
        tecnico_asistente INT REFERENCES usuarios(id_usuario) ON DELETE SET NULL,
        fecha DATE NOT NULL
      );
    
      CREATE TABLE visitas (
        id_visita INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        id_instalacion INT REFERENCES instalaciones(id_instalacion) ON DELETE CASCADE,
        id_ruta INT REFERENCES rutas(id_ruta) ON DELETE CASCADE,
        estado VARCHAR(50) NOT NULL
      );

      CREATE TABLE ejecuciones_servicios (
        id_ejecucion_servicio INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        id_visita INT REFERENCES visitas(id_visita) ON DELETE CASCADE,
        id_servicio INT REFERENCES servicios(id_servicio) ON DELETE CASCADE,
        observaciones TEXT,
        datos JSONB
      );

      CREATE TABLE ejecucion_productos (
        id_ejecucion_producto INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        id_ejecucion_servicio INT REFERENCES ejecuciones_servicios(id_ejecucion_servicio) ON DELETE CASCADE,
        id_producto INT REFERENCES productos(id_producto) ON DELETE SET NULL,
        cantidad NUMERIC NOT NULL
      );

      CREATE TABLE capturas (
        id_captura INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        id_plaga INT REFERENCES plagas(id_plaga) ON DELETE SET NULL,
        id_punto_control INT REFERENCES puntos_de_control(id_punto_control) ON DELETE CASCADE,
        id_ejecucion_servicio INT REFERENCES ejecuciones_servicios(id_ejecucion_servicio) ON DELETE CASCADE,
        cantidad INTEGER NOT NULL,
        observaciones TEXT
      );

      CREATE TABLE historial_estado_punto_control (
        id_historial_estado_punto_control INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        id_estado_punto_control INT REFERENCES estados_punto_control(id_estado_punto_control) ON DELETE SET NULL,
        id_punto_control INT REFERENCES puntos_de_control(id_punto_control) ON DELETE CASCADE,
        id_ejecucion_servicio INT REFERENCES ejecuciones_servicios(id_ejecucion_servicio) ON DELETE CASCADE,
        observaciones TEXT
      );
    `);

    const clientes = [
      {
        nombre: 'Viñas, Cuevas and Ponce',
        email: 'contacto@vinascuevasponce.com',
        tel: '809-555-1001',
        direccion: 'Av. Independencia 123, Santo Domingo',
        sector: 'Zona Colonial'
      },
      {
        nombre: 'Arco PLC',
        email: 'info@arcoplc.com',
        tel: '809-555-1002',
        direccion: 'Calle El Sol 45, Santiago',
        sector: 'Centro'
      },
      {
        nombre: 'Ferrero, Gomez and Cervantes',
        email: 'servicio@fgc.com',
        tel: '809-555-1003',
        direccion: 'Carr. Duarte km 5, La Vega',
        sector: 'La Primavera'
      },
      {
        nombre: 'Simó-Arrieta',
        email: 'contacto@simoarrieta.com',
        tel: '809-555-1004',
        direccion: 'Av. 27 de Febrero 789, Santo Domingo',
        sector: 'Evaristo Morales'
      },
      {
        nombre: 'Carnero, Carrión and Santamaría',
        email: 'admin@ccs.com',
        tel: '809-555-1005',
        direccion: 'Calle Las Palmas 12, San Cristóbal',
        sector: 'Centro Histórico'
      }
    ];

    for (const cliente of clientes) {
      await dbQuery(`
    INSERT INTO clientes (nombre, email, tel, direccion, sector)
    VALUES ($1, $2, $3, $4, $5)
  `, [cliente.nombre, cliente.email, cliente.tel, cliente.direccion, cliente.sector]);
    }

    // Insertar usuarios
    const usuarios = [
      [null, 'Jefe', 'admin@email.com', 'Admin123', 'admin'],
      [null, 'Técnico', 'tecnico@email.com', 'Tecnico123', 'tecnico'],
      [null, 'Hermenegildo Company Gomez', 'joaquin70@samper-lledo.com', 'Admin123', 'admin'],
      [null, 'Almudena Sandra Botella Maestre', 'bermudezpriscila@hotmail.com', 'Tecnico123', 'tecnico'],
      [null, 'Lorena Macías Silva', 'fuentesmaricruz@gmail.com', 'Tecnico123', 'tecnico'],
      [null, 'Emilio Piña Aliaga', 'glauco23@yahoo.com', 'Tecnico123', 'tecnico'],
      [null, 'Vito Pineda Casals', 'ssanmartin@sanjuan-vazquez.es', 'Tecnico123', 'tecnico'],
      [null, 'Patricia Rosa Conesa', 'maricruzbarral@rivera.es', 'Tecnico123', 'tecnico'],
      [null, 'Candelaria Morán Solera', 'vivesmarc@carrasco-lopez.com', 'Tecnico123', 'tecnico'],
      [null, 'Apolonia Losada Blázquez', 'roberto09@hotmail.com', 'Tecnico123', 'tecnico'],
      [null, 'Virgilio Montaña Menendez', 'ctellez@gmail.com', 'Tecnico123', 'tecnico'],
      [null, 'Ileana Vargas Hidalgo', 'segismundo63@novoa.com', 'Tecnico123', 'tecnico'],
      [null, 'Lucio Martín Gallart', 'saturnina21@hotmail.com', 'Tecnico123', 'tecnico'],
      [1, 'Emiliana Arteaga-Estévez', 'mirta52@canales-marquez.com', 'Cliente123', 'cliente'],
      [2, 'Andrés Giner', 'nereida83@fernandez.com', 'Cliente123', 'cliente'],
      [3, 'Ricarda Naranjo Carreño', 'iker83@leon.es', 'Cliente123', 'cliente'],
      [4, 'Juan Pablo Plana Ureña', 'emperatrizcapdevila@hotmail.com', 'Cliente123', 'cliente'],
      [5, 'Jesús Fabio Galán Arregui', 'martafigueras@hotmail.com', 'Cliente123', 'cliente'],
      [5, 'Cliente', 'cliente@email.com', 'Cliente123', 'cliente'],
    ];

    for (const [id_cliente, nombre, email, password, role] of usuarios) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await dbQuery(
        `INSERT INTO usuarios (id_cliente, nombre, email, password_hash, role)
     VALUES ($1, $2, $3, $4, $5)`,
        [id_cliente, nombre, email, hashedPassword, role]
      );
    }

    /* const direcciones = [
      // La Rioja
      { direccion: 'Calle Laurel 12, Logroño', provincia: 'La Rioja', latitud: '42.4667', longitud: '-2.45' },
      { direccion: 'Avenida de la Paz 45, Calahorra', provincia: 'La Rioja', latitud: '42.3050', longitud: '-1.9650' },
      { direccion: 'Plaza del Ayuntamiento 3, Haro', provincia: 'La Rioja', latitud: '42.5750', longitud: '-2.8469' },
      { direccion: 'Calle Mayor 18, Alfaro', provincia: 'La Rioja', latitud: '42.1800', longitud: '-1.7500' },
      { direccion: 'Camino de los Picos 22, Nájera', provincia: 'La Rioja', latitud: '42.4172', longitud: '-2.7333' },
      // Castilla y León
      { direccion: 'Calle Santiago 14, Burgos', provincia: 'Castilla y León', latitud: '42.3439', longitud: '-3.6969' },
      { direccion: 'Plaza Mayor 1, Valladolid', provincia: 'Castilla y León', latitud: '41.6529', longitud: '-4.7286' },
      { direccion: 'Calle Real 33, León', provincia: 'Castilla y León', latitud: '42.5987', longitud: '-5.5671' },
      { direccion: 'Av. Reyes Católicos 21, Salamanca', provincia: 'Castilla y León', latitud: '40.9701', longitud: '-5.6635' },
      { direccion: 'Polígono Montalvo III, Nave 8, Carbajosa', provincia: 'Castilla y León', latitud: '40.9478', longitud: '-5.6550' },
      // País Vasco
      { direccion: 'Gran Vía 50, Bilbao', provincia: 'País Vasco', latitud: '43.2630', longitud: '-2.9350' },
      { direccion: 'Calle Dato 11, Vitoria-Gasteiz', provincia: 'País Vasco', latitud: '42.8467', longitud: '-2.6728' },
      { direccion: 'Paseo de la Zurriola 22, San Sebastián', provincia: 'País Vasco', latitud: '43.3261', longitud: '-1.9787' },
      { direccion: 'Polígono Ugaldeguren III, Zamudio', provincia: 'País Vasco', latitud: '43.3050', longitud: '-2.8800' },
      { direccion: 'Av. Navarra 30, Irun', provincia: 'País Vasco', latitud: '43.3396', longitud: '-1.7899' }
    ]; */

    const direcciones = [
  // La Rioja
  { direccion: 'Calle Laurel 12, Logroño', localidad: 'Logroño', latitud: '42.4667', longitud: '-2.45' },
  { direccion: 'Avenida de la Paz 45, Calahorra', localidad: 'Calahorra', latitud: '42.3050', longitud: '-1.9650' },
  { direccion: 'Plaza del Ayuntamiento 3, Haro', localidad: 'Haro', latitud: '42.5750', longitud: '-2.8469' },
  { direccion: 'Calle Mayor 18, Alfaro', localidad: 'Alfaro', latitud: '42.1800', longitud: '-1.7500' },
  { direccion: 'Camino de los Picos 22, Nájera', localidad: 'Nájera', latitud: '42.4172', longitud: '-2.7333' },

  // País Vasco
  { direccion: 'Gran Vía 50, Bilbao', localidad: 'Bilbao', latitud: '43.2630', longitud: '-2.9350' },
  { direccion: 'Calle Dato 11, Vitoria-Gasteiz', localidad: 'Vitoria-Gasteiz', latitud: '42.8467', longitud: '-2.6728' },
  { direccion: 'Paseo de la Zurriola 22, San Sebastián', localidad: 'San Sebastián', latitud: '43.3261', longitud: '-1.9787' },
  { direccion: 'Polígono Ugaldeguren III, Zamudio', localidad: 'Zamudio', latitud: '43.3050', longitud: '-2.8800' },
  { direccion: 'Av. Navarra 30, Irun', localidad: 'Irun', latitud: '43.3396', longitud: '-1.7899' },

  // Cantabria
  { direccion: 'Calle Burgos 20, Santander', localidad: 'Santander', latitud: '43.4623', longitud: '-3.8099' },
  { direccion: 'Av. Cantabria 4, Torrelavega', localidad: 'Torrelavega', latitud: '43.3486', longitud: '-4.0471' },
  { direccion: 'Calle Real 15, Castro Urdiales', localidad: 'Castro Urdiales', latitud: '43.3829', longitud: '-3.2173' },
  { direccion: 'Plaza de la Constitución, Laredo', localidad: 'Laredo', latitud: '43.4097', longitud: '-3.4165' },
  { direccion: 'Calle Alta 101, Santoña', localidad: 'Santoña', latitud: '43.4435', longitud: '-3.4558' }
];

    const puntosPosibles = ['Control A', 'Control B', 'Control C', 'Control D', 'Control E'];
    let instalationIndex = 0;

    for (let id_cliente = 1; id_cliente <= 5; id_cliente++) {
      const numInstalaciones = Math.floor(Math.random() * 5) + 1;

      for (let i = 0; i < numInstalaciones; i++) {
        const { direccion, latitud, longitud, localidad } = direcciones[instalationIndex % direcciones.length];

        const nombre = `Instalación ${id_cliente}-${i + 1}`;
        const puntos_control = puntosPosibles[Math.floor(Math.random() * puntosPosibles.length)];
        const image = null; // Puedes poner una URL de prueba si lo deseas

        await dbQuery(`
      INSERT INTO instalaciones (id_cliente, nombre, direccion, latitud, longitud, puntos_control, image, localidad)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `, [
          id_cliente,
          nombre,
          direccion,
          latitud,
          longitud,
          localidad,
          puntos_control,
          image
        ]);

        instalationIndex++;
      }
    }

    const estados = [
      { nombre: 'Inicial', color: '#808080' },
      { nombre: 'Intacto', color: '#28a745' },
      { nombre: 'Actividad', color: '#ffc107' },
      { nombre: 'Deteriorado', color: '#dc3545' },
      { nombre: 'Humedo', color: '#17a2b8' },
      { nombre: 'Desaparecido', color: '#6c757d' },
      { nombre: 'No accesible', color: '#343a40' }
    ];

    for (const estado of estados) {
      await dbQuery(
        `INSERT INTO estados_punto_control (nombre, color) VALUES ($1, $2)`,
        [estado.nombre, estado.color]
      );
    }





    const productos = [
      // Equipo
      { nombre: 'Guantes de nitrilo', descripcion: 'Guantes desechables resistentes a productos químicos', tipo: 'equipo', unidad: 'pares' },
      { nombre: 'Mascarilla FFP2', descripcion: 'Mascarilla con filtro para ambientes contaminados', tipo: 'equipo', unidad: 'unidad' },
      { nombre: 'Buzo desechable', descripcion: 'Mono protector para intervenciones sanitarias', tipo: 'equipo', unidad: 'unidad' },
      { nombre: 'Gafas de seguridad', descripcion: 'Protección ocular contra salpicaduras', tipo: 'equipo', unidad: 'unidad' },

      // Trampa
      { nombre: 'Trampa adhesiva para roedores', descripcion: 'Trampa sin veneno para control de ratones', tipo: 'trampa', unidad: 'unidad' },
      { nombre: 'Portacebo de seguridad', descripcion: 'Caja resistente para uso con rodenticidas', tipo: 'trampa', unidad: 'unidad' },
      { nombre: 'Trampa de luz UV', descripcion: 'Atrapa insectos voladores con luz ultravioleta', tipo: 'trampa', unidad: 'unidad' },
      { nombre: 'Trampa de feromonas para cucarachas', descripcion: 'Trampa atrayente específica', tipo: 'trampa', unidad: 'unidad' },
      { nombre: 'Jaula para palomas', descripcion: 'Jaula para captura y retirada ética de palomas', tipo: 'trampa', unidad: 'unidad' },
      { nombre: 'Trampa de impacto para ratas', descripcion: 'Mecanismo de resorte potente', tipo: 'trampa', unidad: 'unidad' },
      { nombre: 'Estación de monitoreo de insectos', descripcion: 'Dispositivo discreto para detección de actividad', tipo: 'trampa', unidad: 'unidad' },
      { nombre: 'Trampa multicaptura', descripcion: 'Trampa reutilizable para varios ratones', tipo: 'trampa', unidad: 'unidad' },
      { nombre: 'Trampa de túnel para topos', descripcion: 'Trampa específica para jardines', tipo: 'trampa', unidad: 'unidad' },
      { nombre: 'Trampa de caída con cebo', descripcion: 'Para control de cucarachas y hormigas', tipo: 'trampa', unidad: 'unidad' },

      // Químico
      { nombre: 'Rodenticida en bloque', descripcion: 'Cebo tóxico para control de roedores', tipo: 'quimico', unidad: 'kg' },
      { nombre: 'Insecticida en gel', descripcion: 'Aplicación puntual para cucarachas', tipo: 'quimico', unidad: 'g' },
      { nombre: 'Desinfectante de superficies', descripcion: 'Bactericida de amplio espectro', tipo: 'quimico', unidad: 'litros' },
      { nombre: 'Larvicida para mosquitos', descripcion: 'Producto de aplicación en agua estancada', tipo: 'quimico', unidad: 'ml' },
      { nombre: 'Fungicida concentrado', descripcion: 'Tratamiento contra mohos', tipo: 'quimico', unidad: 'ml' },
      { nombre: 'Desratizante en pellets', descripcion: 'Formato granulado para interiores', tipo: 'quimico', unidad: 'kg' },
    ];
    for (const p of productos) {
      await dbQuery(
        `INSERT INTO productos (nombre, descripcion, tipo, unidad) VALUES ($1, $2, $3, $4)`,
        [p.nombre, p.descripcion, p.tipo, p.unidad]
      );
    }

    const grupos = [
      {
        nombre: 'Control de Roedores',
        figura: 'https://example.com/img/grupos/roedores.png',
      },
      {
        nombre: 'Control de Insectos',
        figura: 'https://example.com/img/grupos/insectos.png',
      },
      {
        nombre: 'Control de Palomas',
        figura: 'https://example.com/img/grupos/aves.png',
      },
      {
        nombre: 'Control de Legionela',
        figura: 'https://example.com/img/grupos/legionela.png',
      },
      {
        nombre: 'Control de Termitas',
        figura: 'https://example.com/img/grupos/termitas.png',
      },
      {
        nombre: 'Control de Chinches',
        figura: 'https://example.com/img/grupos/chinches.png',
      }
    ];

    for (const grupo of grupos) {
      await dbQuery(
        `INSERT INTO grupos_punto_control (nombre, figura) VALUES ($1, $2)`,
        [grupo.nombre, grupo.figura]
      );
    }


    await createRuta();

    console.log("Base de datos reiniciada con éxito y poblada con datos de prueba.");

  } catch (error) {
    console.error("Error al inicializar la base de datos:", error);
  }
};



dbInit();