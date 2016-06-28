angular.module('app')

.controller('LoginCtrl', function(superService,maincontrol,$state) {

	if (maincontrol.get('email') !== null) {

		$state.go('app.index');
	};
	  
	var vm = this;

	vm.loginForm = {

		email : '',
		password : ''

	};



	vm.login = function (){

		superService.loginApi(vm.loginForm);

	}

})