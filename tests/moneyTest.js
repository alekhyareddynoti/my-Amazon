import { formatCurrency } from "../scripts/utils/money.js";

console.log('test suit : Automated')
console.log('converts cents to dollars')
if(formatCurrency(2095) === '20.95'){
    console.log('pass');
}else{
    console.log('failed');
}
console.log('formats 0')

if(formatCurrency(0) === '0.00'){
    console.log('pass');
}else{
    console.log('failed');
}
console.log('rounded to nearest cent')

if(formatCurrency(2000.5) === '20.01'){
    console.log('pass');
}else{
    console.log('failed');
}