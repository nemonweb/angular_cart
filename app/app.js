angular.module('cartApp', [])
  .controller('cartController', function($scope){
    var cart = this;

    //пример
    cart.password = '';
    cart.grade = function() {
      var size = cart.password.length;
      if (size > 8) {
        cart.strength = 'strong';
      } else if (size > 3) {
        cart.strength = 'medium';
      } else {
        cart.strength = 'weak';
      }
    };

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


    cart.items = [
      {
        img: 'http://new.apteka5.ru/images/b/eapteka_817_1398373025.jpg',
        name: 'Найз',
        qty: '1',
        price: '250'
      }
    ];
    
  });
