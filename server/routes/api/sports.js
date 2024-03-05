const router = require("express").Router();
const sportsController = require("../../controllers/sportsController")

// Matches "api/sports"
router.route("/")
    .get(sportsController.findAll)
    .post(sportsController.create)

// Matches "api/sports/${id}"
router.route("/:id")
    .get(sportsController.findById)
    .put(sportsController.update)
    .delete(sportsController.deleteById)

module.exports = router;