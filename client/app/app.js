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

        // return $http({
        //   url: '/computers',
        //   method: "GET",
        //   params: { filter: filter }
        // }).then((successResponse) => {
        //   return successResponse;
        // }, (failResonse) => {
        //   console.log('ERROR' + successResponse.status);
        //   return null;
        // });

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
    
    $scope.findComputers({})
      .then((success, reject) => {
        console.log('accept' + JSON.stringify(success.data));
        $scope.labData = success.data;
      });

    $scope.signIn = (computerId, student) => {
      $http({
          url: '/computers',
          method: "POST",
          params: { id: computerId, student: student }
        }).then((successResponse) => {
          var updatedRecord = successResponse.data[0];
          console.log(JSON.stringify(updatedRecord));
          $scope.labData.find((computer) => { 
            if (computer._id == updatedRecord._id) {
              computer.student = updatedRecord.student;
              computer.time = updatedRecord.time;
              return true;
            }
          });
          $scope.clear();
          return;
        }, (failResonse) => {
          console.log('ERROR' + successResponse.status);
          return null;
        });
    };

    $scope.clear = () => {
      $scope.student = {};
    };
}]);

app.controller('menuController', ['$scope', ($scope) => {
    console.log('loaded menu controller');
}]);
