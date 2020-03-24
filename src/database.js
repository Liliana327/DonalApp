const mongoose = require('mongoose');
var options = {
  server: {
    socketOptions: {
      keepAlive: 300000,
      connectTimeoutMS: 30000,
    }
  },
  replset: {
    socketOptions: {
      keepAlive: 300000,
      connectTimeoutMS: 30000
    }
  }
}

mongoose.connect('mongodb+srv://liliana:Test1234@cluster0-3kiks.mongodb.net/test?retryWrites=true&w=majority', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})
.then(db => console.log('DB is conneted'))
.catch(err => console.error('err'));