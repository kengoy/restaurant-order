# Restaurant Order App
This is a simple Restaurant Order Web App build using React.js and Node.js. See [fronend](https://github.com/kengoy/restaurant-order/tree/main/frontend) to learn more features, component design, and [backend](https://github.com/kengoy/restaurant-order/tree/main/backend) to learn more API specification.

[product-screenshot]: images/screenshot.png
[![][product-screenshot]](#)

## Dev environment quick start

### Prerequisites

- [Install Node.js and npm](https://nodejs.org/en/download/) v18.10.0 (npm 9.5.1) or higher

or

- [Install Docker](https://www.docker.com/)

### Run a local API server
On your local machine with node.js installed, run a API server by the following commands

  ```sh
  cd backend
  ```

  ```sh
  npm install
  ```
  ```sh
  npm start
  ```

or, to run a API server on docker, run the folloing commands

  ```sh
  docker-compose up --build -d
  ```

  ```sh
  docker exec -it backend sh
  ```

  ```sh
  npm install
  ```

  ```sh
  npm start
  ```

The dev server should be listening on http://localhost:3000. 

### Run a frontend app

On another terminal, run the app with the following commands.

  ```sh
  cd frontend
  ```

  ```sh
  npm install
  ```

  ```sh
  npm start
  ```

or, to run an app on docker, run the folloing commands

  ```sh
  docker exec -it frontend sh
  ```

  ```sh
  npm install
  ```

  ```sh
  npm start
  ```


The app should be accessible on http://localhost:8080 on your browser.

For docker, make the container down when you leave.

`docker-compose down`
