




angular.module('app')

.directive("passwordVerify", function() {
	return {
		require: "ngModel",
		scope: {
			passwordVerify: '='
		},
		link: function(scope, element, attrs, ctrl) {
			scope.$watch(function() {
				var combined;

				if (scope.passwordVerify || ctrl.$viewValue) {
					combined = scope.passwordVerify + '_' + ctrl.$viewValue; 
				}                    
				return combined;
			}, function(value) {
				if (value) {
					ctrl.$parsers.unshift(function(viewValue) {
						var origin = scope.passwordVerify;
						if (origin !== viewValue) {
							ctrl.$setValidity("passwordVerify", false);
							return undefined;
						} else {
							ctrl.$setValidity("passwordVerify", true);
							return viewValue;
						}
					});
				}
			});
		}
	};
})

.controller('CreateCtrl',  function ($scope,$http,$sce,$state,$cordovaToast,$ionicPopup,$timeout) {

	$scope.data = {

		tipo:'',
		cedula:'',
		nombre:'',
		actividad_id:'',
		direccion:'',
		departamento_id:'',
		cuidad_id:'',
		telefono:'',
		celular:'',
		web:'',
		email:'',
		password:'',
		gremio_id:''



	};
	
	$scope.JSONCategorias = [];
	$scope.JSONPistos     = [];
	$scope.JSONgremios = [];
	$scope.JSONactividad = [];
	obtenerCategorias($http,$scope);
	obtenerGremios($http,$scope);
	obtenerActividad($http,$scope);
	

	$scope.crear = function(){

		$http.post("https://api-guillospy92.c9users.io/public/guardar", $scope.data)
		.success(function(res){

			$scope.data = {};
			$state.go('home');
			$cordovaToast.show('se registro exitosamente ingrese con su email y password', 'long', 'center');


		})

		.error(function(res){

			$cordovaToast.show('error en el servidor', 'long', 'center');
			
		});


	};

	$scope.mostrarPistos = function() { 


		obtenerPistos($http,$scope,$scope.data.departamento_id)
	};

	function obtenerPistos($http,$scope,id){
		console.log(id);

		$http.post('https://api-guillospy92.c9users.io/public/cuidad/'+id)

		.success(function(data) {

			var array = data == null ? [] : (data.cuidades instanceof Array ? data.cuidades : [data.cuidades]);
			$scope.JSONPistos  = array;
			$scope.selPistos   = $scope.JSONPistos;

		})
		.error(function(data) {
			console.log('Error: ' + data);
		}); 

	}  


	function obtenerCategorias($http,$scope){
		$http.post('https://api-guillospy92.c9users.io/public/departamentos')
		.success(function(data) {
			var array = data == null ? [] : (data.departamentos instanceof Array ? data.departamentos : [data.departamentos]);
			$scope.JSONCategorias  = array;
			$scope.departamento_id   = $scope.JSONCategorias;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});    

	}

	function obtenerActividad($http,$scope){
		$http.post('https://api-guillospy92.c9users.io/public/actividad')
		.success(function(data) {
			var array = data == null ? [] : (data.actividad instanceof Array ? data.actividad : [data.actividad]);
			$scope.JSONactividad  = array;
			$scope.actividad_id   = $scope.JSONactividad;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});    

	}
	//443316306101807

	function obtenerGremios($http,$scope){
		$http.post('https://api-guillospy92.c9users.io/public/gremios')
		.success(function(data) {
			var array = data == null ? [] : (data.gremios instanceof Array ? data.gremios : [data.gremios]);
			$scope.JSONgremios  = array;
			$scope.gremio_id   = $scope.JSONgremios;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});    

	}
	
})