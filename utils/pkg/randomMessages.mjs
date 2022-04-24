import { westMessages, eastMessages } from '../enums/index.mjs';

const generateRandomMessage = (location) => {
  switch (location) {
    case 'west':
      return westMessages[Math.floor(Math.random() * westMessages.length)]

    case 'east':
       return eastMessages[Math.floor(Math.random() * eastMessages.length)]
    default:
      return 'Let me see ...'
  }
  // arr[Math.floor(Math.random() * arr.length)];
};

export default generateRandomMessage;