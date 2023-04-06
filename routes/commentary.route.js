const { Router } = require("express");
const CommentaryController = require("../controllers/CommentaryController");
const middleware = require("../middleware/auth.moddleware");

const router = Router();

router.post("/commentary", middleware, CommentaryController.addCommentary);
router.get("/commentary", CommentaryController.allCommentary);
router.get(
  "/commentary/remove",
  middleware,
  CommentaryController.removeCommentary
);

module.exports = router;
