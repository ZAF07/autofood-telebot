
import {} from 'dotenv/config';
import initRestaurantRepository from './repository/index.mjs';
import { generateRandomMessage, sendRestaurantOptions } from './utils/helper/index.mjs';
import { Telegraf } from 'telegraf';

const bot = new Telegraf(process.env.BOT_TOKEN);
const db =initRestaurantRepository();

// STARTS THE BOT, SENDS A WELCOME MESSAGE
bot.command('start', ctx => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, 'Hello you must be Darla🙎‍♀️, Darlo🙍‍♂️ or Poopoo💩 ! Hungry and undecided about where to eat? Send me your location and i will tell you your options!', {
    })
})

// GET ENTRIES FROM THE EAST
bot.command('east', ctx => {
  bot.telegram.sendMessage(ctx.chat.id, `Ok! Lets see what the east has in store for us! 😬`, {
  })
  console.log(ctx.from)

  db.getRestaurants('east')
    .then(restaurants => {
      if (restaurants.length < 1) {
        bot.telegram.sendMessage(ctx.chat.id, 'Nothing found sorry 🙁', {})
        return
      }
      sendRestaurantOptions(ctx, bot, restaurants);
    });
});

// GET ENTRIES FROM THE WEST
bot.command('west', ctx => {
  const listOfRestaurants = []
  const message = generateRandomMessage('west');
  bot.telegram.sendMessage(ctx.chat.id, message, {
  })
  console.log(ctx.from)
  //  Retrieve restaurants and call sendFoodOptions()
  db.getRestaurants('west')
    .then(restaurants => {
      restaurants.forEach(restaurant => {
        listOfRestaurants.push(restaurant.url)
      });
      sendRestaurantOptions(ctx, bot, listOfRestaurants)
    })
})

// SAVING A NEW ENTRY TO DB
bot.command('save', ctx => {
  const location = ctx.message.text.split(' ')[1];
  const url = ctx.message.text.split(' ')[2];
  db.saveNewRestaurant(url, location);
  bot.telegram.sendMessage(ctx.chat.id, `Done! Saved!`)
})

bot.launch();