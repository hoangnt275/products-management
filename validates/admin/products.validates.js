module.exports.createPost = (req, res, next) => {
    if (!req.body.title) {
        req.flash("error", "Vui long nhap ten san pham");
        res.redirect("/admin/products/create");
        return;
    }
    next();
};
