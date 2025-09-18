import {cart, removeFromCart, updateCartQuantity , savetoStorage, updateDeliveryOption} from '../data/cart.js';
import { loadProducts, loadProductsFetch} from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import deliveryOptions, {getDeliveryOption} from '../data/deliveryOptions.js';
import { getProduct } from '../data/products.js';
import { loadCart } from '../data/cart.js';
import { addOrder } from '../data/orders.js';
//import '../data/backend-practise.js'
// const today = dayjs();
// const deliveryDate = today.add(7 , 'days');
// console.log(deliveryDate.format('dddd, YYYY MMMM, D hh:mm ss'))

//promise all to run all the required async functions at a time.

async function loadPage(){
  //console.log('page load');
  try{
    //throw 'error1';
    await loadProductsFetch();//makes suure this function is run 
    await new Promise((resolve) => {
    loadCart();
    resolve();
    })
  }
  catch(error){
    console.log('error')
  }
  
  orderSummary();
  paymentSummary();
  //return 'value 1'; //same as resolve('value1')
}

loadPage();
// \*.then((value) => {
//   console.log('next step');
//   console.log(value); //gives the value retuned in promise.
// })*/


// Promise.all([
//   loadProductsFetch(),
//   new Promise((resolve) => {
//   loadProducts(() =>{
//     resolve('value1')
//   });
//   }),
//   new Promise((resolve) => {
//     loadCart();
//     resolve();
//   })
// ]).then((values) => {
//     console.log(values) //['value1' , undefined] as we didn't give any value to the second resolve.
//     orderSummary();
//     paymentSummary();
// })



// resolve('value1')
// .then((value) => {
//   console.log(value) //gives value1 that is passed to resolve.
//   return 


//***WITH CALL BACKS  */

// loadProducts(() =>{
//   loadCart(() =>{
//     orderSummary();
//     paymentSummary();
//   })
// })

  function orderSummary() {

    let cartSummaryHTML = '';

    document.querySelector('.js-cart-quantity-checkout').innerHTML = `${updateCartQuantity()} items`;

    let matchingProduct;
    cart.forEach((cartItem) =>{
        const productId = cartItem.productId;
        matchingProduct= getProduct(productId)

        const deliveryOptionId = cartItem.deliveryOptionId;
        let deliveryOption = getDeliveryOption(deliveryOptionId);

        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D');

        cartSummaryHTML += `<div class="cart-item-container 
        js-cart-container-${matchingProduct.id}">
                <div class="delivery-date">
                  Delivery date: ${dateString}
                </div>

                <div class="cart-item-details-grid">
                  <img class="product-image"
                    src="${matchingProduct.image}">

                  <div class="cart-item-details">
                    <div class="product-name">
                      ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                      ${matchingProduct.getPrice()}
                    </div>
                    <div class="product-quantity">
                      <span>
                        Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                      </span>
                      <span class="update-quantity-link js-update-quantity-link link-primary" data-product-id = ${matchingProduct.id}>
                        Update
                      </span>
                      <input class="quantity-input js-quantity-input-${matchingProduct.id}">
                      <span class="save-quantity-link js-save-quantity-link link-primary" data-product-id = ${matchingProduct.id}>Save</span>
                      <span class="delete-quantity-link link-primary js-delete-link" data-product-id = ${matchingProduct.id}>
                        Delete
                      </span>
                    </div>
                  </div>

                  <div class="delivery-options">
                    <div class="delivery-options-title">
                      Choose a delivery option:
                    </div>
                    ${deliverOptionHTML(matchingProduct,cartItem)}
                  </div>
                </div>
              </div>`;
    });

    function deliverOptionHTML(matchingProduct,cartItem){
      let html = '';

      deliveryOptions.forEach((deliveryOption) => {
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D');

        const priceString = deliveryOption.priceCents ===0 
        ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)}`

        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
        html += `<div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
                      <input type="radio" ${isChecked?'checked' : '' }
                        class="delivery-option-input"
                        name="delivery-option-${matchingProduct.id}">
                      <div>
                        <div class="delivery-option-date">
                          ${dateString}
                        </div>
                        <div class="delivery-option-price">
                          ${priceString} Shipping
                        </div>
                      </div>
                    </div>`
      })
      return html;
    }

    document.querySelector('.js-cart-summary').innerHTML = cartSummaryHTML;

    document.querySelectorAll('.js-delete-link').forEach((link) =>{
        link.addEventListener('click' , () =>{
            const productId = link.dataset.productId;
            removeFromCart(productId);
        
            const container = document.querySelector(`.js-cart-container-${productId}`);
            container.remove();
            paymentSummary();
        });
    });

    document.querySelectorAll('.js-save-quantity-link').forEach((link) =>{
      link.addEventListener('click' , () =>{
        const productId = link.dataset.productId;
        const cartItem = document.querySelector(`.js-cart-container-${productId}`);
        cartItem.classList.remove('is-editing');
        const newQuantity = document.querySelector(`.js-quantity-input-${productId}`);
        cart.forEach((product) =>{
            if(product.productId === productId){
              product.quantity = Number(newQuantity.value);
              document.querySelector(`.js-quantity-label-${product.productId}`).innerHTML=product.quantity;
            }
          });
        updateCartQuantity();
        document.querySelector('.js-cart-quantity-checkout').innerHTML = `${updateCartQuantity()} items`;
        savetoStorage();
        paymentSummary();
      });
    });

    document.querySelectorAll('.js-update-quantity-link').forEach((link) =>{
      link.addEventListener('click' , () =>{
        const productId = link.dataset.productId;
        const cartItem = document.querySelector(`.js-cart-container-${productId}`);
        cartItem.classList.add('is-editing');
      });
    });

    document.querySelectorAll('.js-delivery-option').forEach((element) =>{
      element.addEventListener('click', () =>{
        const {productId, deliveryOptionId} = element.dataset;
        updateDeliveryOption(productId,deliveryOptionId);
        orderSummary();
      } )
    });
  }


  function paymentSummary() {
    let matchingProduct;
    let productPriceCents = 0;
    let shippingPriceCents = 0;
    cart.forEach((cartItem) =>{
      const productId = cartItem.productId;
      matchingProduct=getProduct(productId);
      productPriceCents += matchingProduct.priceCents * cartItem.quantity;

      const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
      shippingPriceCents += deliveryOption.priceCents;
    });
    const totalBeforeTax = productPriceCents + shippingPriceCents;
    const taxCents = totalBeforeTax *0.1;
    const totalCents = totalBeforeTax + taxCents;

    const paymentSummaryHTML = `
            <div class="payment-summary-title">
              Order Summary
            </div>

            <div class="payment-summary-row">
              <div>Items (3):</div>
              <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
            </div>

            <div class="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
            </div>

            <div class="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
            </div>

            <div class="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
            </div>

            <div class="payment-summary-row total-row">
              <div>Order total:</div>
              <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
            </div>

            <button class="place-order-button button-primary js-place-order">
              Place your order
            </button>`;

            document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

            document.querySelector('.js-place-order').addEventListener('click' ,
              async () => {
               
              try{
                const response = await fetch('https://supersimplebackend.dev/orders',{
                method:'POST',
                headers:{
                  'Content-Type':'application/json'
                },
                body:JSON.stringify({
                  cart:cart
                })
              })
              const order = await response.json();
              addOrder(order);
              }
              catch(error){}
              console.log('Error occured please try again')

              window.location.href='orders.html';

            })
  }


