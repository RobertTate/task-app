function errorObject(error) {
  return {
    [error.name]: {
      message: error.message,
      stacktrace: error.stack
    }
  }
}

module.exports = { errorObject };
