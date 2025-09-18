export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order){
    orders.unshift(order);
}

function savetoStorage(){
    localStorage.setItem('orders',JSON.stringify(orders));
}