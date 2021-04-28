"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//IMPORTAR LIBRERIAS DEL PROYECTO
var express = require("express");
var mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
var looger = require("morgan");
var helmet = require("helmet");
var cors = require("cors");
//IMPORTAR LAS RUTAS DEL API
var routes_1 = require("./router/routes");
//IMPORTAR LA CONFIGURACIÓN DEL ARCHIVO MAIN
var main_1 = require("./config/main");
//INICIALIZAMOS EXPRESS
var app = express();
//INICIALIZAMOS MOONGOSE
mongoose.connect(main_1.default.db, main_1.default.dbparams).then(function () { return console.log('BDD conectada'); })
    .catch(function (err) { return console.log(err); });
//CONFIGURACIÓN DE LOS MIDDLEWARES
app.use(express.urlencoded()); //urlencode es para recibir los datos del formulario en formato texto, no incluye imagenes
app.use(express.json()); // recibir los datos en formato json
app.use(cookieParser()); //manejo de cookies de sesiones
app.use(looger('dev')); //maneja los logs de la aplicacion
app.use(helmet()); //asegurar los encabezados http
app.use(cors()); //permitir peticiones desde fuera del servidor 
//CONFIGURAR LAS RUTAS
routes_1.default(app);
//INICIALIZANDO EL SERVIDOR
//DEPENDIEDNO DEL ARCHIVO DE CONFIGURACION
var server;
if (process.env.NODE_ENV != main_1.default.test_env) {
    server = app.listen(main_1.default.port, function () {
        console.log("Servidor escuchando en el puerto " + main_1.default.port);
    });
}
else {
    server = app.listen(main_1.default.test_port, function () {
        console.log("Servidor escuchando en el puerto " + main_1.default.test_port);
    });
} //fin del else
//# sourceMappingURL=server.js.map