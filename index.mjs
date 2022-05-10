import {} from 'dotenv/config';
import { Telegraf } from 'telegraf';
import { districts } from './utils/enums/index.mjs';
import initRestaurantRepository from './repository/index.mjs';
import initHelpers from './utils/helper/index.mjs';


const bot = new Telegraf(process.env.BOT_TOKEN);
const db =initRestaurantRepository();
const helpers = initHelpers();

const notify = helpers.notifiers;
const err = helpers.errorMsgGenerator;
const validator = helpers.validators;

// STARTS THE BOT, SENDS A WELCOME MESSAGE
bot.command('start', ctx => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, 'Hello you must be Darla🙎‍♀️, Darlo🙍‍♂️ or Poopoo💩 ! Hungry and undecided about where to eat? Send me your location and i will tell you your options!', {
    })
})

// SAVING A NEW ENTRY TO DB
bot.command('save', ctx => {
  const location = ctx.message.text.split(' ')[1];
  const url = ctx.message.text.split(' ')[2];
  db.saveNewRestaurant(url, location);
  bot.telegram.sendMessage(ctx.chat.id, `Done! Saved!`)
})

// GET ENTRIES FROM DISTRICT GIVEN
bot.command(districts, async  ctx => {
  const district = ctx.update.message.text.split('/')[1];
  console.log(district);
  const isDistrictValid = validator.checkValidDistrict(district, districts);
  if (!isDistrictValid) err.errorInvalidDistrict(ctx.chat.id, bot);

  fetchRestaurantsInDistrict(ctx, bot, district);
})

const fetchRestaurantsInDistrict = async (ctx, bot, district) => {
    notify.generateRandomMessage(ctx.chat.id, bot, district);
    console.log(ctx.from)
    //  Retrieve restaurants and call sendFoodOptions()
    const restaurants = await db.getRestaurants(district)
    const receivedRestaurantLists = validator.checkRestaurantsReceived(restaurants);
    if (!receivedRestaurantLists) err.errorNoRestaurantsFound(ctx.chat.id, bot);
    
    const listOfRestaurants = []
    restaurants.forEach(restaurant => {
      listOfRestaurants.push(restaurant.url)
    })

    notify.sendRestaurantOptions(ctx, bot, listOfRestaurants)
    return
}

bot.launch();