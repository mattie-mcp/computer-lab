angular.module('services.computers', [])
  .service('computerService', ($http) => {
    console.log('loaded computer data service');
    return $http({
      url: '/computers',
      method: "GET",
      params: { filter: {} }
    }).then((successResponse) => {
      console.log('service call succeeded');
      return successResponse;
    }, (failResonse) => {
      console.log('ERROR' + successResponse.status);
      return null;
    });
});