function normalizeRwandanNumber(raw) {
  if (!raw) return null;
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 10 && digits.startsWith('07')) return digits;
  const last10 = digits.slice(-10);
  return last10 && last10.length === 10 && last10.startsWith('07') ? last10 : null;
}

const samples = [
  '0788445587',
  '+250788445587',
  '250788445587',
  '+250 78 844 5587',
  '0788abc5587',
  '07712345678',
  '+250771234567',
  '+254778123456' // Kenya example -> should not normalize to 07 (last10 may start with 77 then invalid)
];

samples.forEach(s => console.log(s.padEnd(24), '->', normalizeRwandanNumber(s)));
