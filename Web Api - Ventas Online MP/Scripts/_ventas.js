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
        // Si llega alert(item.ID);
       var compraProducto = {
            ID: ko.observable(item.ID),
            Nombre: ko.observable(item.Nombre),
            Cantidad: ko.observable(0),
            Precio: ko.observable(item.Precio)
        }

        alert(compraProducto.ID);

        //if (self.listaCarrito().length == 0) {
        //    self.listaCarrito.push(compraProducto);
        //} else {
        //    ko.utils.arrayForEach(self.listaCarrito(), function (item) {
        //        if (item.ID == compraProducto.ID) {
        //            item.Cantidad = item.Cantidad + 1;
        //        }
        //    });
        //}

       
        //self.sumar();
        //self.sumarCarrito();
    }

    self.sumar = function () {
        // Si entra
        var total = 0;
        if (self.listaCarrito().length==0) {
            self.cantidadCarrito(0);
        } else {
            ko.utils.arrayForEach(self.listaCarrito(), function (item) {
                ++total;
                self.cantidadCarrito(total);
            });
        }
    }

    self.sumarCarrito = function () {
        var total = 0;
        ko.utils.arrayForEach(self.listaCarrito(), function (item) {
            //alert(item.Precio);
            total += (item.Cantidad * item.Precio);
            //alert(total);
        });
        self.totalCompra(total);
    }

    

    self.removeElementCarrito = function (item) {
        self.listaCarrito.remove(item);
        self.sumar();
        self.sumarCarrito();
    }

    self.vaciarCarrito = function () {
        self.listaCarrito([]);
        self.cantidadCarrito(0);
        self.totalCompra(0);
    }

    
 
}

ko.applyBindings(new ViewVentas());