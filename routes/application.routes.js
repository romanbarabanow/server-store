const { Router } = require("express");
const ApplicationController = require("../controllers/ApplicationController");

const router = Router();

router.get("/application", ApplicationController.allApplications);
router.get(
  "/application/category",
  ApplicationController.applicationsByCategory
);
router.post("/application", ApplicationController.createRequest);
router.get("/application/accepted", ApplicationController.acceptApplication);
router.get("/application/rejected", ApplicationController.rejectApplication);

module.exports = router;
