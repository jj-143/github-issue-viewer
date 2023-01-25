/// <reference types="cypress" />
declare namespace Cypress {
  interface Chainable {
    getByCy(selector: string): Chainable<JQuery<Element>>;
  }
}

Cypress.Commands.add(
  "getByCy",
  {
    prevSubject: "optional",
  },
  (subject, selector) => {
    return cy.get(`[data-cy=${selector}]`, {
      withinSubject: subject as HTMLElement,
    });
  },
);
