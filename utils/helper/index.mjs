import initNotifiers from './notify.mjs';
import initErrorMessages from './errors.mjs'; 
import initValidators from './validate.mjs';

const initHelpers = () => {
 return {
   validators: initValidators(),
   errorMsgGenerator: initErrorMessages(),
   notifiers: initNotifiers(),
  }
}

export default initHelpers;