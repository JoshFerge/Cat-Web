var phoneCatApp = angular.module('catApp', ['ngRoute']);


 phoneCatApp.config(function($routeProvider) {
  $routeProvider

    // route for the home page
    .when('/', {
        templateUrl : 'search.html',
        controller  : 'mainCtrl'
    })

    // route for the cats page
    .when('/cats', {
        templateUrl : 'cats.html',
        controller  : 'catCtrl'
    })

});


phoneCatApp.controller('mainCtrl', function ($rootScope,$scope,$http,$location) {
  $rootScope.header = "Meow Search";
  $scope.enter = function() {
     $location.path('/cats');
  }
});


phoneCatApp.controller('catCtrl', function ($rootScope,$scope,$http,$location) {
  $rootScope.header = "Cats";

  $scope.goHome = function() {
    $location.path('/');
  }

  $scope.getCats = function() {
    $http.get("http://cat-server.herokuapp.com/").success(function(response) {
      $scope.catURLs = response.catURLs;
    });
  }

  $scope.getCats()

});

phoneCatApp.directive('focus', function($timeout) {
  return {
    scope : {
     trigger : '@focus'
    },
    link : function(scope, element) {
      scope.$watch('trigger', function(value) {
        if (value === "true") {
          $timeout(function() {
            element[0].focus();
          });
        }
      });
    }
  };
}); 








