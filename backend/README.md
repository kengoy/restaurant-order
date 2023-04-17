# API service for Restaurant Order App
This is a simple API service for Restaurant Order Web App built using Express. There are 3 endpoints to get meal data, image file and to post an order. The order submission endpoint should just store the order (item list, total price and payment information) in a fileand return a successful response.

## Dev environment quick start

### Prerequisites

1. [Install Node.js and npm](https://nodejs.org/en/download/) v18.10.0 (npm 9.5.1) or higher

### Run a local API server

`npm install`

`npm start`

The dev server should be accessible on http://localhost:3000 in default. 

### API Specifiction
 See http://localhost:3000/api-doc/.

## Folder structure at glance

    .
    ├── data
    │   ├── images              # Sample image files of meal item 
    │   ├── menu.json           # Sample menu data
    ├── db
    │   ├── order.json          # Placed orders list to be appened per request 
    ├── src
    │   ├── config              # API configuration and Swagger spec file
    │   ├── controllers         
    │       ├── ...             # API controllers
    │   ├── routes              # Sample menu data
    │       ├── ...             # API routes
    │   ├── server.js           # server init
    └── ...
    
## Things to consider for future work
- Add unit tests
- Error handling for each endpoint
- Dockerizing
- HTTPS support for production
- CORS support for production
- Integrate into a database 
