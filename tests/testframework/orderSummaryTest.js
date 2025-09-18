import { orderSummary } from "../../scripts/checkout.js";

describe('test suit : render order summary', () => {
    //to diaplay the cart we are generating the HTML and then changing the inner HTML of .js-order-summary class tag here to test we have to create a div tag with a classname that loads the same class html 
    it('display the cart', () => {
        document.querySelector('.js-test-container').innerHTML = `
            <div class="js-order-summary></div>
        `;
    });
});