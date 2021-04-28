"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getAllProducts = void 0;
var express_1 = require("express");
var products_1 = require("../models/products");
function getAllProducts(req, res, next) {
    //obtenemos todos los productos
    //select * from products
    products_1.default.find(function (err, products) {
        if (err) {
            express_1.response.status(500).json({ err: err });
        }
        else {
            res.status(200).json(products);
        }
    });
} //fin del getAllProducts
exports.getAllProducts = getAllProducts;
function getProductById(req, res, next) {
    //Obteenemos el id de la peticion
    var id = req.params.id;
    //buscamos el producto por id
    products_1.default.findById(id, function (err, product) {
        if (err) {
            res.status(500).json({ err: err });
        }
        else {
            res.status(200).json({ product: product });
        }
    });
} //fin del getProductById
exports.getProductById = getProductById;
function createProduct(req, res, next) {
    //obtenemos los paranetros de la peticion req
    //estane en el objeto req.body
    var nombre = req.body.nombre;
    var precio = req.body.precio;
    var anio = req.body.anio;
    //validar que exista la información
    if (!nombre) {
        //enviamos un mensaje de tipo 422 para indicar que el campo es requerido
        res.status(422).json({ err: 'Nombre es requerido' });
        return;
    }
    if (!precio) {
        //enviamos un mensaje de tipo 422 para indicar que el campo es requerido
        res.status(422).json({ err: 'Precio es requerido' });
        return;
    }
    if (!anio) {
        //enviamos un mensaje de tipo 422 para indicar que el campo es requerido
        res.status(422).json({ err: 'Año es requerido' });
        return;
    }
    //creamos el objeto par aguardalo en la base de datos
    var product = new products_1.default({
        nombre: nombre,
        precio: precio,
        anio: anio
    });
    product.save(function (err, post) {
        if (err) {
            res.status(500).json({ err: err });
        }
        else {
            res.status(200).json({ product: product });
        }
    });
}
exports.createProduct = createProduct;
function updateProduct(req, res, next) {
    //obtenemos el id para actualizar
    var id = req.params.id;
    //actualizamos el producto buscando por id y enviandole 
    //en el req.body lso datos del producto
    products_1.default.findByIdAndUpdate(id, req.body, function (err, product) {
        if (err) {
            res.status(500).json({ err: err });
        }
        else {
            res.status(200).json({ product: product });
        }
    });
}
exports.updateProduct = updateProduct;
function deleteProduct(req, res, next) {
    //obtenemos el id para actualizar
    var id = req.params.id;
    //actualizamos el producto buscando por id y enviandole 
    //en el req.body lso datos del producto
    products_1.default.findByIdAndRemove(id, {}, function (err, product) {
        if (err) {
            res.status(500).json({ err: err });
        }
        else {
            res.status(200).json({ product: product });
        }
    });
}
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=products.controllers.js.map