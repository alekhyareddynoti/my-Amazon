export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
    cart = [{
    productId : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity : 2,
    deliveryOptionId : '1'
},{
    productId : "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity : 1,
   deliveryOptionId : '2'

}];
}

//first we define the function to save the data to the local storage. Then use the function to update the local storage where ever we update the data and then get the data from the local and set to the data itsef. Remember the local storage only takes the strings so we have to use stringify and parse methods of JSON.
export function savetoStorage() {
    localStorage.setItem('cart' , JSON.stringify(cart)); //as the local storage only saves the strings.
}

export function addToCart(productId) {
  let matchingItem;
    cart.forEach((cartItem) => {
      if(productId === cartItem.productId){
        matchingItem=cartItem;
      }
    })
    if(matchingItem){
        matchingItem.quantity += 1;
      }else{
        cart.push({
        productId: productId,
        quantity: 1
      });
      } 
      savetoStorage();  
}

export function updateCartQuantity(){
  let cartQuantity =0;
    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
    return cartQuantity;
}

export function removeFromCart(productId) {
    const newCart =[];

    cart.forEach((cartItem) => {
        if(cartItem.productId !== productId){
            newCart.push(cartItem);
        }
    });
    cart = newCart;

    savetoStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;
    cart.forEach((cartItem) => {
      if(productId === cartItem.productId){
        matchingItem=cartItem;
      }
    })
  matchingItem.deliveryOptionId = deliveryOptionId;
}

export function loadCart(fun){
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load',() =>{
      console.log(xhr.response)
      // products = JSON.parse(xhr.response).map((productDetails) => {
      //   if(productDetails.type === 'clothing'){
      //     return new Clothing(productDetails);
      //   }
      //   return new Producct(productDetails);
      // });
      // fun();
    });

    xhr.open('GET' , 'https://supersimplebackend.dev/cart');
    xhr.send();
  }