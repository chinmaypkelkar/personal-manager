describe('Sign up', () => {
  let backendBaseUrl = "http://localhost:5010";
  let signUpUrl = "/Person/SignUp";
  beforeEach(() => {
    cy.visit('/sign-up');
  })
  it('successfully loads', () => {
    const uuid = () => Cypress._.random(0, 1e6);
    const id = uuid();
    cy.get("mat-form-field input").get(`[formControlName="firstName"]`).type(`first${id}`);
    cy.get("mat-form-field input").get(`[formControlName="lastName"]`).type(`last${id}`);
    cy.get("mat-form-field input").get(`[formControlName="email"]`).type(`email${id}@gmail.com`);
    cy.get("mat-form-field input").get(`[formControlName="userName"]`).type(`user${id}`);
    cy.get("mat-form-field input").get(`[formControlName="password"]`).type(`${id}`);
    cy.intercept('POST', `${backendBaseUrl}${signUpUrl}`).as('post')
    cy.get('#signUpBtn').click();
    cy.wait('@post').should((interceptor) => {
      expect(interceptor.request.body.firstName).to.equal(`first${id}`)
      expect(interceptor.request.body.lastName).to.equal(`last${id}`)
      expect(interceptor.request.body.email).to.equal(`email${id}@gmail.com`)
      expect(interceptor.request.body.userName).to.equal(`user${id}`)
      expect(interceptor.request.body.password).to.equal(`${id}`)
      expect(interceptor.response.statusCode).to.equal(200)
    })
  })

  it('user already exists', () => {
    cy.get("mat-form-field input").get(`[formControlName="firstName"]`).type('Chinmay');
    cy.get("mat-form-field input").get(`[formControlName="lastName"]`).type('Kelkar');
    cy.get("mat-form-field input").get(`[formControlName="email"]`).type('chinmaypkelkar@gmail.com');
    cy.get("mat-form-field input").get(`[formControlName="userName"]`).type('ckelkar');
    cy.get("mat-form-field input").get(`[formControlName="password"]`).type('Test123!');
    cy.intercept('POST', `${backendBaseUrl}${signUpUrl}`).as('post')
    cy.get('#signUpBtn').click();
    cy.wait('@post').should((interceptor) => {
      expect(interceptor.response.statusCode).to.equal(500);
      expect(interceptor.response.body).to.equal('Person with given userName already exists in the system. Sign in for further information')
    })
  })
})
