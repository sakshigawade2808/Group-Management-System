const groupModel = require("../models/groupModel");

// View All Groups
const viewGroups = (req, res) => {

    groupModel.getAllGroups((err, results) => {

        if (err) {
            req.flash("error", "Unable to load groups.");
            return res.redirect("/");
        }

        res.render("groups", {
            groups: results
        });

    });

};

// Show Add Group Form
const showAddGroupForm = (req, res) => {

    res.render("addGroup");

};

// Create Group
const createGroup = (req, res) => {

    const { group_name, chain_id } = req.body;

    const is_active = req.body.is_active ? 1 : 0;

    if (!group_name || group_name.trim() === "") {

        req.flash("error", "Group Name is required.");

        return res.redirect("/groups/add");

    }

    groupModel.checkGroupExists(group_name, (err, results) => {

        if (err) {

            req.flash("error", "Something went wrong.");

            return res.redirect("/groups/add");

        }

        if (results.length > 0) {

            req.flash("error", "Group Name already exists.");

            return res.redirect("/groups/add");

        }

        const groupData = {

            group_name,

            chain_id: chain_id || null,

            is_active

        };

        groupModel.addGroup(groupData, (err) => {

            if (err) {

                req.flash("error", "Unable to add group.");

                return res.redirect("/groups/add");

            }

            req.flash("success", "Group added successfully.");

            res.redirect("/groups");

        });

    });

};

// Show Edit Form
const showEditForm = (req, res) => {

    const id = req.params.id;

    groupModel.getGroupById(id, (err, results) => {

        if (err) {

            req.flash("error", "Something went wrong.");

            return res.redirect("/groups");

        }

        if (results.length === 0) {

            req.flash("error", "Group not found.");

            return res.redirect("/groups");

        }

        res.render("editGroup", {

            group: results[0]

        });

    });

};

// Update Group
const updateGroup = (req, res) => {

    const id = req.params.id;

    const { group_name, chain_id } = req.body;

    const is_active = req.body.is_active ? 1 : 0;

    if (!group_name || group_name.trim() === "") {

        req.flash("error", "Group Name is required.");

        return res.redirect("/groups/edit/" + id);

    }

    const groupData = {

        group_name,

        chain_id: chain_id || null,

        is_active

    };

    groupModel.updateGroup(id, groupData, (err) => {

        if (err) {

            req.flash("error", "Unable to update group.");

            return res.redirect("/groups");

        }

        req.flash("success", "Group updated successfully.");

        res.redirect("/groups");

    });

};

// Delete Group
const deleteGroup = (req, res) => {

    const id = req.params.id;

    groupModel.checkChainId(id, (err, results) => {

        if (err) {

            req.flash("error", "Something went wrong.");

            return res.redirect("/groups");

        }

        if (results.length === 0) {

            req.flash("error", "Group not found.");

            return res.redirect("/groups");

        }

        if (results[0].chain_id !== null) {

            req.flash("error", "This group is linked with a Chain ID and cannot be deleted.");

            return res.redirect("/groups");

        }

        groupModel.softDeleteGroup(id, (err) => {

            if (err) {

                req.flash("error", "Unable to delete group.");

                return res.redirect("/groups");

            }

            req.flash("success", "Group deleted successfully.");

            res.redirect("/groups");

        });

    });

};

// Dashboard
const dashboard = (req, res) => {

    groupModel.getDashboardCounts((err, countResults) => {

        if (err) {

            req.flash("error", "Unable to load dashboard.");

            return res.redirect("/groups");

        }

        groupModel.getRecentGroups((err, groupResults) => {

            if (err) {

                req.flash("error", "Unable to load recent groups.");

                return res.redirect("/groups");

            }

            res.render("dashboard", {

                counts: countResults[0],

                recentGroups: groupResults

            });

        });

    });

};

module.exports = {

    dashboard,

    viewGroups,

    showAddGroupForm,

    createGroup,

    showEditForm,

    updateGroup,

    deleteGroup

};