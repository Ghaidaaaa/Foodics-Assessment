    class Amazon {
getAmazonURL() {
  cy.visit('https://www.amazon.eg/-/en')

}
getAmazonMenu() {
  cy.get('.hm-icon').click();
            
}
getSeeAllMenu() {
  cy.get('.hmenu-compressed-btn > div').click();
}
getVideoGamesMenu() {
  cy.get('.hmenu-visible > .hmenu-compress-section > :nth-child(11) > .hmenu-item > .nav-sprite').click( { multiple: true });

}
getAllVideoGamesMenu() {
  cy.get(".hmenu-visible > :nth-child(3) > .hmenu-item").eq(0).click({force: true})  
}
 getFreeShippingBtn(){
 cy.get(':nth-child(2) > .a-unordered-list > .a-spacing-micro > .a-list-item > .a-link-normal > .a-checkbox > label > .a-icon').click();

 }
 getNewCondition(){
 cy.get('#p_n_condition-type\\/28071525031 > .a-list-item > .a-link-normal > .a-size-base').click();

 }
getCart(){
  cy.get(".nav-cart-icon").click({force:true})
}



getPriceBelow15k() {
cy.get('[data-cy="asin-faceout-container"]').each(($product) => {
        // Extract price for each product
  cy.wrap($product).get('.a-price .a-offscreen').invoke('text').then((priceText) => {
            // Clean the price and convert to a number
  const price = parseFloat(priceText.replace('EGP', '').replace(',', '').trim());
  const addToCartButton = $product.find('button.a-button-text').filter((index, element) => {
    return Cypress.$(element).text().includes('Add to cart');
      });

            // If price is less than 15000 and the button exists, click "Add to Cart"
    if (price < 15000 && addToCartButton.length > 0) {
                cy.wrap(addToCartButton).click({ multiple: true });
      }
            
      });
  });
}

getCartValue(){

}
getProductsPrices(){
    cy.get('.sc-badge-price-to-pay' )
   .each(($product) => {
     cy.wrap($product)
    .invoke("text")
              .then((text) =>
                parseFloat(
                  text
                    .replace(/,/g, "")
                    .replace("EGP", "")
                    .replace(" ", "")
                    .trim()))
                    .then((productprices) => {
                        cy.log(typeof productprices)
                        cy.log(productprices)
                    })

})


    }

getCartValue() {
    let totalProductPrice = 0;  // Initialize variable to accumulate total price
  
    cy.get('.sc-badge-price-to-pay')  // Get all product price elements
      .each(($product) => {  // Iterate over each product element
        cy.wrap($product)  // Wrap the element to be able to use Cypress commands
          .invoke("text")  // Get the text content of the element
          .then((text) => {
            // Clean and parse the price
            const productPrice = parseFloat(
              text
                .replace(/,/g, "")  // Remove commas
                .replace("EGP", "")  // Remove "EGP"
                .replace(" ", "")  // Remove spaces
                .trim()
            );
            // Add the parsed price to the total
            totalProductPrice += productPrice;
          });
      })
      .then(() => {  // Once the iteration is complete
        cy.log(`Total Products Price Is: ${totalProductPrice}`);  // Log total products price
        cy.get("#sc-subtotal-amount-buybox")  // Get cart subtotal value
          .invoke("text")  // Get the text content of the cart subtotal
          .then((text) => {
            const cartValue = parseFloat(
              text
                .replace(/,/g, "")  // Clean and parse the subtotal price
                .replace("EGP", "")
                .trim()
            );
            cy.log(`Cart Value Is: ${cartValue}`);  // Log cart value
            // const totalPrice = totalProductPrice  // Add subtotal to product prices
            cy.log(`Total Price (Product + Cart Value): ${totalProductPrice}`);
            cy;
            expect(
                totalProductPrice,
              "The Available Cash should match the expected value"
            ).to.equal(cartValue)
          
          });
      });
  }
  
}

    export default new Amazon;  