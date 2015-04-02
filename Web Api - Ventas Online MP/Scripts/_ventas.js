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
    


    //Ajax Helper
    function ajaxHelper(uri, method, data) {
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            //Strinfy convierte una cadena de tipo javascript a objetos tipo JSON
            data: data ? JSON.stringify(data) : null

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


    // PLantillas
    self.newCompraProducto = {
        idProducto: ko.observable(),
        nombre: ko.observable(),
        cantidad: ko.observable(),
        precio: ko.observable(),
    }
  


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

    
}

ko.applyBindings(new ViewVentas());