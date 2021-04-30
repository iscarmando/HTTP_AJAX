class Producto {
    constructor(id,nombre,precio,anio){
        this.id=id;
        this.nombre=nombre;
        this.precio=precio;
        this.anio=anio;
    }
}

class Interfaz {
    addProduct(product){
     
         
        const fila = '<tr id="pr'+ product.id + '">   '
                +    '<td id="nombre'+ product.id + '"> ' + product.nombre + '</td>    '   
                +    '<td id="precio'+ product.id+ '"> ' + product.precio + '</td>     '
                +    '<td id="anio'+ product.id + '"> ' + product.anio + '</td>          '
                +    '<td>                                                                  '
                +    '  <a href="#" class="btn btn-danger btn-sm mt-3" name="borrar"        '
                +    '  id=delete'+ product.id  + '>Borrar</a>                              '
                +    '  <a href="#" class="btn btn-success btn-sm mt-3"                     '
        
                +    '  name="editar"                                                       '
                +    '  id=edit'+ product.id  + '>Editar</a>                                '
                +    '</td>                                                                 '
                +    '</tr>                                                                 ' 
                ;

                //Producto: id=1, nombre="mouse" precio=120 anio=2021
            $("#listado").append(fila);
    }//fin de addProduct

    resetForm(){
        //reiniciar formulario
        $("#products-form").trigger('reset');
    }//fin del reset form


    deleteProduct(id){
        var product = "#pr"+id;
        alert(product);
        $(product).remove();
        
        

    }//fin de deleteProduct


    editProduct(id){
       
        //obtenemos los datos del producto
        var nombre = $("#nombre"+id).text();
        var precio = $("#precio"+id).text().trim();
        var anio = $("#anio"+id).text().trim();
        $("#miModal").modal("show");
        $("input[name=modalIdProducto]").val(""+id);
        $("#modalNombre").val(nombre);
        $("#modalPrecio").val(precio);
        $("#modalAnio").val(anio);

    }//fin de editProduc

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
                                p._id,p.nombre, p.precio, p.anio);
                                interfaz.addProduct(product);
                        });
                    },
                    error:(res) =>{
                        interfaz.message("Error al cargar productos","Error");

                    }
                    
                })//fin del ajax
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
                            product.id = res.product.id;
                            //aggregamos el producto a la interfaz web
                            interfaz.addProduct(product);
                            interfaz.message("Producto agregado correctamente");

                        },
                        error: (res)=>{
                            interfaz.message("Error al agregar el producto");
                        }

                    });



                }//else
            })//fin del evento del boton agregar producto




            //EVENTO BORRAR 
            $("#listado").on('click', '.btn.btn-danger', (event)=>{
                //obtener el id del boton que se hizo click
                alert("DIste click")
                var id  = event.target.id;
                id = id.slice(6); // elimina los n primeros caracteres
                alert(id)
                $.ajax({
                    url:'http://localhost:3000/api/productos/'+id,
                    method: 'DELETE',
                    headers: {
                        'ContentType': 'Application/JSON'
                    },
                    success: (res)=> {
                        interfaz.message("Producto elminiado",'warnign')
                        interfaz.deleteProduct(id);
                    },
                    error:(res) =>{
                        interfaz.message("Ocurrio un error",'danger')
                    }
                    
                });//fin del ajax
            })//fin del evento borrar





            //evento update
            $("#listado").on('click', '.btn.btn-success', (event)=>{
                //obtenemos el id del boton que se hizo clic
                var id = event.target.id;
                id = id.slice(4)
               //editar el producto del id
                interfaz.editProduct(id);

                //evitamos que se recarge la pagina
                event.preventDefault();


            })//fin del evento update

            //evento del click en el btn de guardar cambios del modal
            $("#guardarModal").on('click',function(){
                const id = $("input[name=modalIdProducto]").val();
                const nombre = $("#modalNombre").val();
                const precio = $("#modalPrecio").val();
                const anio = $("#modalAnio").val();
                console.log(nombre + "" + precio + "" + anio)
                const producto = new Producto(id,nombre,precio,anio);

                //modificar la base de datos
                $.ajax({
                    url:'http://localhost:3000/api/productos/'+id,
                    method: 'PUT',
                    headers: {
                        'ContentType':'Application/JSON'
                    },
                    success: (res)=> {

                        producto.id = res.product._id;
                        console.log(id)
                        //Actualizmamos el producto
                        $("#nombre"+id).text(nombre);
                        $("#precio"+id).text(precio);
                        $("#anio"+id).text(anio);
                        console.log(nombre + "" + precio + "" + anio)
                        
                        //cerrar el modal
                        $("#miModal").modal("hide");
                      
                        interfaz.message("Producto actualizado correctamente","success")
                    },
                    error:(res) =>{
                        interfaz.message("Ocurrio un error",'danger')
                    }
                    
                });//fin del ajax
            })
            //fin del guardar modal

            //evento de cerrar modal
            $("#cerrarModal").on('click',function(){
                $("#miModal").modal('hide')
            })//fin del evento cerrar modal

                        //evento de cerrar modal
                        $(".close").on('click',function(){
                            $("#miModal").modal('hide')
                        })//fin del evento cerrar modal
                        
 })
       
