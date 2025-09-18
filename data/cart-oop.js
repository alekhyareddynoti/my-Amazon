// if we want to craete multiple carts copy pasting makes the code bulkierso we can create a funtion
//function names in OOPs will follow pascal casing everyword starts with Uppercase.
function Cart(localStorageKey){
    const cart ={
    cartItems:undefined,
    loadfromStorage(){
    this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));

        if(!this.cartItems){
            this.cartItems = [{
            productId : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity : 2,
            deliveryOptionId : '1'
        },{
            productId : "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity : 1,
        deliveryOptionId : '2'

        }];
        }
    },
    savetoStorage() {
    localStorage.setItem(localStorageKey , JSON.stringify(this.cartItems)); //as the local storage only saves the strings.
    },
    addToCart(productId) {
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
    if(productId === cartItem.productId){
        matchingItem=cartItem;
    }
    })
    if(matchingItem){
        matchingItem.quantity += 1;
    }else{
        this.cartItems.push({
        productId: productId,
        quantity: 1
    });
    } 
    this.savetoStorage();  
    },
    updateCartQuantity(){
        let cartQuantity =0;
        this.cartItems.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
        });
        return cartQuantity;
    },
    removeFromCart(productId) {
    const newCart =[];

    this.cartItems.forEach((cartItem) => {
        if(cartItem.productId !== productId){
            newCart.push(cartItem);
        }
    });
    this.cartItems = newCart;

    this.savetoStorage();
    },

    updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
        this.cartItems.forEach((cartItem) => {
        if(productId === cartItem.productId){
            matchingItem=cartItem;
        }
        })
    matchingItem.deliveryOptionId = deliveryOptionId;
        }
    };
}

const cart = Cart('cart-oop');
const businessCart = Cart('business-cart')
cart.loadfromStorage();
businessCart.loadfromStorage();
cart.addToCart('e2356-u804-ju6t-4drge');



//first we define the function to save the data to the local storage. Then use the function to update the local storage where ever we update the data and then get the data from the local and set to the data itsef. Remember the local storage only takes the strings so we have to use stringify and parse methods of JSON.