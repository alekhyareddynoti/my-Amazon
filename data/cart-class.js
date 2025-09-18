class Cart {
    cartItems = undefined;
    #localStorageKey = undefined; //private prop that can't be accessed outside the class to modify. line 88
    //each obj we create the constuctor will be called automatically
    constructor(localStorageKey){
        this.#localStorageKey = localStorageKey;
        this.#loadfromStorage();
    }

    #loadfromStorage(){
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));

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
    };
    savetoStorage() {
    localStorage.setItem(this.#localStorageKey , JSON.stringify(this.cartItems)); //as the local storage only saves the strings.
    };
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
    };
    updateCartQuantity(){
        let cartQuantity =0;
        this.cartItems.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
        });
        return cartQuantity;
    };
    removeFromCart(productId) {
    const newCart =[];

    this.cartItems.forEach((cartItem) => {
        if(cartItem.productId !== productId){
            newCart.push(cartItem);
        }
    });
    this.cartItems = newCart;

    this.savetoStorage();
    };

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


const cart = new Cart(); 
//every obj is an instance of the class we can check if this particular instance is created from the claass
console.log(cart instanceof Cart)//returns true bcz the cart obj is created with the class Cart.
const businessCart = new Cart();
// cart.localStorageKey = 'cart-oop';
// businessCart.localStorageKey ='business-cart'
// cart.loadfromStorage();
// businessCart.loadfromStorage(); moved to constructor as we are running the same code for every object.


//cart.#localStorageKey = 'test'; => {Property '#localStorageKey' is not accessible outside class 'Cart' because it has a private identifier.}