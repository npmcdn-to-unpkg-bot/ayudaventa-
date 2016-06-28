
angular.module('starter.services', [])


.factory('maincontrol', [function () {

 return {

  get: function(key){

    return window.localStorage.getItem(key);
  },

  set: function(key,val){

    return window.localStorage.setItem(key,val);
  },

  unset:function(key){

    return window.localStorage.removeItem(key);
  }
};


}])

.factory('superService', function($auth,maincontrol,$state,$cordovaToast,$ionicPopup,$timeout) {



  var vm = this;

  var cachesession = function(id,tipo,cedula,nombre,actividad_id,direccion,departamento_id,
    cuidad_id,telefono,celular,web,email,gremio_id){

    maincontrol.set('userislogin',true);
    maincontrol.set('id',id);
    maincontrol.set('tipo',tipo);
    maincontrol.set('cedula',cedula);
    maincontrol.set('nombre',nombre);
    maincontrol.set('actividad_id',actividad_id);
    maincontrol.set('direccion',direccion);
    maincontrol.set('departamento_id',departamento_id);
    maincontrol.set('cuidad_id',cuidad_id);
    maincontrol.set('telefono',telefono);
    maincontrol.set('celular',celular);
    maincontrol.set('web',web);
    maincontrol.set('email',email);
    maincontrol.set('gremio_id',gremio_id);

  };

  var removeCache = function(id,tipo,cedula,nombre,actividad_id,direccion,departamento_id,
    cuidad_id,telefono,celular,web,email,gremio_id){

    maincontrol.unset('userislogin');
    maincontrol.unset('id');
    maincontrol.unset('tipo');
    maincontrol.unset('cedula');
    maincontrol.unset('nombre');
    maincontrol.unset('actividad_id');
    maincontrol.unset('direccion');
    maincontrol.unset('departamento_id');
    maincontrol.unset('cuidad_id');
    maincontrol.unset('telefono');
    maincontrol.unset('celular');
    maincontrol.unset('web');
    maincontrol.unset('email');
    maincontrol.unset('gremio_id');

  };

  var login = function(loginForm){

    $auth.login(loginForm).then(



      function(response){

        cachesession(response.data.user.id,response.data.user.tipo,
          response.data.user.cedula,response.data.user.nombre,
          response.data.user.actividad_id,response.data.user.direccion,
          response.data.user.departamento_id,response.data.user.cuidad_id,
          response.data.user.telefono
          ,response.data.user.celular,response.data.user.web,response.data.user.email,
          response.data.user.gremio_id);

        $state.go('app.index');
        $cordovaToast.show('session iniciada', 'long', 'center');




      },

      function(error){

        $cordovaToast.show('usuario o contraseña invalida', 'long', 'center');
      }


      );
  }

  return  {

    loginApi: function(loginForm){

      login(loginForm);

    },

    logout: function(){

      $auth.logout();
      removeCache();
      $state.go('home');

    },

    isLoggedIn: function(){

      maincontrol.get('userislogin') !== null;
    }

  }
});