const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Liliana:Yerlinson-27@cluster0-bhm1s.mongodb.net/test', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(db => console.log('DB is conneted'))
.catch(err => console.error('err'));