const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.log('Error Connecting to DB:\n\n', error);
});
