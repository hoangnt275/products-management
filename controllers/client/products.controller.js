const Products = require("../../models/products.model");
// [GET] /products
module.exports.index = async (req, res) => {
    const products = await Products.find({
        status: "active",
        deleted: false,
    }).sort({ position: "desc" });
    products.forEach((item) => {
        item.newPrice = (
            (item.price * (100 - item.discountPercentage)) /
            100
        ).toFixed(0);
    });
    console.log(products);
    res.render("client/pages/products/index", {
        pageTitle: "Trang san pham",
        products: products,
    });
};
// [GET] /products/:slug
module.exports.details = async (req, res) => {
    const slug = req.params.slug;
    const products = await Products.findOne({
        status: "active",
        deleted: false,
        slug: slug,
    });
    res.render("client/pages/products/details", {
        pageTitle: products.title,
        item: products,
    });
};
