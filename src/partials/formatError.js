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

module.exports = { formatError };
