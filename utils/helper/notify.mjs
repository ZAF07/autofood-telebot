import { westMessages, eastMessages, START_MSG, HELP_MSG, END_MSG } from '../enums/index.mjs';

// Receives an array of restaurants and sends each restaurant in the message to telegram
const sendRestaurantOptions = (ctx, bot, restaurants) => {
  restaurants.forEach(restaurant => {
    bot.telegram.sendMessage(ctx.chat.id, `${restaurant} \n`, {
    })
  });
}

// Generate random messages for bot reply to district command
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

// Sends start message
const sendStartMessage = (contextChatID, bot) => {
      bot.telegram.sendMessage(contextChatID, START_MSG);
}

const sendHelpMessage = (contextChatID, bot) => {
  bot.telegram.sendMessage(contextChatID, HELP_MSG)
}

const sendEndMessage = (contextChatID, bot) => {
  const message = END_MSG[Math.floor(Math.random() * END_MSG.length)];
  bot.telegram.sendMessage(contextChatID, message);
} 

const initNotifiers = () => {
  return {
    generateRandomMessage,
    sendRestaurantOptions,
    sendStartMessage,
    sendHelpMessage,
    sendEndMessage
  }
}

export default initNotifiers;