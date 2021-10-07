const mongoose = require('mongoose');


const DB=`mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.7m0cm.mongodb.net/myVisitorApp?retryWrites=true&w=majority`;

mongoose.connect(DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Connection Sucessful");
}).catch((err)=>{
    console.log(err.message);
})

const alertSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        trim: true,
        required: true,
    },
    LastName: {
        type: String,
        trim: true,
        required: true,
    },
    Gender: {
        type: String,
        trim: true,
        required: true,
    },
    Email: {
        type: String,
        trim: true,
        required: true,
    },
    PhoneNumber: Number,
    Status: String,
    Date: {
        type: Date,
        default: Date.now
    },

})


const Alert = new mongoose.model('Alert', alertSchema);


module.exports = Alert;