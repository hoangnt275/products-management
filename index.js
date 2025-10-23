const express = require("express");
const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");
const database = require("./config/database");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();
const bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());
const methodOverride = require("method-override");
require("dotenv").config();
const port = process.env.PORT;
const system = require("./config/system");
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");
app.use(express.static(`${__dirname}/public`));
database.connect();
app.use(methodOverride("_method"));
// flash
app.use(cookieParser("hoangashfoqw"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
// end flash
//local app variables
app.locals.prefixAdmin = system.prefixAdmin;
// routes
route(app);
routeAdmin(app);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
