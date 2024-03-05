const router = require("express").Router();
const groupsController = require("../../controllers/groupsController")

// Matches "api/groups"
router.route("/")
    .get(groupsController.findAll)
    .post(groupsController.create)


// Matches "api/groups/${id}"
router.route("/:id")
    .get(groupsController.findById)
    .put(groupsController.update)
    .delete(groupsController.deleteById)


module.exports = router;