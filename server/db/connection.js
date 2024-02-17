const mongoose = require('mongoose');

const url=process.env.REACT_APP_DB_URL

mongoose.connect(url, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() => console.log('Connected to DB')).catch((e)=> console.log('Error', e))