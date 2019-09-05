describe('Visit localhost server', function() {
	it('Visit Home page', function() {
		cy.visit('http://localhost:3030');
	});

	it('Visit About page', function() {
		cy.visit('http://localhost:3030/about');
	});

	it('Visit Simple Ticker page', function() {
		cy.visit('http://localhost:3030/simpleTicker');
	});

	it('Visit Redux Ticker page', function() {
		cy.visit('http://localhost:3030/reduxTicker');
	});

	it('Visit Redux Colorizer page', function() {
		cy.visit('http://localhost:3030/reduxColorizer');
	});

});
