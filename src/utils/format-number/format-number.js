import numeral from 'numeral';

const formatNumber = (number) => numeral(number).format('0,0');

export default formatNumber;
