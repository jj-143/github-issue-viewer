describe("search repositories", () => {
  it("should render search form", () => {
    cy.visit("localhost:5173");
    cy.getByCy("search-form-input");
  });

  it("should search repositories", () => {
    cy.visit("/");
    cy.getByCy("search-form-input").type("tetris{enter}");
    cy.getByCy("repository-list-item")
      .first()
      .contains(/tetris/i);
  });
});

describe(
  "save repositories",
  {
    env: {
      MAX_COUNT_SAVED_REPOSITORY: 4,
    },
  },
  () => {
    beforeEach(() => {
      cy.visit("/");
      cy.getByCy("search-form-input").type("tetris{enter}");
    });

    specify("save and unsave feature", () => {
      // click save
      cy.getByCy("repository-list-item").first().getByCy("save").click();

      cy.getByCy("repository-list-item")
        .first()
        .getByCy("save")
        .should("not.exist");

      cy.getByCy("repository-list-item")
        .first()
        .getByCy("saved")
        .should("exist")
        // click saved
        .click();

      cy.getByCy("repository-list-item")
        .first()
        .getByCy("saved")
        .should("not.exist");

      cy.getByCy("repository-list-item")
        .first()
        .getByCy("save")
        .should("exist");
    });

    it("should not save after the limit", () => {
      cy.getByCy("save").filter(":not(:disabled)").should("exist");
      cy.getByCy("save").each(($save, idx) => {
        if (idx < Cypress.env("MAX_COUNT_SAVED_REPOSITORY")) {
          cy.wrap($save).click();
        } else {
          return false;
        }
      });
      cy.getByCy("save").filter(":not(:disabled)").should("not.exist");

      // can be saved after unsaved one
      cy.getByCy("saved").first().click();
      cy.getByCy("save").filter(":not(:disabled)").should("exist");
    });
  },
);
