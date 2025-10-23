const Products = require("../../models/products.model");
const filterStatusHelper = require("../../helper/filterStatus");
const searchStatusHelper = require("../../helper/search");
const paginationHelper = require("../../helper/pagination");
const systemConfig = require("../../config/system");
// [GET] /admin/products
module.exports.index = async (req, res) => {
    const filterStatus = filterStatusHelper(req.query);
    const filter = {
        deleted: false,
    };
    if (req.query.status) {
        filter.status = req.query.status;
    }

    const objectSearch = searchStatusHelper(req.query);
    if (objectSearch.regex) {
        filter.title = objectSearch.regex;
    }
    // pagination
    const objectPagination = {
        currentPage: 1,
        limitItems: 4,
    };
    const count = await Products.countDocuments(filter);
    const objectPaginationUpdated = paginationHelper(
        objectPagination,
        req.query,
        count
    );
    // end pagination

    const products = await Products.find(filter)
        .sort({ position: "desc" })
        .limit(objectPagination.limitItems)
        .skip(objectPagination.skip);
    res.render("admin/pages/products/index", {
        pageTitle: "Danh sach san pham",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPaginationUpdated,
    });
};
// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    console.log(req.params);
    const id = req.params.id;
    const status = req.params.status;
    await Products.updateOne({ _id: id }, { status: status });
    req.flash("success", "Cap nhat thay doi thanh cong");
    res.redirect("/admin/products");
};
// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
    const ids = req.body.ids;
    const type = req.body.type;
    const arrayIds = ids.split(", ");
    console.log(type);
    if (type == "delete-all") {
        for (let id of arrayIds) {
            await Products.updateOne({ _id: id }, { deleted: true });
        }
    }
    if (type == "active" || type == "inactive") {
        for (let id of arrayIds) {
            await Products.updateOne({ _id: id }, { status: type });
        }
        req.flash("success", `Da xoa thanh cong ${arrayIds.length} san pham`);
    }
    if (type == "change-position") {
        for (const item of arrayIds) {
            const posId = item.split("-");
            const position = parseInt(posId[1]);
            const id = posId[0];
            await Products.updateOne({ _id: id }, { position: position });
        }
        req.flash(
            "success",
            `Da thay doi vi tri thanh cong ${arrayIds.length} san pham`
        );
    }
    res.redirect("/admin/products");
};
// [DELETE] /admin/products/delete
module.exports.delete = async (req, res) => {
    const id = req.params.id;
    await Products.updateOne({ _id: id }, { deleted: true });
    req.flash("success", `Da xoa thanh cong san pham`);
    res.redirect("/admin/products");
};
// [GET] /admin/products/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/products/create", {
        pageTitle: "Tao moi san pham",
    });
};
// [POST] /admin/products/create
module.exports.createPost = async (req, res) => {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);

    if (req.body.position == "") {
        const countProducts = await Products.countDocuments();
        req.body.position = countProducts + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }
    if (req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }
    const product = new Products(req.body);
    product.save();
    res.redirect(`${systemConfig.prefixAdmin}/products`);
};
// [GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
    const productId = req.params.id;
    const currentProduct = await Products.findOne({ _id: productId });
    console.log("dang o get");
    res.render("admin/pages/products/edit", {
        pageTitle: "Chinh sua san pham",
        item: currentProduct,
    });
};
// [PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);

    if (req.body.position == "") {
        const countProducts = await Products.countDocuments();
        req.body.position = countProducts + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }
    if (req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }
    await Products.updateOne({ _id: id }, req.body);
    req.flash("success", `Da cap nhat san pham thanh cong`);
    res.redirect(`${systemConfig.prefixAdmin}/products`);
};
// [GET] /admin/products/details/:id
module.exports.details = async (req, res) => {
    const productId = req.params.id;
    const currentProduct = await Products.findOne({ _id: productId });
    console.log("dang o get");
    res.render("admin/pages/products/details", {
        pageTitle: "Chi tiet san pham",
        item: currentProduct,
    });
};
