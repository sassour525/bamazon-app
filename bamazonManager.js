var mysql = require('mysql');
var inquirer = require('inquirer');

//create connection to MySQL DB
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    database: 'Bamazon'
});

promptAdmin();

//prompt admin for which operation they would like to perform
function promptAdmin() {
	inquirer.prompt([
		{
			type: 'list',
			message: 'Welcome to Bamazon Manager App. What would you like to do?',
			choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product'],
			name: 'choice'
		}
	]).then(function(user) {

		if (user.choice == 'View Products for Sale') {
			viewProductsForSale();
		} else if (user.choice == 'View Low Inventory') {
			viewLowInventory();
		} else if (user.choice == 'Add to Inventory') {
			addToInventory();
		} else if (user.choice == 'Add New Product') {
			addNewProduct();
		}
	});
};

//select full list of products for sale
function viewProductsForSale() {
	connection.query("SELECT * FROM products", function(err, res) {
		if(err) throw err;
		console.log('\nProducts For Sale:');
	    console.log('==============================\n');
        for (var i = 0; i < res.length; i++) {
            console.log('Item ID: ' + res[i].item_id);
            console.log('--------------------');
            console.log('Name: ' + res[i].product_name);
            console.log('Price: ' + res[i].price.toFixed(2));
            console.log('Quantity: ' + res[i].stock_quantity + '\n');
        };
        console.log('==============================\n');

        performAnotherAction();
	});
};

//select items with stock_quantity less than 5
function viewLowInventory() {
	connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, res) {
		if(err) throw err;
		console.log('\nItems with inventory less than 5 units:');
	    console.log('================================================\n');
	    for (var i = 0; i < res.length; i++) {
		    console.log('Item ID: ' + res[i].item_id);
		    console.log('Name: ' + res[i].product_name);
		    console.log('Quantity: ' + res[i].stock_quantity + '\n');
		};
		console.log('================================================\n');

    	performAnotherAction();
	});
};

//update stock_quantity to update inventory total
function addToInventory() {
	connection.query("SELECT * FROM products", function(err, res) {
		if(err) throw err;
		console.log('\nProducts available to update:');
	    console.log('==============================\n');
        for (var i = 0; i < res.length; i++) {
            console.log('Item ID: ' + res[i].item_id);
            console.log('--------------------');
            console.log('Name: ' + res[i].product_name);
            console.log('Quantity: ' + res[i].stock_quantity + '\n');
        };
        console.log('==============================\n');
	
	    inquirer.prompt([
	        {
	            type: 'input',
	            message: 'Please enter the ID of the product you would like to add inventory to: ',
	            name: 'product_id'
	        },
	        {
	            type: 'input',
	            message: 'Please enter the quantity you would like to add: ',
	            name: 'quantity'
	        }
	    ]).then(function(user) {
	        var id = user.product_id;
	        var qty = user.quantity;

		    connection.query('SELECT stock_quantity FROM products WHERE ?', {item_id: id}, function(err, res) {
		        if(err) throw err;
		        var db_qty = res[0].stock_quantity;
	            var new_qty = parseInt(db_qty) + parseInt(qty);
	            connection.query('UPDATE products SET stock_quantity = ? WHERE item_id = ?', [new_qty, id], function(err, res) {
	                console.log('\nThe new quantity = ' + new_qty + '\n');
	                performAnotherAction();
	            });
		    });
	    });
	});
};

//insert a new product into the products table
function addNewProduct() {
	inquirer.prompt([
		{
            type: 'input',
            message: 'Please enter the product name: ',
            name: 'product_name'
        },
        {
        	type: 'input',
            message: 'Please enter the department: ',
            name: 'product_department'
        },
        {
        	type: 'input',
            message: 'Please enter the price: ',
            name: 'product_price'
        },
        {
        	type: 'input',
            message: 'Please enter the quantity: ',
            name: 'product_quantity'
        }
	]).then(function(input) {
		var query = "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)";
		connection.query(query, [input.product_name, input.product_department, input.product_price, input.product_quantity], function(err, res) {
			if(err) throw err;
			console.log('\nProduct Successfully added!\n');
			performAnotherAction();
		});
	});
};

//prompt user if they want to perform another action or end the program
function performAnotherAction() {
    inquirer.prompt([
        {
            type: 'confirm',
            message:'Would you like to perform another action?',
            name: 'confirm',
            default: false
        }
    ]).then(function(user) {
        if(user.confirm) {
            promptAdmin();
        } else {
            connection.destroy();
            return;
        }
    });
}