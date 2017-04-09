var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    database: 'Bamazon'
});

getProductList();

//generate product list for user review
function getProductList() {
    connection.connect(function(err) {
        if(err) throw err;

        connection.query('SELECT * FROM products', function(err, res){
            if(err) throw err;
            console.log('Bamazon Product List:');
		    console.log('==============================\n');
            for (var i = 0; i < res.length; i++) {
                console.log('Item ID: ' + res[i].item_id);
                console.log('--------------------');
                console.log('Name: ' + res[i].product_name);
                console.log('Price: ' + res[i].price.toFixed(2) + '\n');
            };
            console.log('==============================');

            promptUser();
        });
    });
};

//asked user what item id and quantity they want to purchase
function promptUser() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Please enter the ID of the product you would like to purchase.',
            name: 'product_id'
        },
        {
            type: 'input',
            message: 'Please enter the quantity you would like to purchase.',
            name: 'quantity'
        }
    ]).then(function(user) {
        var id = user.product_id;
        var qty = user.quantity;

        console.log('ID: ' + id);
        console.log('QTY: ' + qty);

        placeOrder(id, qty);
    });
}

//confrim enough quantity is available, update DB and display total
function placeOrder(id, quantity){
    connection.query('SELECT stock_quantity, price FROM products WHERE ?', {item_id: id}, function(err, res) {
        if(err) throw err;
        var db_qty = res[0].stock_quantity;
        var price = res[0].price * quantity;
        console.log(db_qty);

        if(quantity > db_qty) {
            console.log('Insufficient quantity!');
        } else {
            var new_qty = db_qty - quantity;
            console.log(new_qty);
            connection.query('UPDATE products SET stock_quantity = ? WHERE item_id = ?', [new_qty, id], function(err, res) {
                console.log('Your total = ' + price.toFixed(2) + '\n');
                placeAnotherOrder();
            });
        }
    });
};

function placeAnotherOrder() {
    inquirer.prompt([
        {
            type: 'confirm',
            message:'Would you like to place another order?',
            name: 'confirm',
            default: false
        }
    ]).then(function(user) {
        if(user.confirm) {
            getProductList();
        } else {
            connection.destroy();
            return;
        }
    });
}