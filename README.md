# HiNodeMongoRest
This is a demo project: create REST API for CRUD operations with Nodejs and Express connect to MongoDB database. This demo also have codes to call external API using Axios.
There are 2 API customers and coins

## Customers API
Provides API for CRUD operations of customers and save data in MongoDB database.
* sample result get-customers

![sample result get-customers](/images/sample-result-getCustomers.png)

## Coins API
Provides API for CRUD operations of coins and save data in MongoDB database. It also call other external API (CoinGecko)  to get coin price for all coins which the saved in the table

* sample result get-coins

![sample result get-coins](/images/sample-result-getCoins.png)

