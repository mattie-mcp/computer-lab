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

// app.service('stopwatch', () => {
  
//   let startTime;
//   let endTime;
//   let elapsedMs = 0;
//   let tick;

//   this.start = () => {
//     this.startTime = new Date();
//     this.tick = $interval(() => {
//       this.elapsedMs = this.startTime.getTime() - new Date().getTime();
//     }, 1000);
//   };

//   this.stop = () => {
//     this.endTime = new Date();
//     if (this.tick) {
//       this.tick.then(() => {
//         this.tick = null;
//         this.endTime = new Date();
//       });
//     }
//     this.tick = null;
//   };

//   this.reset = () => {
//     this.startTime = null;
//     this.endTime = null;
//     this.elapsedMs = 0;
//     this.tick = null;
//   };
  
// });

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
          params: { id: computerId, record: { student: student, status: 'Unavailable', signInTime: new Date() } }
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
          params: { id: computerId, record: { student: {} , status: 'Available', signInTime: {} } }
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

    $scope.getTime = (dateString) => {
      if (jQuery.isEmptyObject(dateString)) {
        return "";
      }
      var dateTime = new Date(dateString);
      var hours = dateTime.getHours() > 12 ? dateTime.getHours()-12 : dateTime.getHours();
      return hours + ":" + dateTime.getMinutes();
    }
    
    $scope.findComputers({});
}]);

app.controller('menuController', ['$scope', ($scope) => {
    console.log('loaded menu controller');
}]);
