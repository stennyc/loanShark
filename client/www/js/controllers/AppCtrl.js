app.controller('AppCtrl', [
  "$scope", "$ionicModal", "$timeout", "Session", "$http",
  "$stateParams", "$state",
  function($scope, $ionicModal, $timeout, Session, $http,
    $stateParams, $state) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};
    $scope.Session = Session;

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
      $scope.modal.hide();
    };

    $scope.logout = function() {
      Session.logOut();
      $state.go("app.home");
    };

    // Open the login modal
    $scope.login = function() {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
      console.log('Doing login', $scope.loginData);

      $http.post("http://localhost:3000/users/login", $scope.loginData)
        .success(function(data){
          console.log(data);
          if (!data) {
            alert('WRONG LOGIN INFO');
          } else {
          console.log('storing user data');
          Session.login(data);
          $state.go('app.friends');
          }
        });

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function() {
        $scope.closeLogin();
      }, 1000);
    };
  }
]);
