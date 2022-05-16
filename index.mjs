import {} from 'dotenv/config';
import express from 'express';
import { Telegraf } from 'telegraf';
import { districts } from './utils/enums/index.mjs';
import initRestaurantRepository from './repository/index.mjs';
import initHelpers from './utils/helper/index.mjs';

const app = express();
const server = app.listen(process.env.PORT, "0.0.0.0", () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Web server started at http://%s:%s', host, port);
});

const bot = new Telegraf(process.env.BOT_TOKEN);
const db = initRestaurantRepository();
const helpers = initHelpers();

const notify = helpers.notifiers;
const err = helpers.errorMsgGenerator;
const validator = helpers.validators;

// STARTS THE BOT, SENDS A WELCOME MESSAGE
bot.command('start', ctx => {
    console.log(ctx.from)
    notify.sendStartMessage(ctx.chat.id, bot);
})

bot.command('help', ctx => {
  notify.sendHelpMessage(ctx.chat.id, bot)
})

// SAVING A NEW ENTRY TO DB
bot.command('add', ctx => {
  const location = ctx.message.text.split(' ')[1].toLowerCase();
  const url = ctx.message.text.split(' ')[2];
  db.saveNewRestaurant(url, location);
  bot.telegram.sendMessage(ctx.chat.id, `Done! Saved!`)
})

// GET RESTAURANTS FROM DISTRICT GIVEN
bot.command(districts, async  ctx => {
  const district = ctx.update.message.text.split('/')[1].toLowerCase();
  console.log(district);
  const isDistrictValid = validator.checkValidDistrict(district, districts);
  if (!isDistrictValid) err.errorInvalidDistrict(ctx.chat.id, bot);

  fetchRestaurantsInDistrict(ctx, bot, district);
})

const fetchRestaurantsInDistrict = async (ctx, bot, district) => {
  notify.generateRandomMessage(ctx.chat.id, bot, district);
  console.log(ctx.from)

  const restaurants = await db.getRestaurants(district)
  const receivedRestaurantLists = validator.checkRestaurantsReceived(restaurants);
  if (!receivedRestaurantLists) {
    err.errorNoRestaurantsFound(ctx.chat.id, bot);
    return
  } 
    
  const listOfRestaurants = []
  restaurants.forEach(restaurant => {
    listOfRestaurants.push(restaurant.url)
  })

  notify.sendRestaurantOptions(ctx, bot, listOfRestaurants)
  // bot.telegram.sendMessage(ctx.chat.id, "Here you go!")
  notify.sendEndMessage(ctx.chat.id, bot);
  return
}

bot.launch();