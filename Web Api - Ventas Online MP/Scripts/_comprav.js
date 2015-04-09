var ViewCompras = function () {
    var self = this;

    //Defino mis listas
    self.listaComprasSinUsuario = ko.observableArray();
    self.listaComprasConUsuario = ko.observableArray();
    self.listaDetalles = ko.observableArray();
    self.listaDetallesEspecifico = ko.observableArray();
    //self.listaDetallesEspecifico(null);


    var comprasUri = "/api/Compras/";
    var detalleUri = "/api/CompraProductoes/"; 
    var usuariosUri = "/api/Usuarios/";
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


   
    //alert("...");
    function getAllCompras() {
        ajaxHelper(comprasUri, 'GET').done(function (data) {
            self.listaComprasSinUsuario(data)
            self.agregarUsuario();
            self.listarConUsuario();
        });
        //alert("LLegue aca");
    }

    function getAllDetalles() {
        ajaxHelper(detalleUri, 'GET').done(function (data) {
            self.listaDetalles(data);
        });
    }


    self.listarConUsuario = function () {
        ko.utils.arrayForEach(self.listaComprasConUsuario(), function (item) {
            alert(item.Nombre);
        });
    }
    
    self.agregarUsuario = function () {
        ko.utils.arrayForEach(self.listaComprasSinUsuario(), function (item) {

            ajaxHelper(usuariosUri + item.UsuarioId, 'GET').done(function (data) {

                self.element = ko.observable(
                {
                    ID: ko.observable(item.ID),
                    UsuarioId: ko.observable(item.UsuarioId),
                    Total: ko.observable(item.Total),
                    Fecha: ko.observable(item.Fecha),
                    UsuarioNombre: ko.observable(data.nombre),

                });
                //alert(JSON.stringify(self.element));
                self.listaComprasConUsuario.push(self.element);
            });
            
        });
        self.listaComprasSinUsuario([]);
    }


    self.verDetalle = function (item) {
        self.listaDetallesEspecifico([]);
        ko.utils.arrayForEach(self.listaDetalles(), function (itemG) {
            //alert(item.nombre); 
            if (item.ID() == itemG.CompraId) {
                //alert(item.nombre);

                ajaxHelper(productosUri + itemG.ProductoId, 'GET').done(function (data) {

                    self.element = ko.observable(
                    {
                        ProductoId: ko.observable(itemG.ProductoId),
                        Nombre: ko.observable(data.Nombre),
                        Cantidad: ko.observable(itemG.Cantidad),
                        Precio: ko.observable(itemG.Precio),
                       
                    });
                    //alert(JSON.stringify(self.element));
                    self.listaDetallesEspecifico.push(self.element);
                });    
            }
        }); 
    }


    getAllCompras();
    getAllDetalles();



}


ko.applyBindings(new ViewCompras());

