let mongoose = require('mongoose');
const {
    model,
    Schema
} = mongoose;
let validator = require('validator');
let moment = require('moment');

process.env.TZ = "Asia/Jakarta";

let tourSchema = Schema({
    name: {
        type: String,
        required: {
            value: true,
            message: "name can't by null or empty"
        }
    },
    address: {
        type: String,
        required: {
            value: true,
            message: "address can't by null or empty"
        }
    },
    province: {
        type: String,
        required: {
            value: true,
            message: "province can't by null or empty"
        }
    },
    regency: {
        type: String,
        required: {
            value: true,
            message: "regency can't by null or empty"
        }
    },
    price: {
        type: Number,
        required: {
            value: true,
            message: "price can't by null or empty"
        }
    },
    opening_hours: {
        type: String,
        required: {
            value: true,
            message: "opening hours can't by null or empty"
        }
    },
    image: {
        type: String,
        required: false,
        default: null
    },
    created_at: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'tour'
});

module.exports = model('Tour', tourSchema);