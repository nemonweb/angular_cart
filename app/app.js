angular.module('cartApp', ['LocalStorageModule'])
    .config(function (localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix('apteka5');
    })
    .factory("cartFactory", function($http) {
        var cartFactory = {};
        cartFactory.getCart = function() {
            return $http({
                url: "/api/cart/",
                method: "GET"
            });
        };
        return cartFactory;
    })

    .controller('cartController', function($scope, cartFactory, localStorageService) {
        var cart = this;
        console.log('cart ca');
        //localStorageService.set('caer', 'da');
        if(localStorageService.isSupported) {
            var localCart = localStorageService.get('items');
            if(localCart){
                cart.items = localCart;
            }else{
                cartFactory.getCart().success(function(data) {
                    localStorageService.set('items', data.products);
                    cart.items = data.products;
                });
            }
            //localStorageService.set(key, val);
        }

        //$scope.unbind = localStorageService.bind($scope, 'items');

        //console.log(cart.items);
        //console.log($scope);

        /*
        cartFactory.getCart().success(function(data) {
            cart.items = data.products;
        });
        */

        $scope.$watch('items', function() {
           //alert('hey, items has changed!');
       }, true);

       cart.test = function(test){
         alert(test);
       };

        cart.increment = function(item) {
            if (item.qty >= 10) return;
            item.qty++;
            //localStorageService.set('items', cart.items);
        };

        cart.decrement = function(item) {
            if (item.qty <= 1) return;
            item.qty--;
        };

        cart.removeItem = function(item) {
            var index = cart.items.indexOf(item);
            cart.items.splice(index, 1);
        };

    })
    .directive('buyButton', function() {
      return {
          restrict: 'AE',
          replace: 'true',
          template: '<div class="catalog-product_list-item-btn">Купить</div>',
          link: function(scope, element, attr){
              element.bind('click', function() {
                  scope.$apply("cart.test(" + attr.itemId + ")");
                  //scope.buy = true;
                  element.addClass('added_to_cart');
                    element.html(' <a href="/cart/">В корзине</a>  ');
              });
          }
      };
  });
