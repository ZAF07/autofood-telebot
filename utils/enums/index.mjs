import errorMessages from "./errors.mjs";
import { START_MSG, HELP_MSG, END_MSG } from "./messages.mjs";

const westMessages = [
  `Awesome! let\'s see what we have in the west!`,
  'Hmm... Let me take a look 🕵️‍♂️',
  `Sure! Give me one sec! I'll see what we have in the west 😛`,
  `Ok! Lets see what the west has in store for us! 😬`
];

const eastMessages = [
  `Awesome! let\'s see what we have in the east!`,
  'Hmm... Let me take a look 🕵️‍♂️',
  `Sure! Give me one sec! I'll see what we have in the east 😛`,
  `Ok! Lets see what the west has in store for us! 😬`
];


const districts = ['south', 'South', 'SOUTH', 'north', 'North', 'NORTH', 'west', 'West', 'WEST', 'east', 'East', 'EAST', 'central', 'Central', 'CENTRAL'];

export {
   westMessages,
   eastMessages,
   districts, 
   errorMessages,
   START_MSG,
   HELP_MSG,
   END_MSG
  };