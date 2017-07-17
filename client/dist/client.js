angular.module('app', ['ngRoute']);

angular.module('app').config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  console.log('loaded module');
  //$routeProvider.otherwise({redirectTo:'/projectsinfo'});
}]);

angular.module('app').controller('AppController', ['$scope', ($scope) => {
    console.log('loaded controller');
}]);