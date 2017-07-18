angular.module('app', ['ngRoute'])
  .config(['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {
  $locationProvider.html5Mode({ enabled: true, requireBase: false});
  console.log('loaded module');
    $routeProvider
      .when('/', {
        templateUrl: '/index.html',
        controller: 'appController'
      })
      .when('/dist/__header.html', {
        templateUrl: '/dist/__header.html',
        controller: 'menuController'
      });;
}]);

angular.module('app').controller('appController', ['$scope', ($scope) => {
    console.log('loaded controller');
    $scope.user;
    
    $scope.labData = [{id: 1, occupancy: 'John Smith', status: 'occupied'},
                      {id: 2, occupancy: 'Jane Doe', status: 'occupied'}];
    $scope.signIn = (data) => {
      console.log(data);
    };

    $scope.clear = () => {
      $scope.user = {};
    };
}]);

angular.module('app').controller('menuController', ['$scope', ($scope) => {
    console.log('loaded menu controller');
}]);