import { westMessages, eastMessages } from '../enums/index.mjs';

// RECEIVES AN ARRAY AND SENDS EACH ELEMENT AS A MESSAGE TO TELEGRAM
const sendRestaurantOptions = (ctx, bot, restaurants) => {
  restaurants.forEach(restaurant => {
    bot.telegram.sendMessage(ctx.chat.id, `${restaurant} \n`, {
    })
  });
}


const generateRandomMessage = (location) => {
  switch (location) {
    case 'west':
      return westMessages[Math.floor(Math.random() * westMessages.length)]

    case 'east':
       return eastMessages[Math.floor(Math.random() * eastMessages.length)]
    default:
      return 'Let me see ...'
  }
};

export {
  generateRandomMessage, 
  sendRestaurantOptions
};