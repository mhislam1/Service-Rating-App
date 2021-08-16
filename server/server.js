require('dotenv').config();
const { request, response } = require('express');
const express = require('express');
const db = require('./db')
// const morgan = require('morgan'); // Third party middleware
const app = express();

// Middleware that built into express.
app.use(express.json());

// Get all services
app.get('/api/services', async (request, response) => {
    try {
    const getAllServicesRes = await db.query('SELECT * FROM services');
    console.log('These are my getAllServicesRes:',getAllServicesRes);
    response.status(200).json({
        status: 'success',
        numberOfResults: getAllServicesRes.rows.length,
        data: {
            services: getAllServicesRes.rows,
        },
    });
    } catch (error) {
        console.log('ERROR THIS ENCOUNTERED WHEN MAKING REQUEST TO GET ALL SERVICES:', error);
    }
});

// RESTful API definition
// Get specific service.
app.get('/api/services/:serviceId', async (request, response) => {
    try {
        // Using a parametrized query to prevent vulnerability from SQL injection attacks.
        const getSpecificServiceRes = await db.query('SELECT * FROM services WHERE id = $1', [request.params.serviceId]);
        response.status(200).json({
            status: 'success',
            data: {
                service: getSpecificServiceRes.rows[0],
            }, 
        });        
    } catch (error) {
        console.log('ENCOUNTERED THIS ERROR WHEN MAKING REQUEST TO GET SPECIFIC SERVICE:', error);
    }

}); 

// Creates a new entry
app.post('/api/services', async (request,response) =>{
    try {
        
        const createServiceRes = await db.query('INSERT INTO services (name, location, price_range) VALUES ($1, $2, $3) returning *', [request.body.name, request.body.location, request.body.price_range])
        console.log(createServiceRes);
        response.status(201).json({
            status: 'success',
            data: {
                service: 'bank',
            }, 
        });
    } catch (error) {
        console.log('ENCOUNTERED THIS ERROR WHEN MAKING REQUEST TO CREATE SERVICE:', error);
    }
});

// Update a service
app.put('/api/services/:serviceId', async(request, response) => {
    try {
        const updateServiceRes = await db.query('UPDATE services SET name = $1, location = $2, price_range = $3 where id = $4 returning *', [request.body.name, request.body.location, request.body.price_range, request.params.serviceId]);
        response.status(200).json({
            status: 'success',
            data: {
                service: updateServiceRes.rows[0],
            }, 
        });
    } catch (error) {
        console.log('ENCOUNTERED THIS ERROR WHEN MAKING REQUEST TO UPDATE SERVICE:', error);
    }
});

// Delete a service
app.delete('/api/services/:serviceId', async (request, response) => {        
    try {
        const deleteServiceRes = db.query('DELETE FROM services where id = $1', [request.params.serviceId]);
        response.status(204).json({
            status: 'success', 
        });
    } catch (error) {
        console.log('ENCOUNTERED THIS ERROR WHEN MAKING REQUEST TO DELETE SERVICE:', error);
    }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is up and listening on port ${port}`);
});

