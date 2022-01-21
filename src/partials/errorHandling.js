/**
 * @param {Error} error The original Error 
 * @returns {{[error.name]: {message: string, stack: string}}} An Object Literal that better formats the output of an error response  
*/
function formatError(error) {
  return {
    [error.name]: {
      message: error.message,
      stack: error.stack
    }
  }
}

/**
 * 
 * @param {Error} error The original Error 
 * @returns {Number} The Status Code based on the type of Error
 */
function getStatusCode(error) {
  if (
    error.name === "ValidationError" || 
    error.name === "StrictModeError" ||
    error.name === "CastError"
  ) {
    return 400;
  };

  return 500;
};

module.exports = { formatError, getStatusCode };
