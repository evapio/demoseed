var products_db = db.getSiblingDB("products");

print(products_db);

products_db.products.createIndex({
    'url': 1
}, {
    'unique': true,
    'background': true
});