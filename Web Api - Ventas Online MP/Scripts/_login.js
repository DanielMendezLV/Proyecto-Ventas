var ViewLogin = function () {
    var self = this;
    self.listaUsuarios = ko.observableArray();
    self.usuarioLogueado = ko.observableArray();
    self.usuarioLogueado(null);
    //Defino mi ruta
    var usuariosUri = '/api/Usuarios/';


    //Ajax Helper
    function ajaxHelper(uri, method, data) {
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



    //Obtiene usuarios
    function getAllUsuarios() {
        ajaxHelper(usuariosUri, 'GET').done(function (data) {
            self.listaUsuarios(data);
        });
    }

    getAllUsuarios();


    //Usuario Logear

    self.usuarioLogear = {
        NickName: ko.observable(),
        Password: ko.observable()
    }


    var user;
    self.Logear = function (formElement) {
        var usuarioL = {
            NickName: self.usuarioLogear.NickName(),
            Password: self.usuarioLogear.Password()
        }
        verificar = false;

        ko.utils.arrayForEach(self.listaUsuarios(), function (item) {
            //alert(item.nombre);
            
                if (item.nickname == usuarioL.NickName & item.password == usuarioL.Password) {
                    verificar = true;
                    self.usuarioLogueado(item)
                    usuario = {
                        UsuarioId:item.ID,
                        RolId: item.RolId,
                        nombre: item.nombre,
                        apellido: item.apellido,
                        nickname: item.nickname,
                        correo: item.correo,
                        telefono: item.telefono,
                    }
                    crearCookie('usuario', ko.toJSON(usuario));
                    var parsed = JSON.parse(leerCookie('usuario'));
                    self.usuarioLogueado(parsed);
                }
                
        });
        if (verificar) {
            document.location.assign('VHome/Inicio');
        } else {
            alert('Verifique sus credenciales');
        }

    }

    self.CerrarSesion = function (item) {
        self.eliminarCookie('usuario');
        self.usuarioLogueado(null);
        //location.reload();
    }

    function cargarUsuario() {
        var parsed = JSON.parse(leerCookie('usuario'));
        if (parsed) {
            self.usuarioLogueado(parsed);
        }
    }



    var crearCookie = function (key, value) {
        expires = new Date();
        expires.setTime(expires.getTime() + 31536000000); 
        cookie = key + "=" + value + ";expires=" + expires.toUTCString();
        return document.cookie = cookie;
    }

    var leerCookie = function (key) {
        keyValue = document.cookie.match("(^|;) ?" + key + "=([^;]*)(;|$)");
        if (keyValue) {
            return keyValue[2];
        } else {
            return null;
        }
    }

    self.eliminarCookie = function (llave) {
        return document.cookie = llave + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    cargarUsuario();

}


ko.applyBindings(new ViewLogin());