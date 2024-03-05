const router = require("express").Router();
const divisionsController = require("../../controllers/divisionsController")

// Matches "api/divisions"
router.route("/")
    .get(divisionsController.findAll)
    .post(divisionsController.create)


// Matches "api/divisions/${id}"
router.route("/:id")
    .get(divisionsController.findById)
    .put(divisionsController.update)
    .delete(divisionsController.deleteById)


module.exports = router;