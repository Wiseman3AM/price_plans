function totalPhoneBill(usage, sms, call, data) {
  const smsCost = sms;
  const callCost =  call;
  const dataCost = data;

  let usageAnt = usage.split(/\s*,\s*/); // This will split by comma and ignore spaces


  let callCount = 0;
  let smsCount = 0;
  let dataCount = 0;

  for (const comm of usageAnt) {
    if (comm.trim() === 'call') {
      callCount++;
    } else if (comm.trim() === 'sms') {
      smsCount++;
    } else if (comm.trim() === 'data') {
      dataCount++;
    }
  }
  const totalBill = (callCount * callCost) + (smsCost * smsCount) + + (dataCost * dataCount);
  return `R${totalBill.toFixed(2)}`
}

export default totalPhoneBill;