/*
I believe I was able to follow the test-first approach going over the red-green-refactor cycle
for the most part.  I was able to follow the goal of building a test then working to build minimal
code to meet those goals.  I think I could have probably refactored a bit more adamantly.  Obviously
plenty could be done in the long term scale of things as more testing and building is added as it is very
simple in its current form.

All in all I feel that the focus of the exercise was to showcase how breaking a project down into a
simple step-by-step process in order to keep your thoughts and code within a narrow focus. It feels like an
extremely powerful approach that I will hopefully be able to hone a bit more through practice.
 */

const myPortfolio = require('./portfolio.js');

let portfolio;

beforeEach(() => {
    portfolio = myPortfolio.createPortfolio();
});

test('Create Stock Portfolio', () => {
    expect(portfolio).toBeDefined();
});

test('Empty Portfolio Check', () => {
    const emptyPortfolio = myPortfolio.shareStatus(portfolio);
    expect(emptyPortfolio).toBe('No shares owned');
});

test('Make a purchase', () => {
    myPortfolio.purchaseStock(portfolio, "GOOGL", 34);
    expect(portfolio.find(stock => "GOOGL" in stock)["GOOGL"].shares).toBe(34);
});

test('Make a sale', () => {
    myPortfolio.purchaseStock(portfolio, "AMZN", 15);
    myPortfolio.sellStock(portfolio, "AMZN", 14);
    expect(portfolio.find(stock => "AMZN" in stock)["AMZN"].shares).toBe(1);
});

test('Unique ticker symbols', () => {
    myPortfolio.purchaseStock(portfolio, "AMZN", 15);
    myPortfolio.purchaseStock(portfolio, "GOOGL", 14);
    const stockCount = myPortfolio.countStock(portfolio);
    expect(stockCount).toBe(2);
});

test('Remove unowned stocks', () => {
    myPortfolio.purchaseStock(portfolio, "AMZN", 0);
    const cleanPortfolio = myPortfolio.cleanupStocks(portfolio);
    expect(cleanPortfolio).toEqual([]);
});

test('Check shares for a symbol', () => {
    myPortfolio.purchaseStock(portfolio, "AMZN", 13);
    const currentShares = myPortfolio.getShares(portfolio, "AMZN");
    const zeroShares = myPortfolio.getShares(portfolio, "GOOGL");
    expect(currentShares).toBe(13);
    expect(zeroShares).toBe(0);
});

test('Do not oversell shares', () => {
    myPortfolio.purchaseStock(portfolio, "AMZN", 13);
    expect(() => myPortfolio.sellStock(portfolio, "AMZN", 44)).toThrow(Error);
})