require('dotenv').config();
const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN)



bot.command('start', ctx => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, 'Hello you must be Darla🙎‍♀️, Darlo🙍‍♂️ or Poopoo💩 ! Hungry and undecided about where to eat? Send me your location and i will tell you your options!', {
    })
})

const options = {
  Taiwanese: 'https://yeah-taiwanese.business.site/?utm_source=gmb&utm_medium=referral',
  Japanese: 'https://www.yuzuhv.com/'
}

const foodOptions = () => {
  b = []
  for (const option in options) {
    b.push(options[option])
  }
  return b
}

const sendFoodOptions = (ctx) => {
  const foods = foodOptions()
  foods.forEach(food => {
    bot.telegram.sendMessage(ctx.chat.id, `${food} \n`, {
    })
  });
}

// GET POSSIBLE ENTRIES FROM THE EAST
bot.command('east', ctx => {
  console.log(ctx.message)
    bot.telegram.sendMessage(ctx.chat.id, `Ok! Lets see what the east has in store for us! 😬`, {
    })
    console.log(ctx.from)
    sendFoodOptions(ctx)
})

// SAVING A NEW ENTRY TO DB
bot.command('save', ctx => {
  const toSave = ctx.message.text.split(' ')[1]
  console.log('Saving to database', toSave);
  bot.telegram.sendMessage(ctx.chat.id, `Done! Saved!`)
})

bot.launch();