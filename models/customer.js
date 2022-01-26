const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 60,
    },
    birthDate: {
        type: Date,
        required: true,        
        validate: {
            validator: function(v) {
                return v.getTime() <= Date.now();
            },
            message: 'A birthDate should not greater than or equal today.'
        }
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {        
                const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;        
                return regexEmail.test(v);
            },
            message: 'Email is not valid.'
        }
        
    },
    address: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    isActive: {
        type: Boolean,
        default: false
    }
}));

function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(60).required(),
        birthDate: Joi.date().required(),
        phone: Joi.string().required(),
        email: Joi.string().email().required(),
        address: Joi.string().min(5).max(255).required(),
        isActive: Joi.boolean()
    });
    
    return schema.validate(customer);
}

module.exports.Customer = Customer;
module.exports.validateCustomer = validateCustomer;