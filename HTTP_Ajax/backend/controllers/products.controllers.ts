import { response } from 'express';
import Product from '../models/products';

export function getAllProducts(req,res,next){

    //obtenemos todos los productos
    //select * from products
    Product.find((err, products) => {
        if(err){
            response.status(500).json({err});
        }else{
            res.status(200).json(products);
        }
    });
} //fin del getAllProducts

export function getProductById(req,res,next){
    //Obteenemos el id de la peticion
    const id = req.params.id;

    //buscamos el producto por id
    Product.findById(id, (err, product) => {
        if(err){
            res.status(500).json({err});
        }else{
            res.status(200).json({product})
        }
    });
}//fin del getProductById

export function createProduct(req,res,next){
    //obtenemos los paranetros de la peticion req
    //estane en el objeto req.body

    const nombre = req.body.nombre;
    const precio = req.body.precio;
    const anio = req.body.anio;

    //validar que exista la información
    if(!nombre){
        //enviamos un mensaje de tipo 422 para indicar que el campo es requerido
        res.status(422).json({err: 'Nombre es requerido'});
        return;
    }
    if(!precio){
        //enviamos un mensaje de tipo 422 para indicar que el campo es requerido
        res.status(422).json({err: 'Precio es requerido'});
        return;
    }
    if(!anio){
        //enviamos un mensaje de tipo 422 para indicar que el campo es requerido
        res.status(422).json({err: 'Año es requerido'});
        return;
    }

     //creamos el objeto par aguardalo en la base de datos
     const product = new Product({
        nombre, 
        precio,
        anio
    });

    product.save((err,post) => {
        if(err){
            res.status(500).json({err})
        }
        else{
            res.status(200).json({product});
        }
    });

   
}

export function updateProduct(req,res,next){
    //obtenemos el id para actualizar
    const id = req.params.id;

    //actualizamos el producto buscando por id y enviandole 
    //en el req.body lso datos del producto

    Product.findByIdAndUpdate(id,req.body,(err,product) =>{
        if(err){
            res.status(500).json({err})
        }else{
            res.status(200).json({product})
        }
    });
}


export function deleteProduct(req,res,next){
    //obtenemos el id para actualizar
    const id = req.params.id;

    //actualizamos el producto buscando por id y enviandole 
    //en el req.body lso datos del producto

    Product.findByIdAndRemove(id,{ },(err,product) =>{
        if(err){
            res.status(500).json({err})
        }else{
            res.status(200).json({product})
        }
    });
}