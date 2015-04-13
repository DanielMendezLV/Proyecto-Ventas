var ViewVentas = function () {
    var self = this;
    //Declaraciones
    self.listaProductos = ko.observableArray();
    self.listaCarrito = ko.observableArray();
    self.cantidadCarrito = ko.observable();
    self.listaUsuarios = ko.observableArray();
    self.usuarioLogueado = ko.observableArray();
    self.usuarioLogueado(null);
    self.selectedView = ko.observable("principal");
    self.totalCompra = ko.observable();
    self.menuPrincipal = ko.observableArray();
    self.menuCarrito = ko.observableArray();
    self.listaCompraProducto = ko.observableArray();
    self.compraIdEs = ko.observableArray();
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
    var usuariosUri = '/api/Usuarios/';


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
        //alert(self.usuarioLogueado().UsuarioId);
        //alert("HOlis");
        if (self.listaCarrito().length != 0) {
            if (self.usuarioLogueado() != null) {

                var element = {
                    //self.newCompra.UsuarioId()=1
                    UsuarioId: ko.observable(self.usuarioLogueado().UsuarioId),
                    Fecha: ko.observable(formattedDate()),
                    Total: ko.observable(self.totalCompra()),
                    Usuario: ko.observable(),
                }
                ajaxHelper(comprasUri, 'POST', element).done(function (item) {
                    //alert(item.ID + "Holis");
                    self.compraIdEs(item);
                    self.enviarDetalle();
                });
                //alert("LLego bien hasta aca");

            } else {
                alert("Inicia Sesion");
            }
        } else {
            alert("No tienes ningun producto en carrito")
        }   
    }

    self.enviarDetalle = function () {
        //alert(self.compraIdEs().ID);
        ko.utils.arrayForEach(self.listaCarrito(), function (item) {
            var compraPr = ko.observable(
             {
                 //Aca el compra ID es un campo erroneo ya que en el envio el Id del 
                 //Usuario logueado con el fin de realizar una consulta en el controlador
                 CompraId: ko.observable(self.compraIdEs().ID),
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
                    UsuarioId: item.ID,
                    RolId: item.RolId,
                    nombre: item.nombre,
                    apellido: item.apellido,
                    nickname: item.nickname,
                    correo: item.correo,
                    telefono: item.telefono,
                }
                crearCookie('usuario', ko.toJSON(usuario));
                alert(ko.toJSON(leerCookie('usuario')));
                var parsed = JSON.parse(leerCookie('usuario'));
                self.usuarioLogueado(parsed);
            }

        });
        if (verificar) {
            document.location.assign('../VHome/Inicio');
        } else {
            alert('Verifique sus credenciales');
        }

    }

    self.CerrarSesion = function (item) {
        self.eliminarCookie('usuario');
        // SI llega alert("HOli");
        //self.usuarioLogueado(null);
        //location.reload();
    }

    function cargarUsuario() {
        alert(JSON.parse(leerCookie('usuario')));
        var parsed = JSON.parse(leerCookie('usuario'));
        if (parsed) {
            self.usuarioLogueado(parsed);
        }
    }



    var crearCookie = function (key, value) {
        //Crea la cookie
        //alert("cookie");
        expires = new Date();
        expires.setTime(expires.getTime() + 31536000000);
        cookie = key + "=" + value + ";expires=" + expires.toUTCString()+"; path=/";;
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
        // Si llega 
        //alert(llave);
        document.cookie = llave + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;' + ';path=/';
        //alert(ko.toJS(document.cookie));
        // imprime la cookie , esta sigue existiendoalert(ko.toJS(document.cookie));
        //return document.cookie = 
        location.reload();
    }

    cargarUsuario();

}

ko.applyBindings(new ViewVentas());