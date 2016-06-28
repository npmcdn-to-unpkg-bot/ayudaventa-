angular.module('app')
.controller('CtrlPublicidad',  function ($scope,$http,$sce,superService,maincontrol,$state,$cordovaToast,$ionicPopup) {

	
	$scope.isloggin = superService.isLoggedIn();//metodo para verficar si hay datos de usuario
	$scope.JSONactividad = [];//array para obtener todas las actividades del cusuarios
	$scope.JSONCategorias = [];//array para obtener todos los departamentos
	$scope.JSONPistos     = [];//array para obteenr todas las cuidades 
	$scope.JsonUser = [];
	obtenerCategorias($http,$scope);//metodo para obtener los departamentos
	obtenerActividad($http,$scope);//metodo para obterner las actividades
		//datos para guardar la camapaña
	$scope.data = {
		nombre:'',
		departamento_id:'',
		cuidad_id:'',
		tiempo:'',
		tamano:'',
		web:maincontrol.get('web'),
		telefono : maincontrol.get('telefono'),
		celular:maincontrol.get('celular'),
		cliente:'',
		volante:'',
		precio: '',
		actividad_id:'',
		'produccion_id':'1',
		user_id : maincontrol.get('id'),
	};

	var defaultHttpHeaders = {
		'content-Type':'application/json',
		'Accept':'application/json'
	};

	$http.defaults.headers.post = defaultHttpHeaders;


	
	$scope.guardar_publicidad = function(){

		$http.post("https://api-guillospy92.c9users.io/public/guardarcam", $scope.data)
		.success(function(res){

			$scope.data = {};
			$state.go('app.ver');
			$cordovaToast.show('campaña creada exitosamente', 'long', 'center');


		})

		.error(function(res){

		 $cordovaToast.show('no se pudo guardar la publicidad', 'long', 'center');

			 
		});


	};







	


	//verificar si el metodo isloggedin no tiene datos

	

	$scope.$watch(function(){

		return superService.isLoggedIn();

	},
	function(newval){
		if(typeof newval  !== 'undefined' ){

			$scope.isloggin  = superService.isLoggedIn();
		}
	}
	);


	//verificar si el id no tiene dato

	

	$scope.$watch(function(){

		return maincontrol.get('id');

	},
	function(newval){
		if(typeof newval  !== 'undefined' ){

			$scope.data.user_id  =maincontrol.get('id');
		}
	}
	);

	//verificar si el celular no tiene dato 

	$scope.$watch(function(){

		return maincontrol.get('telefono');

	},
	function(newval){
		if(typeof newval  !== 'undefined' ){

			$scope.data.telefono =maincontrol.get('telefono');
		}
	}
	);

	//verificar si el celular no tiene dato

	$scope.$watch(function(){

		return maincontrol.get('celular');

	},
	function(newval){
		if(typeof newval  !== 'undefined' ){

			$scope.data.celular  =maincontrol.get('celular');
		}
	}
	);

	//verificar si la web no tiene dato 

	$scope.$watch(function(){

		return maincontrol.get('web');

	},
	function(newval){
		if(typeof newval  !== 'undefined' ){

			$scope.data.web  =maincontrol.get('web');
		}
	}
	);







 

	$scope.getusuarios = function (){

			getusuariospost($http,$scope,$scope.data.departamento_id,$scope.data.cuidad_id,$scope.data.actividad_id);

	}


	function getusuariospost($http,$Scope,idd,idc,ida){


		var ruta = "https://api-guillospy92.c9users.io/public/usuarios/"+idd+"/"+idc+"/"+ida;

		$http.post(ruta)
		.success(function(response){

				$scope.data.cliente = response;

			
		});
		
	}

	
//obtener las activiad del usuario
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

	//obntener los departamentost

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

	//function primera para obtener las cuidades

	$scope.mostrarPistos = function() { 


		obtenerPistos($http,$scope,$scope.data.departamento_id)
	};

	//function para obtener las cuidades

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
	
})