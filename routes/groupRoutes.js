const express = require("express");

const router = express.Router();

const groupController = require("../controllers/groupController");

router.get("/", groupController.viewGroups);

router.get("/add", groupController.showAddGroupForm);

router.post("/add", groupController.createGroup);

router.get("/edit/:id", groupController.showEditForm);

router.post("/edit/:id", groupController.updateGroup);
router.get("/delete/:id", groupController.deleteGroup);
module.exports = router;