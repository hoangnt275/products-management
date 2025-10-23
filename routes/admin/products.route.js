const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/products.controller");
const multer = require("multer");
const storage = require("../../helper/storageMulter");
const validate = require("../../validates/admin/products.validates");
const upload = multer({ storage: storage() });
router.get("/", controller.index);
router.patch("/change-status/:status/:id", controller.changeStatus);
router.patch("/change-multi", controller.changeMulti);
router.delete("/delete/:id", controller.delete);
router.get("/create", controller.create);
router.post(
    "/create",
    upload.single("thumbnail"),
    validate.createPost,
    controller.createPost
);
router.get("/edit/:id", controller.edit);
router.patch(
    "/edit/:id",
    upload.single("thumbnail"),
    validate.createPost,
    controller.editPatch
);
module.exports = router;
router.get("/details/:id", controller.details);
