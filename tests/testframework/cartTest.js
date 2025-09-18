import { addToCart, cart } from "../../data/cart.js";

describe('test suit : add to cart', () => {
    it('add an existing product to the cart', () => {

    });
    it('add a new product to the cart', () => {
        //the cart cannot be always 0 bcz we are getting that from local storage get item so we have to mochk that fun such that this gives length 0. localStorage.getItem retuns the cart array so in mock we return the empty array.

        spyon(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        })
        console.log(localStorage.getItem('cart')); //this now prints []
        addToCart('2bndctyrpdsgh4edcsw3456rdsd');
        expect(cart.length).toEqual(1) //assume the cart initial length 0.
    });
})