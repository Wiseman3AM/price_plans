import express from 'express';
import * as sqlite from 'sqlite';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import bodyParser from 'body-parser';
import { readFile } from 'fs/promises'; // Destructure readFile

const router = express.Router();

// Open database connection
const dbPromise = sqlite.open({
    filename: './data_plan.db',
    driver: sqlite3.Database
});



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
router.get('/Retrieve/one/price_plan/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const db = await dbPromise;
        const plan = await db.get('SELECT * FROM price_plan WHERE id = ?', [id]);
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
    const { plan_name, sms_price, call_price } = req.body;

    try {
        const db = await dbPromise;
        const result = await db.run(
            'INSERT INTO price_plan  (plan_name, sms_price, call_price) VALUES (?, ?, ?)',
            [plan_name, sms_price, call_price]
        );
        res.status(201).json({ id: result.lastID });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// UPDATE PRICE PLAN ATTEMPT 1
router.put('/Update_plan/:id', async (req, res) => {
    const { id } = req.params;
    const { plan_name, sms_price, call_price } = req.body;
    try {
        const db = await dbPromise;
        const result = await db.run(
            'UPDATE price_plan SET plan_name = ?, sms_price = ?, call_price = ? WHERE id = ?',
            [plan_name, sms_price, call_price, id]
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
router.delete('/Delete_plan/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const db = await dbPromise;
        const result = await db.run('DELETE FROM price_plan WHERE id = ?', [id]);
        if (result.changes > 0) {
            res.json({ message: 'Plan deleted successfully' });
        } else {
            res.status(404).json({ error: 'Plan not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});







export default router;