import { westMessages, eastMessages } from '../enums/index.mjs';

// RECEIVES AN ARRAY AND SENDS EACH ELEMENT AS A MESSAGE TO TELEGRAM
const sendRestaurantOptions = (ctx, bot, restaurants) => {
  restaurants.forEach(restaurant => {
    bot.telegram.sendMessage(ctx.chat.id, `${restaurant} \n`, {
    })
  });
}


const generateRandomMessage = (ctxChatID, bot, district) => {
  let message
  switch (district) {
    case 'west':
      message = westMessages[Math.floor(Math.random() * westMessages.length)]
      break
    case 'east':
       message = eastMessages[Math.floor(Math.random() * eastMessages.length)]
       break
    default:
      message = 'Let me see ...'
      break
  }

  bot.telegram.sendMessage(ctxChatID, message, {})
};

const initNotifiers = () => {
  return {
    generateRandomMessage,
    sendRestaurantOptions
  }
}

export default initNotifiers;