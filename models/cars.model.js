const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const Car = new Schema({
    reg: {
        type: String,
        unique: true,
        sparse:true
    },
     model: {
        type: String
    },
     make: {
        type: String
    },
    year: {
        type: Number
    },
     color: {
        type: String
    },
    milage: {
        type: Number
    },
    price: {
        type: Number
    },
    status: {
        type: String
    },
    carImage: {
        type: String
    },
    start_Date: {
        type: Date
    },
    end_Date: {
        type: Date
    },
    imageUrl: {
        type: String
    }

});

Car.plugin(mongoosePaginate);

// User.index({'$**': 'text'});

module.exports = mongoose.model("Car", Car);