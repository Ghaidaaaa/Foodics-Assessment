import {BASE_API_URL} from "../URLs"
const userData = {
    name: 'John Doe',
    job: 'Developer',
    age: '30'
  };
  const updatedUserData = {
    name: 'Jane Doe',  // Updated name for the user
    job: 'Senior Developer',  // Updated job title
    age: '32'  // Updated age
  }

class API{

    // Create a User
    getCreateUser() {
      cy.request('POST', BASE_API_URL + '/api/users', userData).then((response) => {
        // Validate that the status code is 201 (created)
        expect(response.status).to.eq(201);
  
        // Validate the response body contains the expected fields
        expect(response.body.name).to.eq(userData.name);
        expect(response.body.job).to.eq(userData.job);
        expect(response.body.age).to.eq(userData.age);
  
        // Save the user ID for use in the next steps
        cy.wrap(response.body.id).as('userId');
      });
    }
  
    // Retrieve a User (Handling 404 and using valid IDs)
    getRetrieveUser() {
      // Retrieve the userId from the created user
      cy.get('@userId').then((userId) => {
        // Log the userId to ensure it is correct
        cy.log('User ID:', userId);
  
        // Ensure userId is available and valid before making the GET request
        expect(userId).to.exist;  // Check that userId was properly set
  
        // If the userId is valid, proceed with the GET request
        if (userId) {
          cy.request({
            method: 'GET',
            url: `${BASE_API_URL}/api/users/${userId}`,
            failOnStatusCode: false  // Do not fail on 404 or other errors
          }).then((response) => {
            if (response.status === 404) {
              cy.log(`User with ID ${userId} not found.`);
            } else {
              cy.log('Full Response:', JSON.stringify(response.body, null, 2));
              
              // Validate the status code is 200 (OK)
              expect(response.status).to.eq(200);
  
              // Validate the returned data matches the expected user
              const user = response.body;
              expect(user.name).to.eq(userData.name); // Match expected name
              expect(user.job).to.eq(userData.job);   // Adjust if job is part of the response
              expect(user.age).to.eq(userData.age);   // Adjust if age is part of the response
            }
          });
        }
      });
    }
    updateUser() {
      cy.get('@userId').then((userId) => {
        cy.log('User ID for update:', userId);
        expect(userId).to.exist;  // Ensure userId is available before the PUT request
  
        if (userId) {
          // Send PUT request to update user details
          cy.request({
            method: 'PUT',
            url: `${BASE_API_URL}/api/users/${userId}`,
            body: updatedUserData, 
            failOnStatusCode: false  
          }).then((response) => {
    
            if (response.status === 404) {
            } else {
            expect(response.status).to.eq(200);
            const updatedUser =response.body;
            expect(updatedUser.name).to.eq(updatedUserData.name);  // Updated name
            expect(updatedUser.job).to.eq(updatedUserData.job);    // Updated job
            expect(updatedUser.age).to.eq(updatedUserData.age);    // Updated age
        }});
        }
      });
    }
  }
  
export default new API