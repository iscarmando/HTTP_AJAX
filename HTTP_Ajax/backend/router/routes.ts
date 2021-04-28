import * as express from 'express';
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from '../controllers/products.controllers';
import products from '../models/products';
export default(app) =>{
    //Rutas para nuestra api
    const apiRoutes = express.Router();

    //Rutas para el producto
    const productsRoutes = express.Router();

    /*
    *
    *
    * 
    * RUTAS PARA PRODUCTOS
    * 
    */

    apiRoutes.use('/productos',productsRoutes);

    //Obtener todos los empleados
    productsRoutes.get('/',getAllProducts);

    //obtener un producto por ID
    productsRoutes.get('/:id',getProductById);

    //crear producto
    productsRoutes.post('/',createProduct);

    //actualizar producto
    productsRoutes.put('/:id',updateProduct);

    //Eliminar un producto por IF
    productsRoutes.delete('/:id',deleteProduct);

    //ruta inicial
    app.use('/api/',apiRoutes);

};