// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('app', ['ionic','starter.controllers','starter.services',
  'satellizer','toastr','ionic-material','ngCordova'])






.config(function($stateProvider,$urlRouterProvider,$authProvider,$ionicConfigProvider) {
  $ionicConfigProvider.tabs.position("button")
  $authProvider.loginUrl = 'https://api-guillospy92.c9users.io/public/auth-login'; 
  
  $stateProvider


  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'CtrlMaster',
    
  })

    .state('tablas', {
    url: '/tablas',
    abstract: true,
    templateUrl: 'templates/tablas.html',
    controller: 'CtrlTablas',
    
  })



  .state('home', {
    url: '/',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl',
    controllerAs: 'login'
    
    
  })
  .state('create', {
    url: '/create',
    templateUrl: 'templates/create.html',
    controller: 'CreateCtrl'
    
    
  })

  .state('app.index', {
    url: '/index',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller: 'IndexCtrl',
        controllerAs: 'index'
      }
    }
  })

  .state('app.crear', {
    url: '/crear/publicidad',
    views: {
      'menuContent': {
        templateUrl: 'templates/crear.html',
        controller: 'CtrlPublicidad',
        
      }
    }
  })

  .state('app.ver', {
    url: '/ver/publicidad',
    views: {
      'menuContent': {
        templateUrl: 'templates/verpublicidad.html',
        controller: 'CtrlVerPublicidad',
        
      }
    }
  })


  .state('app.verdetalle', {
    url: '/ver/publicidad/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/detallepublicidad.html',
        controller: 'DetallepublicidadCtrl',
        
      }
    }
  })


  .state('app.perfil', {
    url: '/perfil',
    views: {
      'menuContent': {
        templateUrl: 'templates/perfil.html',
        controller: 'PerfilCtrl',
        
      }
    }
  })



   .state('tablas.home', {
        url: '/notificacion',
        views: {
          'tab-home': {
            templateUrl: 'templates/notificacion-home.html'
            
          }
        }
      })

 .state('tablas.chat', {
        url: '/chat',
        views: {
          'tab-chat': {
            templateUrl: 'templates/notificacion-chat.html'
            
          }
        }
      })

  $urlRouterProvider.otherwise("/app/index");



  
  

  
  
  
})

.run(function($ionicPlatform,$rootScope,$state,superService,toastr,maincontrol,$cordovaStatusbar,$ionicHistory,$ionicPopup) {


  console.log("ola estoy en el run");
  $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams, fromState, fromStateParams) {

    
    if(toState.name.indexOf('app.index') !== -1 && !superService.isLoggedIn() ) {

      
      
    }

    if(toState.name.indexOf('home') !== -1 && maincontrol.get('email' !== null)) {

      state.go('app.index');
      
    }
    

  });

  $ionicPlatform.ready(function() {

   if(window.Connection) {
    if(navigator.connection.type == Connection.NONE) {
      $ionicPopup.confirm({
        title: "internet desconectado",
        content: "no hay conexion ha internet vuelve cuando tengas"
      })
      .then(function(result) {
        if(result) {
          ionic.Platform.exitApp();
        }
        else{ionic.Platform.exitApp();}
      });
    }
  }
  if(window.cordova && window.cordova.plugins.Keyboard) {
    
    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

    
    cordova.plugins.Keyboard.disableScroll(true);
  }
  if(window.StatusBar) {
   $cordovaStatusbar.styleHex('#C06A00');
 }

 //window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
  //AIzaSyBtTYG5zVqBTdGjpcHHwSUskL9sEKRdAsw
  var notificationOpenedCallback = function(jsonData) {
    console.log('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
   };

   window.plugins.OneSignal.init("628c290a-e447-42a9-bace-6735cfc76450",
                                 {googleProjectNumber: "306756965863"},
                                 notificationOpenedCallback);

 
});


    //window.plugins.OneSignal.setSubscription(true);
   //window.plugins.OneSignal.enableNotificationsWhenActive(true);





});


