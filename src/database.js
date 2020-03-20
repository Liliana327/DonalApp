const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://ospina:yerlinson31@cluster0-bhm1s.mongodb.net/test?retryWrites=true&w=majority', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(db => console.log('DB is conneted'))
.catch(err => console.error('err'));