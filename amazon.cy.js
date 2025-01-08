
import Amazon from "../support/amazon";

describe ('Amazon', () => {
 describe('Amazon Tests', () => {
     const amazon = Amazon;  // C
it('Invalid Username', () => {
 amazon.getAmazonURL()
 cy.wait(500)
 amazon.getAmazonMenu()
 amazon.getSeeAllMenu()
 amazon.getVideoGamesMenu()
 cy.wait(800)
 amazon.getAllVideoGamesMenu()
 amazon.getFreeShippingBtn()
 amazon.getNewCondition()
 cy.wait(1000)
  amazon.getPriceBelow15k()
  amazon.getCart()
  amazon.getProductsPrices()
  amazon.getCartValue()

})



})
})
