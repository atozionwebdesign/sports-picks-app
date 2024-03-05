const router = require("express").Router();
const sportRoutes = require("./sports");
const divisionRoutes = require("./divisions");
const teamRoutes = require("./teams");
const weekRoutes = require("./weeks");
const pickRoutes = require("./picks");
const groupRoutes = require("./groups");
const userRoutes = require("./users");

// pull in all collection routes
router.use("/sports", sportRoutes);
router.use("/divisions", divisionRoutes);
router.use("/teams", teamRoutes);
router.use("/weeks", weekRoutes);
router.use("/picks", pickRoutes);
router.use("/groups", groupRoutes);
router.use("/users", userRoutes);

module.exports = router;
