import express from 'express';
import * as sqlite from 'sqlite';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import bodyParser from 'body-parser';
import { readFile } from 'fs/promises'; // Destructure readFile
import totalBillRoutes from './router/totalPhoneBillRouter.js';

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

app.use('/totalBill/price_plan/', totalBillRoutes);

const PORT = process.env.PORT || 5565;
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));

