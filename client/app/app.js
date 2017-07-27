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
    $scope.student = {};
    $scope.signingIn = false;

    $scope.updateSignIn = (state) => {
      $scope.signingIn = state;
      if (!state) {
        $scope.student = {};
      }
    };

    $scope.findComputers = (filter) => {
        return $http({
          url: '/computers',
          method: "GET",
          params: { filter: filter }
        }).then((successResponse) => {
          $scope.labData = successResponse.data;
          return successResponse;
        }, (failResonse) => {
          console.log('ERROR' + successResponse.status);
          return null;
        });
    };

    $scope.signIn = (computerId, student) => {
      $http({
          url: '/computers',
          method: "POST",
          params: { id: computerId, record: { student: student, status: 'Unavailable' } }
        }).then((successResponse) => {
          var updatedRecord = successResponse.data[0];
          var index = $scope.labData.findIndex((computer) => { return computer._id == updatedRecord._id });
          $scope.labData[index] = updatedRecord;
          $scope.labData[index].signingIn = false;
          $scope.updateSignIn(false);
          return;
        }, (failResonse) => {
          console.log('ERROR' + successResponse.status);
          return null;
        });
    };

    $scope.signOut = (computerId) => {
      $http({
          url: '/computers',
          method: "POST",
          params: { id: computerId, record: { student: {} , status: 'Available' } }
        }).then((successResponse) => {
          var updatedRecord = successResponse.data[0];
          var index = $scope.labData.findIndex((computer) => { return computer._id == updatedRecord._id });
          $scope.labData[index] = updatedRecord;
          return;
        }, (failResonse) => {
          console.log('ERROR' + successResponse.status);
          return null;
        });
    }
    
    $scope.findComputers({});
}]);

app.controller('menuController', ['$scope', ($scope) => {
    console.log('loaded menu controller');
}]);
