
/* --STEPS  TO RECREATE TABLE

-- Rename the existing table
ALTER TABLE price_plan RENAME TO old_price_plan; */

-- Create the new table with the updated structure
CREATE TABLE price_plan (
    id integer primary key AUTOINCREMENT,
    plan_name text,
    sms_price real,
    call_price real,
    data_price real
);

/* -- Copy data from the old table to the new table
INSERT INTO price_plan (id, plan_name, sms_price, call_price)
SELECT id, plan_name, sms_price, call_price FROM old_price_plan; 

-- Drop the old table
DROP TABLE old_price_plan; 

*/