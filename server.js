var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var faker = require('faker');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();
router.route('/cart')
  .get(function(req, res){
    cart = {
      cart_id: 123,
      products: getProducts()
    };
    res.json(cart);
  });

function getProducts(){
  var i = 0;
  var products = Array();
  while (i < 3) {
    product = {
      img: faker.image.food(),
      name: faker.name.findName(),
      price: faker.finance.amount()
    };
    products.push(product);
    i++;
  }
  return products;
}

app.use('/api', router);
app.listen(port);
console.log('magic port ' + port);
