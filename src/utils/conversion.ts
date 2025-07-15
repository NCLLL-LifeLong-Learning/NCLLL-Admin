export const numberToText = (num: number): string => {
  if (num === 0) return 'zero';

  const belowTwenty = [
    '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
    'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
  ];
  const tens = [
    '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
  ];
  const thousands = [
    '', 'Thousand', 'Million', 'Billion', 'Trillion'
  ];

  function helper(n: number): string {
    if (n === 0) return '';
    if (n < 20) return belowTwenty[n] + ' ';
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? '-' + belowTwenty[n % 10] : '') + ' ';
    if (n < 1000) return belowTwenty[Math.floor(n / 100)] + ' hundred' + (n % 100 ? ' ' + helper(n % 100) : ' ');
    return '';
  }

  let word = '';
  let i = 0;
  let n = num;
  while (n > 0) {
    if (n % 1000 !== 0) {
      word = helper(n % 1000) + (thousands[i] ? thousands[i] + ' ' : '') + word;
    }
    n = Math.floor(n / 1000);
    i++;
  }
  return word.trim().replace(/\s+/g, ' ');
}