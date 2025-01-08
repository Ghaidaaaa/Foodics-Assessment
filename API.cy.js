
import API from "../support/API"

describe('Create User API Test', () => {
    it('should create a new user', () => {
        
API.getCreateUser()
cy.wait(1000)
API.getRetrieveUser()
API.updateUser()
    })})

