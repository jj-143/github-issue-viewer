describe("search issue", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.getByCy("search-form-input").type("tetris{enter}");
  });

  it("should show issues with the saved repositories", () => {
    cy.getByCy("repository-list-item").first().getByCy("save").click();

    cy.getByCy("repository-list-item")
      .first()
      .getByCy("repository-full-name")
      .invoke("text")
      .then((repoName) => {
        cy.getByCy("issue-list-item")
          .first()
          .getByCy("issue-repository-name")
          .contains(repoName);
      });
  });
});
