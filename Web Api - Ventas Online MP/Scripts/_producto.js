var ViewProductos = function () {
    var self = this;

    //Defino mis listas
    self.listaProductos = ko.observableArray();
    self.listaCategorias = ko.observableArray();
    self.error = ko.observableArray();
    self.productoDetail = ko.observableArray();
    self.menuAgregar = ko.observableArray();
    self.clasificacionDetail = ko.observableArray();
    self.upProducto = ko.observableArray();
    self.clasificacionEdit = ko.observableArray();
    self.clasificacionPlusOther = ko.observableArray();

    self.productoDetail(null);
    self.menuAgregar(null);

    //Defino mis rutas
    var productosUri = "/api/Productoes/";
    var clasificacionesUri = "/api/Clasificacions/";

   
  
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
    
    function getAllCategorias() {
        ajaxHelper(clasificacionesUri, 'GET').done(function (data) {
            self.listaCategorias(data);
        });
    }

    self.setDetailClasificacion = function (ID) {
        ajaxHelper(clasificacionesUri + ID, 'GET').done(function (data) {
            self.clasificacionDetail(data);
            //alert(JSON.stringify(self.rolDetailEdit()));
        });
    }

    self.getProductoDetail = function (item) {
        ajaxHelper(productosUri + item.ID, 'GET').done(function (data) {
            self.productoDetail(data);
        });
        self.setDetailClasificacion(item.ClasificacionId);
    }

   


    self.getProductoDelete = function (item) {
        ajaxHelper(productosUri + item.ID, 'DELETE').done(function (data) {
            self.listaProductos.remove(item);
            self.getCloseDetail();
        });
    }


    self.getCloseDetail = function () {
        self.productoDetail(null);
    }

    self.mostrarAgregar = function () {
        self.menuAgregar(true);
    }
   
    self.cerrarAgregar = function () {
        self.menuAgregar(null);
    }

    //Obtengo los productos
    getAllProductos();
    getAllCategorias();

    //Agregar

    //Plantillas
    self.newProducto = {
        nombre: ko.observable(),
        precio: ko.observable(),
        descripcion: ko.observable(),
        ClasificacionId: ko.observable(),
        Clasificacion: ko.observable(),
    };


    self.addProducto = function (formElement) {
        
        var producto = {
            ClasificacionId: self.newProducto.ClasificacionId.ID,
            nombre: self.newProducto.nombre(),
            precio: self.newProducto.precio(),
            descripcion: self.newProducto.descripcion(),
            Clasificacion: self.newProducto.Clasificacion(),
        };

        ///AGREGA A LA BD LOS DATOS
        ajaxHelper(productosUri, 'POST', producto).done(function (item) {
        ///    SE ACTUALIZA LA LISTA DE LOS CONTACTOS
            self.listaProductos.push(item);
        });
    }



    self.getProductoEditar = function (item) {
        ajaxHelper(productosUri + item.ID, 'GET').done(function (data) {
            self.upProducto(data);
        });

        ajaxHelper(clasificacionesUri + item.ClasificacionId, 'GET').done(function (data) {
            self.clasificacionEdit(data);
            self.getClasificacion();
        });
    }

    self.getClasificacion = function () {
        self.clasificacionPlusOther(self.clasificacionEdit());

        ko.utils.arrayForEach(self.listaCategorias(), function (item) {
            //alert(item.nombre);
            if (item.Nombre != self.clasificacionEdit().Nombre) {
                //alert(item.nombre);
                var union = [self.clasificacionEdit(), item];
                self.clasificacionPlusOther(union);
                //    self.rolplusother.push(item);
            }
        });
    }

    self.editarClasificacion = function () {
        ajaxHelper(productosUri + self.upProducto().ID, 'PUT', self.upProducto()).done(function (item) {
            getAllProductos();
            self.getProductoDetail(self.upProducto());
        });
    }



}

ko.applyBindings(new ViewProductos());