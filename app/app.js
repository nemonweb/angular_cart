angular.module('cartApp', ['ngResource'])
  .factory("cartFactory", function($resource) {
    return $resource("/api/cart/",
    {'query': { method: 'GET', isArray: false }
    });
  })
  .controller('cartController', function($scope, cartFactory, $http){
    var cart = this;

    /*
    cartFactory.query(function(data) {
      console.log(data);
    });
    */

    $http({ method: 'GET', url: '/api/cart/' })
    .success(function (data, status, headers, config) {
        cart.items = data.products;
        });

    cart.increment = function(item){
      if(item.qty >= 10) return;
      item.qty++;
    };

    cart.decrement = function(item){
      if(item.qty <= 1) return;
      item.qty--;
    };

    cart.removeItem = function(item){
      var index = cart.items.indexOf(item);
      cart.items.splice(index,1);
    };

  });
