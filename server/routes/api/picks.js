const router = require("express").Router();
const picksController = require("../../controllers/picksController")

// Matches "api/picks"
router.route("/")
    .get(picksController.findAll)
    .post(picksController.create);

// Matches "api/picks/${id}"
router.route("/:id")
    // .get(picksController.findById)
    // .put(picksController.update)

// Matches "api/picks/game/${id}"
router.route("/:id")
  .put(picksController.update);


module.exports = router;