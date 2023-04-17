import MealItem from './MealItem';
import classes from './AvailableMeals.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

// server url base is configured in .env
const SERVER_API_BASE = import.meta.env.VITE_ORDER_SYSTEM_API_BASE_URL;
const SERVER_API_MENU = SERVER_API_BASE + 'v1/menu';
const SERVER_API_IMAGE_BASE = SERVER_API_BASE + 'v1/image/';

const AvailableMeals = () => {
  // state variables for available meals and error message
  const [menu, setMenu] = useState(null);
  const [httpError, setHttpError] = useState(null);

  // fetch available meals data from server
  useEffect(() => {
    axios
      .get(SERVER_API_MENU)
      .then((response) => {
        const data = response.data;
        if (data.status !== 'success')
          throw new Error('Something went wrong with fetching menu.');
        setMenu({ ...data.data.menu });
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
        setHttpError(error.message);
      });
  }, []);

  // display error message in case of network error
  if (httpError) {
    return (
      <section className={classes.httpError}>
        <p>{httpError}</p>
      </section>
    );
  }

  return (
    <>
      {menu && (
        <section className={classes.meals}>
          {menu.categories.map((category) => {
            const itemList = menu.items
              .filter((item) => item.category_id === category.id)
              .map((item) => (
                <MealItem
                  id={item.id}
                  categoryId={item.category_id}
                  key={item.id}
                  imageSrc={SERVER_API_IMAGE_BASE + item.image_id}
                  name={item.name}
                  price={item.price}
                />
              ));

            return (
              <div key={category.id} className={classes.category}>
                <h1>{category.name}</h1>
                <div className={classes.items}>{itemList}</div>
              </div>
            );
          })}
        </section>
      )}
    </>
  );
};

export default AvailableMeals;
