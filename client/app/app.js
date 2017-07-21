var app = angular.module('app', [
  'ngRoute',
  'services.computers'
]);

app.config(['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {
  $locationProvider.html5Mode({ enabled: true, requireBase: false});
    $routeProvider
      .when('/', {
        templateUrl: '/index.html',
        controller: 'appController'
      });
}]);

app.controller('appController', ['$scope', '$http', ($scope, $http) => {
    $scope.user = {};
    $scope.signingIn = false;

    $scope.updateSignIn = (state) => {
      $scope.signingIn = state;
    };

    $scope.findComputers = (filter) => {
        return $http({
          url: '/computers',
          method: "GET",
          params: { filter: filter }
        }).then((successResponse) => {
          return successResponse;
        }, (failResonse) => {
          console.log('ERROR' + successResponse.status);
          return null;
        });
    };

    $scope.updateComputerAndRefresh = (payload) => {
        return $http({
          url: '/computers',
          method: "POST",
          params: { payload: payload }
        }).then((successResponse) => {
          return successResponse;
        }, (failResonse) => {
          console.log('ERROR' + successResponse.status);
          return null;
        });
    };
    
    $scope.findComputers({})
      .then((success, reject) => {
        console.log('accept' + JSON.stringify(success.data));
        $scope.labData = success.data;
      });

    $scope.signIn = (data) => {
      //console.log(data);
      $scope.updateComputer(data)
        .then((success, reject) => {

        });
    };

    $scope.clear = () => {
      $scope.user = {};
    };
}]);

app.controller('menuController', ['$scope', ($scope) => {
    console.log('loaded menu controller');
}]);
