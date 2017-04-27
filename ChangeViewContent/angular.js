angular.module("NewApp", ['ngRoute']);

angular.module("NewApp")

  .config(['$routeProvider',function($routeProvider){
    $routeProvider.when('/products',{
      templateUrl : 'product-list.html'
    })
    .when('/products/:productId',{
      templateUrl : 'product-page.html',
    })
    .otherwise({ redirectTo: '/products' });
  }])

  .service('filter',[function(){
    this.active = {
      price : {
        min : 0,
        max : 1000000
      },
	    color : "",
	    category : ""
    }
  }])

  .controller("MainCtrl", [ '$scope', 'filter', function($scope,filter){
      $scope.products = products;
	    $scope.isActive = true ;
      $scope.filter = filter.active;
}])

.controller("sidebarCtrl", [ '$scope', 'filter', function($scope,filter){
  $scope.products= products;
  $scope.categoryList= [];
  $scope.colorList = [];

  $scope.filter = filter.active;
  $scope.colorMap= colormap;

  // for (var i = 0; i < $scope.products.length; i++) {
  //   if ($scope.colorList.indexOf($scope.products[i].color) < 0) {
  //     $scope.colorList.push($scope.products[i].color);
  //   }
  // }

  for (var i = 0; i < $scope.products.length; i++) {
    if ($scope.categoryList.indexOf($scope.products[i].category) < 0) {
      $scope.categoryList.push($scope.products[i].category);
    }
  }
}])

  .controller('prdCtrl',['$scope','$routeParams',function($scope,$routeParams){
    $scope.products = products;
    $scope.productId = $routeParams.productId;
    for (var i = 0; i < $scope.products.length; i++) {
      if ($scope.products[i]._id == $scope.productId) {
        $scope.product = $scope.products[i];
      }
    }
  }])

.filter('byPrice',function(){
  return function(list,price){
    var output = [];

    for (var i=0; i<list.length; i++) {
      if ( list[i].price>=price.min && list[i].price<=price.max ) {
        output.push(list[i]);
      }
    }
    return output;
  }
})

.filter('byColor',function(){
  return function(list,color){
    var output = [];
    if(!color) return list;

    for (var i=0; i<list.length; i++) {
      if( list[i].color == color){
        output.push(list[i]);
      }
    }
    return output;
  }
})

.filter('byCategory',function(){
  return function(list,category){
    var output = [];
    if(!category) return list;

    for (var i=0; i<list.length; i++) {
      if( list[i].category == category){
        output.push(list[i]);
      }
    }
    return output;
  }
})
;
