class Producto {
    constructor(id, nombre,precio,anio){
        this.id=id;
        this.nombre=nombre;
        this.precio=precio;
        this.anio=anio;
    }
}

class Interfaz {
    addProduct(product){
        const fila = '<tr id="pr' + product.id + '">   '
                +    '<td id="nombre'+ product.id + '"> ' + product.nombre + '</td>'
                +    '<td id="precio'+ product.id + '"> ' + product.precio + '</td>'
                +    '<td id="año'+ product.id + '"> ' + product.anio + '</td>'
                +    '<td>'
                +    '  <a href="#" class="btn btn-danger btn-sm mt-3" name="borrar"        '
                +    '  id=delete' + product.id  + '>Borrar</a>'
                +    '  <a href="#" class="btn btn-success btn-sm mt-3" name="editar"        '
                +    '  id=edit' + product.id  + '>Editar</a>'
                +    '</td>'
                +    '</tr>';

                //Producto: id=1, nombre="mouse" precio=120 anio=2021
            $("#listado").append(fila);
    }//fin de addProduct

    resetForm(){
        //reiniciar formulario
        $("#products-form").trigger('reset');
    }//fin del reset form


    deleteProduct(id){

    }//fin de deleteProduct


    editProduct(id){

    }//fin de editProduct

    //tipo de mensaje puede ser success, warning , danger
    message(message,type){
        
        const miDiv= '<div class="alert alert-'+ type + ' mt-2"'
                +   '  rolem="alert">'
                +   '   '+ message 
                +'</div>';
                
               
                //añadimos el mensaje a la pagina web despues del div id=app
                $("#mensajeDiv").append(miDiv);

                //eliminamo el mensaje despues de 3s
                setTimeout(function() {
                    $(".alert").remove();
                }, 3000);
            }//fin de la clase mensaje


}//FIN DE LA CLASE INTERFAZ


//cargamos los productos de la base de datos
$(() =>{
    const interfaz = new Interfaz();
        $(document).ready( ()=>{
                //console.log("HOLA");

                //cargar datos
                $.ajax({
                    url:"http://localhost:3000/api/productos",
                    contentType:'application/json',
                    success:(res)=>{
                        console.log(res)
                        res.forEach( (p) =>{
                            const product = new Producto(
                                p.id, p.nombre, p.precio, p.anio);
                            interfaz.addProduct(product);
                        });
                    },
                    error: () =>{
                        interfaz.message("Error al cargar productos","Error");

                    }
                    
                })
            });//fin de cargar los productos de la base de datos

            //evento que maneja click en el boton de guardar del formulario
            $("#boton").on('click', function(event){
                //alert("Funciona");
                //evita que la apgina se cargue al hacer click ene l boton
                const nombre = $("#nombre").val();
                const precio = $("#precio").val();
                const anio = $("#anio").val();
                //alert(nombre + "," + precio + "," + anio)
                if(nombre ==='' || precio === ''){
                    if(nombre ===''){
                        interfaz.message("Ingresa el nombre","danger");
                        $("#nombre").focus();
                    }else if(precio ===''){
                        interfaz.message("Ingresa el precio","danger");
                        $("#precio").focus();
                    }//else
                    
                }else{ //datos no vacios
                    const product =  new Producto(0,nombre,precio,anio);

                    //insertamos el producto en la base de datos con ajax
                    $.ajax({
                        url:'http://localhost:3000/api/productos',
                        method: 'POST',
                        header: {
                            "content-type":"application/json"
                        },
                        data:{
                            "nombre":nombre,
                            "precio":precio,
                            "anio":anio
                        },
                        success:(res)=>{
                            producto.id = res.product.id;
                            //aggregamos el producto a la interfaz web
                            interfaz.addProduct(product);
                            interfaz.message("Producto agregado correctamente");

                        },
                        error: (res)=>{
                            interfaz.message("Error al agregar el producto");
                        }

                    });



                }//else
            })

})