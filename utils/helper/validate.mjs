const checkValidDistrict = (district, districtList) => {
  return districtList.includes(district);
}

const checkRestaurantsReceived = (restaurants) => {
  return restaurants.length > 0;
}

const initValidators = () => {
  return {
    checkValidDistrict,
    checkRestaurantsReceived,
  }
}

export default initValidators;