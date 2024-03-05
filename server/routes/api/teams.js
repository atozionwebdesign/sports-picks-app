const router = require("express").Router();
const teamsController = require("../../controllers/teamsController");

// Matches "api/teams"
router.route("/").get(teamsController.findAll).post(teamsController.create);

// Matches "api/teams/${id}"
router
  .route("/:id")
  .get(teamsController.findById)
  .put(teamsController.update)
  .delete(teamsController.deleteById);

// Matches "api/teams/league/${league}"
router.route("/league/:league")
  .get(teamsController.findByLeague);

module.exports = router;
