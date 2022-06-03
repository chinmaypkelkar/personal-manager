describe('Sign in', () => {
  let backendBaseUrl = "http://localhost:5010";
  let signInUrl = "/Person/SignIn";
  beforeEach(() => {
    cy.visit('/sign-in')
  })

  it('user doesnt exists', () => {
    const uuid = () => Cypress._.random(0, 1e6);
    const id = uuid();
    cy.get("mat-form-field input").get(`[formControlName="userName"]`).type(`first${id}`);
    cy.get("mat-form-field input").get(`[formControlName="password"]`).type(`${id}`);
    cy.intercept('GET', `${backendBaseUrl}${signInUrl}*`).as('get')
    cy.get('#signInBtn').click();
    cy.wait('@get').should((interceptor) => {
      expect(interceptor.response.statusCode).to.equal(500);
      expect(interceptor.response.body).to.equal('the given user is not present in the system. Please sign up for access')
    })
  })

  it('user successfully log in', () => {
    cy.get("mat-form-field input").get(`[formControlName="userName"]`).type('ckelkar');
    cy.get("mat-form-field input").get(`[formControlName="password"]`).type('Test123!');
    cy.intercept('GET', `${backendBaseUrl}${signInUrl}*`).as('get')
    cy.get('#signInBtn').click();
    cy.wait('@get').should((interceptor) => {
      expect(interceptor.response.statusCode).to.equal(200);
      expect(interceptor.response.body.token).not.equal(null);
      cy.setCookie("accessToken", interceptor.response.body.token);
    })
  })

})
