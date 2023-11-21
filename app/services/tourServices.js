let axios = require('axios');
let config = ('../config/config');
let Tour = require('../models/Tour');

async function index(req, res, next) {
    
}

async function store(req, res, next) {
    try {
        let payload = req.body;
        await Tour.insertMany({
            name: payload.name,
            address: payload.address,
            province: payload.province,
            regency: payload.regency,
            price: payload.price,
            opening_hours: payload.opening_hours,
        });

        return res.json({
            success: "true",
            message: "success adding new tour",
        });
    } catch (error) {
        return res.json({
            success: "false",
            message: "fail, get data",
            log: error.message,
        });
    }
}

module.exports = {
    index,
    store
}