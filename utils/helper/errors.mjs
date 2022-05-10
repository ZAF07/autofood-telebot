import { errorMessages } from '../enums/index.mjs';

const errorNoRestaurantsFound = (contextChatID, bot) => {
  bot.telegram.sendMessage(contextChatID, errorMessages['_noRestaurantsFound'])
  return
};

const errorInvalidDistrict = (contextChatID, bot) => {
  bot.telegram.sendMessage(contextChatID, errorMessages['_invalidDistrict'])
  return
}

const errorInternal = (contextChatID, bot) => {
  bot.telegram.sendMessage(contextChatID, errorMessages['_errorInternal'])
  return
}


const initErrorMessages = () => {
  return {
    errorNoRestaurantsFound,
    errorInvalidDistrict,
    errorInternal,
  }
}

export default initErrorMessages;