const getShares = (portfolio, ticker) => {
    const position = portfolio.find(stock => stock[ticker])
    if (position) {
        return position[ticker].shares
    } else {
        return 0;
    }
};

const cleanupStocks = (portfolio) => {
    return portfolio.filter(stocks => Object.values(stocks)[0].shares !== 0);
};

const countStock = (portfolio) => {
    return portfolio.length;
};

const createPortfolio = () => ([]);

const shareStatus = (portfolio) => {
    if (!portfolio.length) {
        return 'No shares owned'
    } else {
        return 'We have shares'
    }
};

const purchaseStock = (portfolio, ticker, shareCount) => {
    portfolio.push({
        [ticker]: {
            shares: shareCount
        }
    });
}

const sellStock = (portfolio, ticker, shareCount) => {
    const position = portfolio.find(stock => stock[ticker]);
    let currentShares = position[ticker].shares;
    if (currentShares < shareCount) {
        throw new Error('Not possible to sell this number of shares.');
    } else {
        position[ticker].shares -= shareCount;
    }
};

exports.createPortfolio = createPortfolio;
exports.shareStatus = shareStatus;
exports.purchaseStock = purchaseStock;
exports.sellStock = sellStock;
exports.countStock = countStock;
exports.cleanupStocks = cleanupStocks;
exports.getShares = getShares;