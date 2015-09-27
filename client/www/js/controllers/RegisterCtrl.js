app.controller("RegisterCtrl", [
	"$http",
	"Session",
	"$scope",
	"$state",
	function($http, Session, $scope, $state) {

		$scope.registerUser = function(user) {
      $http.post("http://localhost:3000/users/signup", user)
        .success(function(data){
        	console.log(data);
          Session.login(data);
          $state.go('app.friends');
        });
		};
		
	}
]);
