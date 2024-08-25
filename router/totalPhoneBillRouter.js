import express from 'express';
import * as sqlite from 'sqlite';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import bodyParser from 'body-parser';
import { readFile } from 'fs/promises'; // Destructure readFile
import totalPhoneBill from '../function/totalPhoneBill.js';
import enoughAirtime from '../function/enoughAirtime.js';

const router = express.Router();



// Open database connection
const dbPromise = sqlite.open({
    filename: './data_plan.db',
    driver: sqlite3.Database
});


/*   USE IF YOU WANT TO CLEAR ALL DATA FROM THE DATABASE 


async function runSQLFile(filePath) {
    const db = await dbPromise;
    const sql = await readFile(filePath, 'utf8');
    await db.exec(sql);
}



async function initializeDatabase() {
    try {
        console.log('Running schema update...');
        await runSQLFile('migrations/001-create-price_plan.sql'); // Path to your schema update file
        console.log('Schema updated.');

        console.log('Inserting data...');
        await runSQLFile('./migrations/002-create-priceplan-data.sql'); // Path to your insert data file
        console.log('Data inserted.');
    } catch (err) {
        console.error('Error during database initialization:', err);
    }
}

// Call the initialization function when starting the application
initializeDatabase().catch(err => {
    console.error('Failed to initialize database:', err);
});

 /* ENDS HERE */


//GET ALL PRICE PLANS ATTEMPT 1

router.get('/Retrieve/all/price_plans', async (req, res) => {
    try {
        const db = await dbPromise;
        const plans = await db.all('SELECT * FROM price_plan');
        res.status(200).json(plans);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


//GET A SINGLE PRICE PLAN ATTEMPT 1
router.get('/Retrieve/one/price_plan/:plan_name', async (req, res) => {
    const { plan_name } = req.params;
    try {
        const db = await dbPromise;
        const plan = await db.get('SELECT * FROM price_plan WHERE plan_name = ?', [plan_name]);
        if (plan) {
            res.json(plan);
        } else {
            res.status(404).json({ error: 'Plan not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


//NEW PRICE PLAN ATTEMPT 1
router.post('/Add_price_plan', async (req, res) => {
    const { plan_name, sms_price, call_price, data_price } = req.body;

    try {
        const db = await dbPromise;

        // Check if the plan_name already exists
        const existingPlan = await db.get('SELECT * FROM price_plan WHERE plan_name = ?', [plan_name]);

        if (existingPlan) {
            // If the plan_name exists, return an error response
            return res.status(400).json({ error: 'Plan name already exists' });
        } else {

        // If the plan_name does not exist, proceed with the insertion
        const result = await db.run(
            'INSERT INTO price_plan (plan_name, sms_price, call_price, data_price) VALUES (?, ?, ?, ?)',
            [plan_name, sms_price, call_price, data_price]
        );

        res.status(201).json({ id: result.lastID }); 
    }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



// UPDATE PRICE PLAN ATTEMPT 1
router.put('/Update_plan/:plan_name', async (req, res) => {
    const { plan_name } = req.params;
    const { new_plan_name, sms_price, call_price, data_price } = req.body;
    try {
        const db = await dbPromise;
        const result = await db.run(
            'UPDATE price_plan SET plan_name = ?, sms_price = ?, call_price = ?, data_price = ? WHERE plan_name = ?',
            [new_plan_name, sms_price, call_price, data_price, plan_name]
        );
        if (result.changes > 0) {
            res.json({ message: 'Plan updated successfully' });
        } else {
            res.status(404).json({ error: 'Plan not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


//DELETE PRICE PLAN ATTEMPT 1
router.delete('/Delete_plan/:plan_name', async (req, res) => {
    const { plan_name } = req.params;
    try {
        const db = await dbPromise;
        const result = await db.run('DELETE FROM price_plan WHERE plan_name = ?', [plan_name]);
        if (result.changes > 0) {
            res.json({ message: 'Plan deleted successfully' });
        } else {
            res.status(404).json({ error: 'Plan not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});





router.post('/Calculate_Total_price/:plan_name', async (req, res) => {
    const { plan_name } = req.params;

    try {
        const db = await dbPromise;

        const plan = await db.get('SELECT * FROM price_plan WHERE plan_name = ?', [plan_name]);

        if (plan) {
            const smsPrice = plan.sms_price;
            const callPrice = plan.call_price;
            const dataPrice = plan.data_price;
            const usage = req.body.usage;  // Ensure this is the correct key from your request body


            if (isNaN(smsPrice) || isNaN(callPrice) || isNaN(dataPrice)) {
                return res.status(400).json({ error: 'Invalid price values' });
            }

            const totalBill = totalPhoneBill(usage, smsPrice, callPrice, dataPrice);

            return res.status(200).json({ totalBill });
        } else {
            return res.status(404).json({ error: 'Plan not found' });
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});


router.post('/Calculate_enough_price/:plan_name', async (req, res) => {
    const { plan_name } = req.params;

    try {
        const db = await dbPromise;

        const plan = await db.get('SELECT * FROM price_plan WHERE plan_name = ?', [plan_name]);

        if (plan) {
            const smsPrice = plan.sms_price;
            const callPrice = plan.call_price;
            const dataPrice = plan.data_price;
            const usage = req.body.usage; 
            const airtime = req.body.airtime


            if (isNaN(smsPrice) || isNaN(callPrice) || isNaN(dataPrice)) {
                return res.status(400).json({ error: 'Invalid price values' });
            }

            const totalBill = enoughAirtime(usage, airtime, smsPrice, callPrice, dataPrice);

            return res.status(200).json({ totalBill });
        } else {
            return res.status(404).json({ error: 'Plan not found' });
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});






export default router;