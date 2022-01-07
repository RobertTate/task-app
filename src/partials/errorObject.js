/**
 * @param {Error} error The original Error 
 * @returns {Object} An Object Literal that better formats the output of an error response  
*/
function errorObject(error) {
  return {
    [error.name]: {
      message: error.message,
      stacktrace: error.stack
    }
  }
}

module.exports = { errorObject };
