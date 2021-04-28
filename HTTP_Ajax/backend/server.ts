//IMPORTAR LIBRERIAS DEL PROYECTO
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as cookieParser from 'cookie-parser';
import * as looger from 'morgan';
import * as helmet from 'helmet';
import * as cors from 'cors';


//IMPORTAR LAS RUTAS DEL API
import router from './router/routes';

//IMPORTAR LA CONFIGURACIÓN DEL ARCHIVO MAIN
import config from './config/main';

//INICIALIZAMOS EXPRESS
const app = express();

//INICIALIZAMOS MOONGOSE
mongoose.connect(config.db, config.dbparams).then(()=> console.log('BDD conectada'))
    .catch(err => console.log(err)); 
//CONFIGURACIÓN DE LOS MIDDLEWARES
app.use(express.urlencoded());//urlencode es para recibir los datos del formulario en formato texto, no incluye imagenes
app.use(express.json()); // recibir los datos en formato json
app.use(cookieParser());//manejo de cookies de sesiones
app.use(looger('dev'));//maneja los logs de la aplicacion
app.use(helmet());//asegurar los encabezados http
app.use(cors());//permitir peticiones desde fuera del servidor 


//CONFIGURAR LAS RUTAS
router(app);


//INICIALIZANDO EL SERVIDOR
//DEPENDIEDNO DEL ARCHIVO DE CONFIGURACION

let server;
 
if(process.env.NODE_ENV != config.test_env){
    server=app.listen(config.port, () => {
        console.log(`Servidor escuchando en el puerto ${config.port}`)
    });
}else{
    server = app.listen(config.test_port, () => {
        console.log(`Servidor escuchando en el puerto ${config.test_port}`)
    });
}//fin del else