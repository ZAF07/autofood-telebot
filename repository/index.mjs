import { saveNewRestaurant, getRestaurants } from './restaurant.mjs';

const initRestaurantRepository = () => {
  return {
    saveNewRestaurant, getRestaurants
  }
}

export default initRestaurantRepository;