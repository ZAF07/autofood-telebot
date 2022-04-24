import DB from '../model/models/index.mjs';

const saveNewRestaurant = (url, location) => {
  DB.Restaurants.create({url, location})
};

const getRestaurants = async (location) => {
  const idea = await DB.Restaurants.findAll({ 
    attributes: ['url'],
    where: {
      location
    }
  })
  const restaurants = []
  idea.forEach(i => {
    restaurants.push(i.dataValues)
  })
  return restaurants
}

export {
  saveNewRestaurant,
  getRestaurants
}