const router = require("express").Router();
const weeksController = require("../../controllers/weeksController");

// Matches "api/weeks"
router.route("/")
    .get(weeksController.findAll)

// Matches "api/weeks/${id}"
router
  .route("/:id")
  .get(weeksController.findById)

module.exports = router;
