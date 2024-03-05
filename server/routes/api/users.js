const router = require("express").Router();
const usersController = require("../../controllers/usersController");

// Matches "api/users"

router.route("/")
    .get(usersController.findAll)
    .post(usersController.create)

// Matches "api/users/${id}"
router.route("/:id")
    .get(usersController.findById)
    .put(usersController.update)
    .delete(usersController.deleteById)

router.route("/confirmUser")
    .post(usersController.authenticate);

module.exports = router;