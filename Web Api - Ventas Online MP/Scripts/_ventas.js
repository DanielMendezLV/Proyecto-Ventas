var ViewVentas = function () {
    var self = this;
    //Declaraciones
    self.listaProductos = ko.observableArray();
    self.listaCarrito = ko.observableArray();
    self.cantidadCarrito = ko.observable();
    self.selectedView = ko.observable("principal");
    self.totalCompra = ko.observable();
    self.menuPrincipal = ko.observableArray();
    self.menuCarrito = ko.observableArray();
    self.listaCompraProducto = ko.observableArray();
    self.usuarioLogueado = ko.observableArray();
    self.usuarioLogueado(null);




    self.menuPrincipal(true);
    self.menuCarrito(null);
   
    self.cambiarMVCarrito = function () {
        self.menuPrincipal(null);
        self.menuCarrito(true);
        //self.selectedView = ko.observable("carrito");
        //alert(selectedView);
    }

    self.cambiarMVPrincipal = function () {
        self.menuPrincipal(true);
        self.menuCarrito(false);
    }


    //Rutas
    var productosUri = "/api/Productoes/";
    var comprasUri = "/api/Compras/";
    var detalleUri = "/api/RegistrarCompra/"



    //Ajax Helper
    function ajaxHelper(uri, method,data) {
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            //Strinfy convierte una cadena de tipo javascript a objetos tipo JSON
            
            data: data ? ko.toJSON(data) : null

        }).fail(function (jqXHR, textStatus, errorThrown) {
            self.error(errorThrown);
        });
    }

    // Area de funciones
    //Obtiene Productos
    function getAllProductos() {
        ajaxHelper(productosUri, 'GET').done(function (data) {
            self.listaProductos(data);
        });
    }

    getAllProductos();


 
    self.sendCarrito = function (item) {

        self.compraProducto = ko.observable(
            {
                ID: ko.observable(item.ID),
                Nombre: ko.observable(item.Nombre),
                Descripcion: ko.observable(item.Descripcion),
                Cantidad: ko.observable(1),
                Precio: ko.observable(item.Precio)
            }
        );

        var cont = 0;
        if (self.listaCarrito().length == 0) {
            self.listaCarrito.push(self.compraProducto);
            //alert("Entro vacio");
        } else {
            //alert("Entro lleno");
            ko.utils.arrayForEach(self.listaCarrito(), function (item) {
                //alert(item().ID());
                //alert(self.compraProducto().ID());
                if (item().ID() == self.compraProducto().ID()) {
                    //alert("Entro comparación");
                    var numero = item().Cantidad();
                    item().Cantidad(numero + 1);
                    //alert(item().Cantidad());
                } else {
                    cont++;
                    if (cont == self.listaCarrito().length) {
                        self.listaCarrito.push(self.compraProducto);
                    }
                }
            });
            
        }
        self.sumar();
        self.totalCarrito();
    }

    self.sumar = function () {
        // Si entra
        var total = 0;
        if (self.listaCarrito().length==0) {
            self.cantidadCarrito(0);
        } else {
            ko.utils.arrayForEach(self.listaCarrito(), function (item) {
                total = total + item().Cantidad();
                self.cantidadCarrito(total);
            });
        }
    }

    self.totalCarrito = function () {
        var total = 0;
        ko.utils.arrayForEach(self.listaCarrito(), function (item) {
            //alert(item.Precio);
            total += (item().Cantidad() * item().Precio());
            //alert(total);
        });
        self.totalCompra(total);
    }

    

    self.removeElementCarrito = function (itemLess) {
        ko.utils.arrayForEach(self.listaCarrito(), function (item) {
           // alert(itemLess.ID());
            if (itemLess.ID() == item().ID()) {
                if (item().Cantidad() == 1) {
                    self.listaCarrito.remove(item);
                    self.sumar();
                    self.totalCarrito();
                } else {
                    total = item().Cantidad() - 1;
                    item().Cantidad(total);
                }
            }
           
            //alert(self.cantidadCarrito(total));
      });

        //self.listaCarrito.remove(item);
        self.sumar();
        self.totalCarrito();
    }

    self.vaciarCarrito = function () {
        self.listaCarrito([]);
        self.cantidadCarrito(0);
        self.totalCompra(0);
    }

    
    //Agregar Compra


    function formattedDate() {
        var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();


        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        //alert([month, day, year].join('/'));
        return [month, day, year].join('-');
       
    }

    self.agregarCompra = function () {
       
        //var element = {
        //    //self.newCompra.UsuarioId()=1
        //    UsuarioId: ko.observable(1),
        //    Fecha: ko.observable(formattedDate()),
        //    Total: ko.observable(self.totalCompra()),
        //    Usuario: ko.observable(),
        //}


        //Si lo hace y envia correctamente
        //ajaxHelper(comprasUri, 'POST', element).done(function (item) {
          
        //});

        self.enviarDetalle();
    }

    self.enviarDetalle = function () {
       
        ko.utils.arrayForEach(self.listaCarrito(), function (item) {
            //alert("Hola");
            
            //alert(item().Cantidad());
            var compraPr = ko.observable(
             {
                 CompraId: ko.observable(1),
                 ProductoId: ko.observable(item().ID()),
                 Cantidad: ko.observable(item().Cantidad()),
                 Precio: ko.observable(item().Precio())
             }
            );

            self.listaCompraProducto.push(compraPr);
        });


        ajaxHelper(detalleUri, 'POST', self.listaCompraProducto).done(function (item) {
            alert(ko.toJS(item));
        });


        //alert(ko.toJSON(self.listaCompraProducto));
        //self.listaCompraProducto([]);
        
        
    }

    var leerCookie = function (key) {
        keyValue = document.cookie.match("(^|;) ?" + key + "=([^;]*)(;|$)");
        if (keyValue) {
            return keyValue[2];
        } else {
            return null;
        }
    }

    var eliminarCookie = function (llave) {
        return document.cookie = llave + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    self.CerrarSesion = function (item) {
        eliminarCookie('usuario');
        location.reload();
    }

    function cargarUsuario() {
        var parsed = JSON.parse(leerCookie('usuario'));
        if (parsed) {
            self.usuarioLogueado(parsed);
        }
    }


  
  

    cargarUsuario();

}

ko.applyBindings(new ViewVentas());