const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/DonalApp-db-app', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(db => console.log('DB is conneted'))
.catch(err => console.error('err'));