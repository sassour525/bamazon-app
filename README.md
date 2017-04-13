# bamazon-app
Amazon type app using MySQL and Node.js

This is a node command line application that mimics a simple Amazon type marketplace. There is a Customer application and a Manager application. The data used for this application is stored in a MySQL database.

The Customer application allows the customer to view the list of available products, including the ID, Name, & Price. The customer can select a product to purchace and input the quantity they want. The application will update the database after the process is complet.e. It will then display the total cost to the customer.

The Manager application allows a manager to do 4 possible operations:
1) View the inventory
2) Show low inventory (items with a quantity under 5)
3) Update inventory
4) Add a new product

See the application in action:

bamazonCustomer.js:

