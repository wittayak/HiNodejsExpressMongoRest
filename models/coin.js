const mongoose = require('mongoose');
const Joi = require('joi');

const Coin = mongoose.model('coin', new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: false
    }
}));

function validateCoin(coin) {
    const schema = Joi.object({
        code: Joi.string().required(),
        name: Joi.string().required(),
        price: Joi.number()
    });
    return schema.validate(coin);
}

module.exports.Coin = Coin;
module.exports.validateCoin = validateCoin;
