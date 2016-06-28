angular.module('app')

.controller('CtrlMaster', function(superService,maincontrol,$scope,$ionicHistory) {

	$scope.logout = function() {
		console.log("si entro");
		superService.logout();

	}

	$scope.myGoBack = function() {
    	$ionicHistory.goBack();
 	 };

})

.directive('hideTabs', function($rootScope) {
  return {
      restrict: 'A',
      link: function($scope, $el) {
          $rootScope.hideTabs = 'tabs-item-hide';
          $scope.$on('$destroy', function() {
              $rootScope.hideTabs = '';
          });
      }
  };
});