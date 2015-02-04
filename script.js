var moviesApp = angular.module("MoviesApp", ['ui.bootstrap']);

moviesApp.controller("SearchController", ["$scope", "$http", function($scope, $http) {

  $scope.movies = {};
  $scope.searchTerm = window.localStorage.searchTerm || "";
  $scope.loading = false;
  try {
    $scope.searchTerms = JSON.parse(window.localStorage.searchTerms) || ["matrix", "seattle", "bomb"];
  } catch(e) {
    console.log('error: ', e);
    $scope.searchTerms = [];
  }

  $scope.search = function() {
    
    $scope.loading = true;

    if ( $scope.searchTerm.length < 1 ) {
      $scope.movies.Error = "Please enter a valid search term."
      return;
    };

    var req = {
      url: "http://www.omdbapi.com",
      params: {
        s: $scope.searchTerm,
        type: $scope.searchType
      } 
    }

    $http(req).success(function(data) {
      $scope.movies = data;
      $scope.loading = false;
      if ($scope.searchTerms.indexOf($scope.searchTerm) < 0) {
        $scope.searchTerms.push($scope.searchTerm);
      };
      window.localStorage.searchTerms = JSON.stringify($scope.searchTerms)
    });

  };

    // $scope.$watch("searchTerm", function(newVal, oldVal) {
    //   if (newVal) {
    //     window.localStorage.searchTerm = $scope.searchTerm;
    //   }
    // });

    if ($scope.searchTerm) {
      $scope.search();
    }

    // Auto-search on page load
    $scope.search();

}]);