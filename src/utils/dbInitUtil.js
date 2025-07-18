// IMPORTS
const { dbQuery } = require("./dbQueryUtil.js")
const bcrypt = require("bcryptjs");

const dbInit = async () => {
    try {
        // 1. Borrar tablas en orden correcto
        await dbQuery(`
      DROP TABLE IF EXISTS 
        historial_estado_trampa,
        captura,
        ejecucion_productos,
        ejecuciones_servicios,
        visitas,
        rutas,
        puntos_de_control,
        detalles_servicios,
        servicios,
        productos,
        usuarios,
        instalaciones,
        grupos_trampa,
        plagas,
        estados_trampa,
        clientes
      CASCADE;
    `);

        // 2. Crear tablas base (sin dependencias)
        await dbQuery(`
      CREATE TABLE clientes (
        id_cliente INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL
      );

      CREATE TABLE estados_trampa (
        id_estado_trampa INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        nombre VARCHAR(50) NOT NULL,
        color VARCHAR(20)
      );

      CREATE TABLE plagas (
        id_plaga INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL
      );

      CREATE TABLE grupos_trampa (
        id_grupo_trampa INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        figura TEXT
      );

      CREATE TABLE productos (
        id_producto INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        descripcion TEXT,
        tipo VARCHAR(50),
        unidad VARCHAR(20)
      );
    `);
        await dbQuery(`
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
        direccion VARCHAR(255) NOT NULL
      );

      CREATE TABLE servicios (
        id_servicio INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        descripcion TEXT
        -- otros campos comunes se pueden añadir aquí si los defines más adelante
      );

      CREATE TABLE detalles_servicios (
        id_servicio INT PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        campos_diferentes TEXT,
        FOREIGN KEY (id_servicio) REFERENCES servicios(id_servicio) ON DELETE CASCADE
      );

      CREATE TABLE puntos_de_control (
        id_punto_control INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        id_producto INT REFERENCES productos(id_producto) ON DELETE SET NULL,
        id_instalacion INT REFERENCES instalaciones(id_instalacion) ON DELETE CASCADE,
        id_grupo_trampa INT REFERENCES grupos_trampa(id_grupo_trampa) ON DELETE SET NULL,
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
    `);
        await dbQuery(`
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
        observaciones TEXT
      );

      CREATE TABLE ejecucion_productos (
        id_ejecucion_producto INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        id_ejecucion_servicio INT REFERENCES ejecuciones_servicios(id_ejecucion_servicio) ON DELETE CASCADE,
        id_producto INT REFERENCES productos(id_producto) ON DELETE SET NULL,
        cantidad NUMERIC NOT NULL
      );

      CREATE TABLE captura (
        id_captura INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        id_plaga INT REFERENCES plagas(id_plaga) ON DELETE SET NULL,
        id_punto_control INT REFERENCES puntos_de_control(id_punto_control) ON DELETE CASCADE,
        id_ejecucion_servicio INT REFERENCES ejecuciones_servicios(id_ejecucion_servicio) ON DELETE CASCADE,
        cantidad INTEGER NOT NULL,
        observaciones TEXT
      );

      CREATE TABLE historial_estado_trampa (
        id_historial_estado_trampa INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        id_estado_trampa INT REFERENCES estados_trampa(id_estado_trampa) ON DELETE SET NULL,
        id_punto_control INT REFERENCES puntos_de_control(id_punto_control) ON DELETE CASCADE,
        id_ejecucion_servicio INT REFERENCES ejecuciones_servicios(id_ejecucion_servicio) ON DELETE CASCADE,
        observaciones TEXT
      );
    `);

        // 3. Insertar datos ficticios en tablas independientes
        const clientes = [];
        for (let i = 1; i <= 50; i++) {
            clientes.push(`('Cliente ${i}')`);
        }

        const estadosTrampa = [
            "Operativa", "Rota", "Sucia", "Lleno", "En revisión", "Cambiada", "Fuera de lugar"
        ].map((estado, i) => `('${estado}', 'color${i}')`);

        const plagas = [
            "Ratas", "Cucarachas", "Hormigas", "Moscas", "Avispas", "Pulgas", "Chinches"
        ].map(plaga => `('${plaga}')`);

        const gruposTrampa = [];
        for (let i = 1; i <= 50; i++) {
            gruposTrampa.push(`('Grupo ${i}', 'figura${i}')`);
        }

        const productos = [];
        for (let i = 1; i <= 50; i++) {
            productos.push(`('Producto ${i}', 'Descripción ${i}', 'químico', 'litros')`);
        }

        await dbQuery(`
      INSERT INTO clientes (nombre) VALUES ${clientes.join(",")};
      INSERT INTO estados_trampa (nombre, color) VALUES ${estadosTrampa.join(",")};
      INSERT INTO plagas (nombre) VALUES ${plagas.join(",")};
      INSERT INTO grupos_trampa (nombre, figura) VALUES ${gruposTrampa.join(",")};
      INSERT INTO productos (nombre, descripcion, tipo, unidad) VALUES ${productos.join(",")};
    `);

        // 4. Insertar usuarios con password hasheado
        const passwordHash = await bcrypt.hash("User123", 10);
        const usuarios = [];
        for (let i = 1; i <= 50; i++) {
            const clienteId = Math.ceil(Math.random() * 50);
            usuarios.push(`(${clienteId}, 'Usuario ${i}', 'usuario${i}@mail.com', '${passwordHash}', 'user')`);
        }

        await dbQuery(`
      INSERT INTO usuarios (id_cliente, nombre, email, password_hash, role)
      VALUES ${usuarios.join(",")};
    `);

        const instalaciones = [];
        for (let i = 1; i <= 50; i++) {
            const clienteId = Math.ceil(Math.random() * 50);
            instalaciones.push(`(${clienteId}, 'Calle Falsa ${i}, Ciudad ${i}')`);
        }

        await dbQuery(`
      INSERT INTO instalaciones (id_cliente, direccion)
      VALUES ${instalaciones.join(",")};
    `);

        const servicios = [];
        const detalles = [];

        for (let i = 1; i <= 50; i++) {
            servicios.push(`('Servicio ${i}', 'Descripción del servicio ${i}')`);
        }

        await dbQuery(`
      INSERT INTO servicios (nombre, descripcion)
      VALUES ${servicios.join(",")}
      RETURNING id_servicio;
    `).then(async (res) => {
            const ids = res.rows.map(r => r.id_servicio);
            for (let i = 0; i < ids.length; i++) {
                detalles.push(`(${ids[i]}, 'Detalle ${i + 1}', 'Campo específico ${i + 1}')`);
            }
            await dbQuery(`
        INSERT INTO detalles_servicios (id_servicio, nombre, campos_diferentes)
        VALUES ${detalles.join(",")};
      `);
        });

        const rutas = [];
        for (let i = 1; i <= 50; i++) {
            const t1 = Math.ceil(Math.random() * 50);
            const t2 = Math.ceil(Math.random() * 50);
            const t3 = Math.ceil(Math.random() * 50);
            const fecha = `2025-07-${(i % 28 + 1).toString().padStart(2, "0")}`;
            rutas.push(`(${t1}, ${t2}, ${t3}, '${fecha}')`);
        }

        await dbQuery(`
      INSERT INTO rutas (tecnico_responsable, tecnico, tecnico_asistente, fecha)
      VALUES ${rutas.join(",")};
    `);

        const visitas = [];
        for (let i = 1; i <= 50; i++) {
            const id_instalacion = Math.ceil(Math.random() * 50);
            const id_ruta = Math.ceil(Math.random() * 50);
            visitas.push(`(${id_instalacion}, ${id_ruta}, 'pendiente')`);
        }

        await dbQuery(`
      INSERT INTO visitas (id_instalacion, id_ruta, estado)
      VALUES ${visitas.join(",")};
    `);

        const puntos = [];
        for (let i = 1; i <= 50; i++) {
            const id_producto = Math.ceil(Math.random() * 50);
            const id_instalacion = Math.ceil(Math.random() * 50);
            const id_grupo = Math.ceil(Math.random() * 50);
            puntos.push(`(${id_producto}, ${id_instalacion}, ${id_grupo}, 'Ubicación ${i}', 'lat:${i}.000 lng:${i}.000')`);
        }

        await dbQuery(`
      INSERT INTO puntos_de_control (id_producto, id_instalacion, id_grupo_trampa, localizacion, coordenadas)
      VALUES ${puntos.join(",")};
    `);

        const ejecuciones = [];
        for (let i = 1; i <= 50; i++) {
            const id_visita = Math.ceil(Math.random() * 50);
            const id_servicio = Math.ceil(Math.random() * 50);
            ejecuciones.push(`(${id_visita}, ${id_servicio}, 'Observación ${i}')`);
        }

        await dbQuery(`
      INSERT INTO ejecuciones_servicios (id_visita, id_servicio, observaciones)
      VALUES ${ejecuciones.join(",")};
    `);

        const ejecucionProductos = [];
        for (let i = 1; i <= 50; i++) {
            const id_ejecucion_servicio = Math.ceil(Math.random() * 50);
            const id_producto = Math.ceil(Math.random() * 50);
            const cantidad = (Math.random() * 5 + 1).toFixed(2); // entre 1 y 6 litros
            ejecucionProductos.push(`(${id_ejecucion_servicio}, ${id_producto}, ${cantidad})`);
        }

        await dbQuery(`
      INSERT INTO ejecucion_productos (id_ejecucion_servicio, id_producto, cantidad)
      VALUES ${ejecucionProductos.join(",")};
    `);

        const capturas = [];
        for (let i = 1; i <= 50; i++) {
            const id_plaga = Math.ceil(Math.random() * 7); // porque solo hay 7 plagas
            const id_punto_control = Math.ceil(Math.random() * 50);
            const id_ejecucion_servicio = Math.ceil(Math.random() * 50);
            const cantidad = Math.floor(Math.random() * 10); // 0 a 9 capturas
            capturas.push(`(${id_plaga}, ${id_punto_control}, ${id_ejecucion_servicio}, ${cantidad}, 'Observación ${i}')`);
        }

        await dbQuery(`
      INSERT INTO captura (id_plaga, id_punto_control, id_ejecucion_servicio, cantidad, observaciones)
      VALUES ${capturas.join(",")};
    `);

        const estados = [];
        for (let i = 1; i <= 50; i++) {
            const id_estado_trampa = Math.ceil(Math.random() * 7); // 7 estados definidos
            const id_punto_control = Math.ceil(Math.random() * 50);
            const id_ejecucion_servicio = Math.ceil(Math.random() * 50);
            estados.push(`(${id_estado_trampa}, ${id_punto_control}, ${id_ejecucion_servicio}, 'Estado observado ${i}')`);
        }

        await dbQuery(`
      INSERT INTO historial_estado_trampa (id_estado_trampa, id_punto_control, id_ejecucion_servicio, observaciones)
      VALUES ${estados.join(",")};
    `);

        console.log("Base de datos reiniciada con éxito y poblada con datos de prueba.");

    } catch (error) {
        console.error("Error al inicializar la base de datos:", error);
    }
};

dbInit();