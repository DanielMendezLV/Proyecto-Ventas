var ViewUsuarios = function () {
    var self = this;
  

    //Defino las listas y el error
    self.listaUsuarios = ko.observableArray();
    self.listaRols = ko.observableArray();
    self.detail = ko.observableArray();
    self.upUsuario = ko.observableArray();
    self.error = ko.observableArray();
    self.rolDetail = ko.observableArray();
    self.rolDetailEdit = ko.observableArray();
    self.rolPlusOther = ko.observableArray();
    self.dato = ko.observableArray();
    // lo guardo en editar el dato si funciona
   

   
    //Propiedades de el editar
    //Defino mi ruta
    var usuariosUri = '/api/Usuarios/';
    var rolesUri = '/api/Rols/';


    //Definicion de función que ejecuta las acciones
    function ajaxHelper(uri, method, data) {
        self.error('');
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            //Strinfy convierte una cadena de tipo javascript a objetos tipo JSON
            data: data ? (JSON.stringify(data)): null

        }).fail(function (jqXHR, textStatus, errorThrown) {
            self.error(errorThrown);
        });
    }


    //Obtiene Usuarios
    function getAllUsuarios() {
        ajaxHelper(usuariosUri, 'GET').done(function (data) {
            self.listaUsuarios(data);
        });
    }

    function getAllRols() {
        ajaxHelper(rolesUri, 'GET').done(function (data) {
            self.listaRols(data);
        });
    }

    getAllRols();
    getAllUsuarios();
    self.detail(null);
    self.upUsuario(null);


    self.setDetailRol = function(ID) {
        ajaxHelper(rolesUri + ID, 'GET').done(function (data) {
            self.rolDetail(data);
            self.rolDetailEdit(data);
            //alert(JSON.stringify(self.rolDetailEdit()));
        });
    }

    //Obtiene detalles de los Usuarios
    self.getUsuarioDetail = function (item) {
        ajaxHelper(usuariosUri + item.ID, 'GET').done(function (data) {
            self.detail(data);
        });
        self.setDetailRol(item.RolId);
    }

    self.getUsuarioEditar = function (item) {
        ajaxHelper(usuariosUri + item.ID, 'GET').done(function (data) {
            self.upUsuario(data);
        });
        ajaxHelper(rolesUri + item.RolId,'GET').done(function (data) {
            self.dato(data);
            self.getRol();
        });
    }


    self.getRol = function () {
        self.rolPlusOther(self.dato());

        ko.utils.arrayForEach(self.listaRols(), function (item) {
            //alert(item.nombre);
            if (item.nombre != self.dato().nombre) {
                //alert(item.nombre);
                var other = [self.dato(), item];
                self.rolPlusOther(other);
            //    self.rolplusother.push(item);
            }
        });
    }
    
    self.cambiarArreglo = function (item) {

    }


    self.getUsuarioDelete = function (item) {
        ajaxHelper(usuariosUri + item.ID, 'DELETE').done(function (data) {
            self.listaUsuarios.remove(item)
            self.detail(null);
        });
    };



    // PLantillas
    self.newUsuario = {
        nombre: ko.observable(),
        apellido: ko.observable(),
        correo: ko.observable(),
        telefono:ko.observable(),
        password: ko.observable(),
        RolId: ko.observable(),
        Rol: ko.observable(),
    }

   

 
    self.addUsuario = function (formElement) {
        var usuario = {
            RolId: self.newUsuario.RolId(),
            nombre: self.newUsuario.nombre(),
            apellido: self.newUsuario.apellido(),
            correo: self.newUsuario.correo(),
            telefono: self.newUsuario.telefono(),
            password: self.newUsuario.password(),
            Rol: self.newUsuario.Rol(),
        };

        //alert(JSON.stringify(usuario));
        //AGREGA A LA BD LOS DATOS
        ajaxHelper(usuariosUri, 'POST', usuario).done(function (item) {
            //SE ACTUALIZA LA LISTA DE LOS CONTACTOS
            self.listaUsuarios.push(item);
        });
    }

    self.editUsuario = function () {
        ajaxHelper(usuariosUri + self.upUsuario().ID, 'PUT',self.upUsuario()).done(function (item) {
            getAllUsuarios();
            self.getUsuarioDetail(self.upUsuario());
        });
    }

   
  
}

ko.applyBindings(new ViewUsuarios());