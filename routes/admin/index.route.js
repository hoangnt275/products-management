const dashboardRoutes = require("./dashboard.route");
const productsRoutes = require("./products.route");
const system = require("../../config/system");
module.exports = (app) => {
    PATH_ADMIN = system.prefixAdmin;
    app.use(PATH_ADMIN + "/dashboard", dashboardRoutes);
    app.use(PATH_ADMIN + "/products", productsRoutes);
};
