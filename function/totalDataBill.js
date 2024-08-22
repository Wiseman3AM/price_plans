function totalDataBill(usage, price) {
    const dataCost = price;
    let usageAnt = usage.split(/\s*,\s*/);
    let dataCount = 0;
  

    for (const comm of usageAnt) {
      if (comm.trim() === 'data') {
        dataCount++;
      } 
    }
  
    const dataBill = dataCost * dataCount;
  
    return {
      totalBill: `R${dataBill.toFixed(2)}`,
      dataCount: dataCount
    };
  }
  
  
  export default totalDataBill;
