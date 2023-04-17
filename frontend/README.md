# React App for Restaurant Meals Order 
This is a simple react app for Restaurant Order Web App with integration of a backend API service. The app does:

- Featch menu data from the web API and show categorized menu items
- Allow user to add/remove items multiple times to their local cart
- Allow user to checkout, fill a payment form, and place an order.

## Dev environment quick start

### Prerequisites

1. [Install Node.js and npm](https://nodejs.org/en/download/) v18.10.0 (npm 9.5.1) or higher

### Run a local API server

`npm install`

`npm run dev`

The dev server should be accessible on http://localhost:8080 in default. 


## Folder structure at glance

    .
    ├── src
    │   ├── components         
    │       ├── Cart            
    │           ├── ...        # Cart, CartItem, PaymentForm components
    │       ├── Layout           
    │           ├── ...        # Header, HeaderCartButton components
    │       ├── Meals 
    │           ├── ...        # AvailableMeals, MealItem, MealItemForm components
    │       ├── UI 
    │           ├── ...        # Common UI components
    │   ├── stores              
    │       ├── ...            # Cart context provider and reducer to share state among components
    │   ├── App.jsx            # Initial screen
    │   ├── index.css          # Global styles for all elements
    │   ├── main.jsx           # Root element
    └── index.html
    └── ...
    
## Things to consider for future work

- Add tests for each component
- More error handling (upper limit of amounts to be inputted, server request timeout etc)
- Dockerizing
- UX improvements
  - Allow users to filter meal items by selecting a category and/or by inputting a keyword, and/or selecting tags
  - Recommend related items when user add an item to their cart (ex, Indian Entree added, then Naan and drink are recommended with pop up screen.)
- Create another end point and UI for restaurant managers to receive orders, confirm the order history etc.
