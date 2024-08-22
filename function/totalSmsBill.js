function totalSmsBill(usage, price) {
    const smsCost = price;

    // Split the usage string by commas and trim whitespace
    let usageAnt = usage.split(/\s*,\s*/);
  
    let smsCount = 0;
  
    // Count the number of 'sms' entries in the usage array
    for (const comm of usageAnt) {
      if (comm.trim() === 'sms') {
        smsCount++;
      } 
    }
  
    // Calculate the total SMS bill
    const smsBill = smsCost * smsCount;
  
    // Return an object with the total bill and SMS count
    return {
      totalBill: `R${smsBill.toFixed(2)}`,
      smsCount: smsCount
    };
  }
  
  
  export default totalSmsBill;