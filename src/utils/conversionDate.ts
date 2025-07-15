export const conversionUTCDate = (oDate: Date | string | null) => {
    if (oDate == null) return null;
    const date = typeof oDate === 'string' ? new Date(oDate) : oDate;
    return date.toLocaleString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).split('/').reverse().join('/');
}