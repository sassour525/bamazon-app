# bamazon-app

A node command line application that mimics an Amazon type marketplace. There is a Customer application and a Manager application. The data used for this application is stored in a MySQL database.

The Customer application allows the customer to view the list of available products, including the ID, Name, & Price. The customer can select a product to purchace and input the quantity they want. The application will update the database after the process is complete. It will then display the total cost to the customer.

The Manager application allows a manager to do 4 possible operations:
1) View the inventory
2) Show low inventory (items with a quantity under 5)
3) Update inventory
4) Add a new product

See the application in action:
 
### bamazonCustomer.js
 
Initial database values

![initial_db](https://cloud.githubusercontent.com/assets/22712344/25007863/7f82b446-2027-11e7-83a2-adff76df3771.png)

Console view of a single item being purchased:

![single-item-purchase](https://cloud.githubusercontent.com/assets/22712344/25007865/7f85c654-2027-11e7-9750-995ae860b7ff.png)

Database quantity after a user has purchased an item:

![db-qty-total-after-purchase](https://cloud.githubusercontent.com/assets/22712344/25007858/7f77e340-2027-11e7-9ddc-1fadd84ce748.png)

### bamazonManager.js

Options the manager has when using the application:

![manger-options](https://cloud.githubusercontent.com/assets/22712344/25007864/7f82e98e-2027-11e7-823d-f54be6d393b2.png)

The output when a manager selects to view the products:

![manager-view-products](https://cloud.githubusercontent.com/assets/22712344/25007862/7f8298a8-2027-11e7-9efb-c3b691162b61.png)

The output when a manager selects to view low inventory:

![view-low-inv](https://cloud.githubusercontent.com/assets/22712344/25007866/7f92b6b6-2027-11e7-8a4e-c01d7c4a1ae1.png)

Manager updating product quantity:

![add-to-quantity](https://cloud.githubusercontent.com/assets/22712344/25007859/7f788016-2027-11e7-97ef-75e3a6737674.png)

Database after the quantity has been updated:

![db-after-qty-update](https://cloud.githubusercontent.com/assets/22712344/25007860/7f78e556-2027-11e7-9771-67f2ff1db2dd.png)

Manager adding a new product:

![add-new-product](https://cloud.githubusercontent.com/assets/22712344/25007861/7f7edc0e-2027-11e7-9d73-75ffb61b8c94.png)

Database values after the new product is added:

![db-after-new-product-added](https://cloud.githubusercontent.com/assets/22712344/25007857/7f779372-2027-11e7-817e-e485111ef8b6.png)
