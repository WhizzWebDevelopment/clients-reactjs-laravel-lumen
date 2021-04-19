* under backend folder, run:  
 `composer install`  
  `php artisan serve`  
  
* under frontend folder:  
 `npm install`  
 `npm start`  
  
Then open in browser:  
http://localhost:3000/

* The input of  first and last name is used as the starting characters for  lookup.

* For MySQL database configuration, please see backend folder.env file:
```
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=college
DB_USERNAME=root
DB_PASSWORD=password
```
* Database name is college; table name is clients.  
  `php artisan migrate:install`  
  `php artisan migrate`  
* To prepare testing data, run:  
`php artisan db:seed`  
  
