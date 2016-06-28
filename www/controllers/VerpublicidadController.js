angular.module('app')

.controller('CtrlVerPublicidad', function($scope, maincontrol,$http,$ionicPopup){
	
var user_id =maincontrol.get('id');
verpublicidad($http,$scope,user_id);

	
	function verpublicidad (){

		console.log(user_id);

		$http.get('https://api-guillospy92.c9users.io/public/verpublicdad/'+user_id)
		
		.success(function(response){

			$scope.publicidad = response;

		})

		.error(function(response){

			 $ionicPopup.confirm({
        title: "error",
        content: " error en el servidor "
      })

		})


	}

})