describe("Unit-test: cartController", function(){
  beforeEach(module('cartApp'));

  initialCartData = [
    {
      img: 'http://new.apteka5.ru/images/b/eapteka_817_1398373025.jpg',
      name: 'Найз',
      qty: '1',
      price: '250'
    },
    {
      img: 'http://new.apteka5.ru/images/b/eapteka_817_1398373025.jpg',
      name: 'Найз2',
      qty: '2',
      price: '255'
    }
  ];

  var ctrl, scope;
  // inject the $controller and $rootScope services
  // in the beforeEach block
  beforeEach(inject(function($controller, $rootScope) {
    // Create a new scope that's a child of the $rootScope
    scope = $rootScope.$new();
    // Create the controller
    ctrl = $controller('cartController', {
      $scope: scope
    });
  }));

  //перед каждым тестом инициировать данные
  beforeEach(function() {
    ctrl.items = initialCartData;
  });


  describe('cart.increment', function(){

    it('increase the number of goods in one', function(){
      var item = ctrl.items[0];
      item.qty = 1;
      ctrl.increment(item);
      expect(item.qty).toEqual(2);
    });

    it('not to increase the number of goods more than 10', function(){
      var item = ctrl.items[0];
      item.qty = 10;
      ctrl.increment(item);
      expect(item.qty).toEqual(10);
    });

  });

  describe('cart.decrement', function(){

    it('reduce the amount of goods on the one', function(){
      var item = ctrl.items[0];
      item.qty = 2;
      ctrl.decrement(item);
      expect(item.qty).toEqual(1);
    });

    it('not to reduce the number of goods if the goods are one', function(){
      var item = ctrl.items[0];
      item.qty = 1;
      ctrl.decrement(item);
      expect(item.qty).toEqual(1);
    });

  });

  describe('cart.removeItem', function(){

    it('remove items', function(){
      var item = ctrl.items[0];
      ctrl.removeItem(item);
      var index = ctrl.items.indexOf(item);
      expect(index).toEqual(-1);
    });
    
  });


});
