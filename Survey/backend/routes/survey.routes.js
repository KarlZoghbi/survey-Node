const express = require("express");
const router = express.Router();
const {
    addToSurvey,
    getAllSurveys,
  getSurveyById,
  updateSurveyById,
  deleteSurveyById,
} = require("../controllers/survey.controllers");

router.post("/", addToSurvey);
router.get("/", getAllSurveys);
router.get("/:id", getSurveyById);
router.put("/:id", updateSurveyById);
router.delete("/:id", deleteSurveyById);

module.exports = router;
