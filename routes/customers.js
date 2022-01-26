const express = require('express');
const router = express.Router();
const {Customer, validateCustomer} = require('../models/customer');

router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.post('/', async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);
   
    let customer = new Customer({
        name: req.body.name,
        birthDate: req.body.birthDate,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        isActive: req.body.isActive
    });
    
    try {
        customer = await customer.save();
    } catch (err) {
        let messages = '';
        for (field in err.errors) {
            messages += ' ' + err.errors[field].message;
        }
        return res.status(400).send('Could not create customer: ' + messages);
    }
    
    res.send(customer);
});

router.put('/:id', async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        birthDate: req.body.birthDate,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        isActive: req.body.isActive
    },
    { new: true }
    );

    if (!customer) return res.status(404).send(`The customer ID ${req.params.id} was not found.`);

    res.send(customer);
})

router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);  
    if (!customer) return res.status(404).send(`The customer ID ${req.params.id} was not found.`);
  
    res.send(customer);
});

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);  
    if (!customer) return res.status(404).send(`The customer ID ${req.params.id} was not found.`);
  
    res.send(customer);
});

module.exports = router;