// Function to determine if you have enough airtime
function enoughAirtime(usage, airtime, sms, call, data) {
    // Define the costs
    const callCost = call; // Cost per call
    const smsCost = sms;  // Cost per SMS
    const dataCost = data;   // Cost per data
  
    // Split the usage into an array
    const usageArray = usage.split(','); // No spaces between commas
  
    // Initialize counters
    let callCount = 0;
    let smsCount = 0;
    let dataCount = 0;
  
    // Loop through usage to count types
    for (const comm of usageArray) {
      const trimmedComm = comm.trim(); // Trim spaces
      switch (trimmedComm) {
        case 'call':
          callCount++;
          break;
  
        case 'sms':
          smsCount++;
          break;
  
        case 'data':
          dataCount++;
          break;
  
        default:
          // Do nothing for unrecognized types
          break;
      }
    }
  
    // Calculate the total bill
    const totalBill = (callCount * callCost) + (smsCount * smsCost) + (dataCount * dataCost);
    const remainingAirtime = airtime - totalBill;
    
    // Determine if the airtime is enough
    if (remainingAirtime >= 0) {
      return  `R${remainingAirtime.toFixed(2)}`;
    } else {
      return 'Not enough airtime!';
    }
  }


  export default enoughAirtime;