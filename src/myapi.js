import products from './products.json'

export default {
    getProducts: () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(products);
            }, 500);
        });
    },
    products: (action, productId) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(productId);
            }, 100);
        });
    }
}