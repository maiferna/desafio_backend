// IMPORTS
const express = require('express') //Importa el framework
require('dotenv').config(); //Carga las variables de entorno
const path = require('path');

const {
    authRoutes,
    captureRoutes,
    clientRoutes,
    controlPointRoutes,
    controlPointGroupRoutes,
    controlPointStateRoutes,
    controlPointStateHistoryRoutes,
    installationRoutes,
    plagueRoutes,
    productRoutes,
    routeRoutes,
    serviceRoutes,
    serviceExecutionRoutes,
    serviceProductExecutionRoutes,
    userRoutes,
    visitRoutes,
    contactRoutes
} = require('./routes/index.js');

const cookieParser = require('cookie-parser');
const app = express() //Instancia de express
const cors = require('cors'); //CORS (mw)

const port = process.env.PORT || 3000; //Configura el puerto

// MIDDLEWARES: express.json express.URLencoded express.static -----
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// MW:Parseo
app.use(express.urlencoded({ extended: true })) //Parsear datos URL-encoded (formularios HTML)
app.use(express.json()); //Parsear JSON en las peticiones
app.use(cookieParser());

// MW:Config de las CORS
const frontUrlBase = process.env.FRONT_URL || "http://localhost:5173"
const whiteList = [frontUrlBase, 'http://localhost:3000']
app.use(cors({
    origin: whiteList,
    credentials: true
}));

// MW: Logueo de peticiones entrantes
app.use((req, res, next) => {
    console.log(`➡️ ${req.method} ${req.originalUrl}`);
    next();
});

// RUTAS ------------------------------------------ 
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/captures', captureRoutes);
app.use('/api/v1/clients', clientRoutes);
app.use('/api/v1/control-points', controlPointRoutes);
app.use('/api/v1/control-point-groups', controlPointGroupRoutes);
app.use('/api/v1/control-point-states', controlPointStateRoutes);
app.use('/api/v1/control-point-state-history', controlPointStateHistoryRoutes);
app.use('/api/v1/installations', installationRoutes);
app.use('/api/v1/plagues', plagueRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/routes', routeRoutes);
app.use('/api/v1/services', serviceRoutes);
app.use('/api/v1/service-executions', serviceExecutionRoutes);
app.use('/api/v1/service-product-executions', serviceProductExecutionRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/visits', visitRoutes);
app.use('/api/v1/contact', contactRoutes);


// INICIO DEL SERVIDOR ----------------------------
app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})