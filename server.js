var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var paypal = require('paypal-rest-sdk');
var cors = require('cors');

var PRODUCTS_FILE = path.join(__dirname, 'src/assets/js/components/product-data.json');

app.set('port', (process.env.PORT || 3000));

app.use(cors())
app.use('/', express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

function cambiarValorPorcentaje(numero) {
	var random_sign = Math.random();
	var random_value = 20 * Math.random();
	var change = numero*random_value / 100
	if (random_sign < 0.5) {
		var new_value = numero - change
	}else{
		var new_value = numero + change
	}
	return Math.max(1,new_value)
}

setInterval(function() {
    fs.readFile(PRODUCTS_FILE, function(err,data,products){
        if (err){
            console.log(err)
            process.exit(1);
        }
        products = JSON.parse(data);
        for(var i = 0; i < products.length; i++)
        {
		    products[i]['price'] = cambiarValorPorcentaje(parseFloat(products[i]['price'])).toFixed(2).toString()
        }
        fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 4), function(err) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        }); 
    });
    }, 15000);


// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api/products', function(req, res) {
    fs.readFile(PRODUCTS_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        products = JSON.parse(data);
        let prod_id = products.map(item => ({id: item.id, name: item.name}));
        res.json(prod_id);
    });
});

app.get('/api/product/:id', function(req, res) {

    fs.readFile(PRODUCTS_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }

        var json = JSON.parse(data);

        for(var i = 0; i <= json.length; i++)
        {
            if(json[i]['id'] == req.params.id)
            {
                res.json(json[i]);
                break;
            }
        }
    });
});

app.put('/api/product/:id', function(req, res) {
    fs.readFile(PRODUCTS_FILE, function(err,data,products){
        if (err){
            console.log(err)
            process.exit(1);
        }
        products = JSON.parse(data);

        for(var i = 0; i < products.length; i++)
        {
            if(products[i]['id'] == req.params.id){
		res.json(products[i]['price'])
		break;
	    }
	}
	});
});

app.post('/api/product/create', function(req, res) {

    fs.readFile(PRODUCTS_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        var products = JSON.parse(data);

        var newProduct = {
            id: Date.now(),
            name: req.body.name,
            price: req.body.price,
        };
        products.push(newProduct);
        fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 4), function(err) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            res.json(products);
        });
    });
});

app.patch('/api/product/edit/:id', function(req, res) {
    fs.readFile(PRODUCTS_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        var products = JSON.parse(data);

        for(var i = 0; i <= products.length; i++)
        {
            if(products[i]['id'] == req.params.id)
            {
                var product = products[i];
                product.name = req.body.name;
                product.price = req.body.price;

                products.splice(i, 1);
                products.push(product);

                fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 4), function(err) {
                    if (err) {
                        console.error(err);
                        process.exit(1);
                    }
                    res.json(products);
                });
                break;
            }
        }
    });
});

app.delete('/api/product/delete/:id', function(req, res) {
    fs.readFile(PRODUCTS_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        var products = JSON.parse(data);

        for(var i = 0; i <= products.length; i++)
        {
            if(products[i]['id'] == req.params.id)
            {
                products.splice(i, 1);

                fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 4), function(err) {
                    if (err) {
                        console.error(err);
                        process.exit(1);
                    }
                    res.json(products);
                });
                break;
            }
        }
    });
});

app.get('/api/products/search/:term', function(req,res){
    term = (req.params.term).toLowerCase();
    fs.readFile(PRODUCTS_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        products = JSON.parse(data);
	matchingProducts = []
	for(var i = 0; i < products.length; i++)
        {
           if(products[i]['name'].toLowerCase().includes(term)){
		   matchingProducts.push(products[i])
	   }

        }
  	matchingNames = matchingProducts.map((product) => product.name);
  	res.json(matchingNames);
    });
});

app.post('/api/order/create/', function(req, res) {
    const lista = req.body.lista;

    fs.readFile(PRODUCTS_FILE, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error al leer el archivo de productos.');
        return;
      }

    const products = JSON.parse(data);
    let total = 0;
    lista.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (product && product.price) {
          total += product.price * item.qty;
        }
      });
  
      res.json({ total });
    });
});

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AV8MPmd1b80NBdLxK32A86bO1vY-GxKk8Nqzgi0CYPeTuJ8SI3FCzks53EfX2hDvWOg0K4gMqLvD80GV',
    'client_secret': ''
  });
  app.post('/checkout' , (req , res) => {
      console.log(req.body);
      var execute_payment_json = {
        "payer_id": req.body.data.payerID,
      };
      const payment = {};
      payment.amount = req.body.data.amount; 
      const paymentID = req.body.data.paymentID;
      paymentPaypal(paymentID, execute_payment_json, payment,(err, result) => {
          if(err) {
            res.status(400).json(JSON.stringify(err));
          } else {
            res.status(200).json(payment);
          }
      });
  });
  
  
  var paymentPaypal = (paymentID, execute_payment_json, payment, cb) => {
      paypal.payment.execute(paymentID, execute_payment_json,(error, paymentLog) => {
          if (error)
          {
              return cb(error);
          }
          else
          {
              payment.email = paymentLog.payer.payer_info.email;
              payment.first_name = paymentLog.payer.payer_info.first_name;
              payment.last_name = paymentLog.payer.payer_info.last_name;
              console.log(payment);
              cb(null, JSON.stringify(payment));
         }
      });
  }


app.listen(app.get('port'), function() {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});
