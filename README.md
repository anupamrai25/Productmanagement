# productmanagement
This is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) project that demonstrates CRUD (Create, Read, Update, Delete) operations. It includes a RESTful API backend with Node.js and Express, a SQL database for storing data, and a frontend built using React.js.
For installing React app I used the command "npx create-react-app appname"
To start the project we have to go to its directory like "cd filename".
To start the react app the command is "npm start"
To install any dependenices i used the command " npm install package name".

For Backend setup in node js first i craete a project with command "npm init -y" this command will create a package.json file.
In backend i followed a MVC pattern to make the folder structure like Mdel,View,Controller in model i write how to make the dabatbase connection and in controller i write the api logic.
To start backend server use the command "npm start".
My Api Endpoints like this
GET /api/products - Get all products.
GET /api/products/:id - Get a specific product by ID.
POST /api/products - Create a new product.
PUT /api/products/:id - Update a product by ID.
DELETE /api/products/:id - Delete a product by ID.
