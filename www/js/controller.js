angular.module('starter.controllers', [])



.controller('IndexCtrl',  function ($scope,$state,maincontrol) {

	$scope.date = new Date();
    if (maincontrol.get('email') == null) {

        $state.go('home');
        

        console.log(maincontrol.get('email'));
        
    };

    
    
})


.directive('stringToNumber', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$parsers.push(function(value) {
        return '' + value;
      });
      ngModel.$formatters.push(function(value) {
        return parseFloat(value, 10);
      });
    }
  };
})





.controller('PerfilCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,maincontrol,$http) {
  
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    
    ionicMaterialInk.displayEffect();

    $scope.nombre = maincontrol.get('nombre');
    $scope.email = 	maincontrol.get('email');
    console.log(maincontrol.get('departamento_id'));
    $scope.data = {

        
        nombre:maincontrol.get('nombre'),
        
        direccion:maincontrol.get('direccion'),
        
        telefono:maincontrol.get('telefono'),
        celular:maincontrol.get('celular'),
        web:maincontrol.get('web'),
        email:maincontrol.get('email'),
        



    };


})














