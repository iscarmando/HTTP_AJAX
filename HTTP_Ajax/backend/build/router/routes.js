"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var products_controllers_1 = require("../controllers/products.controllers");
exports.default = (function (app) {
    //Rutas para nuestra api
    var apiRoutes = express.Router();
    //Rutas para el producto
    var productsRoutes = express.Router();
    /*
    *
    *
    *
    * RUTAS PARA PRODUCTOS
    *
    */
    apiRoutes.use('/productos', productsRoutes);
    //Obtener todos los empleados
    productsRoutes.get('/', products_controllers_1.getAllProducts);
    //obtener un producto por ID
    productsRoutes.get('/:id', products_controllers_1.getProductById);
    //crear producto
    productsRoutes.post('/', products_controllers_1.createProduct);
    //actualizar producto
    productsRoutes.put('/:id', products_controllers_1.updateProduct);
    //Eliminar un producto por IF
    productsRoutes.delete('/:id', products_controllers_1.deleteProduct);
    //ruta inicial
    app.use('/api/', apiRoutes);
});
//# sourceMappingURL=routes.js.map