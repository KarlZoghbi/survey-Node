const Survey = require("../models/survey.model");

const addToSurvey = async (req, res) => {
    try {
        const { title, description, questions } = req.body;

        const survey = await Survey.create({
            title,
            description,
            questions,
        });

        res.status(200).send({ survey });
    } catch (error) {
        console.error("Error in addToSurvey:", error);
        res.status(500).send({ error: "Internal Server Error", message: "Something went wrong while adding to survey" });
    }
};

const getAllSurveys = async (req, res) => {
    try {
        const surveys = await Survey.find();
        res.status(200).send({ surveys });
    } catch (error) {
        console.error("Error in getAllSurveys:", error);
        res.status(500).send({ error: "Internal Server Error", message: "Something went wrong while fetching surveys" });
    }
};

const getSurveyById = async (req, res) => {
    try {
        const id = req.params.id;
        const survey = await Survey.findById(id);
        res.status(200).send({ survey });
    } catch (error) {
        console.error("Error in getSurveyById:", error);
        res.status(500).send({ error: "Internal Server Error", message: "Something went wrong while fetching survey by ID" });
    }
};

const updateSurveyById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;

        const updatedSurvey = await Survey.findByIdAndUpdate(id, data, { new: true });

        if (!updatedSurvey) {
            return res.status(404).send({ message: "Survey not found" });
        }

        res.status(200).send({ survey: updatedSurvey });
    } catch (error) {
        console.error("Error in updateSurveyById:", error);
        res.status(500).send({ error: "Internal Server Error", message: "Something went wrong while updating survey by ID" });
    }
};

const deleteSurveyById = async (req, res) => {
    try {
        const id = req.params.id;

        const deletedSurvey = await Survey.findByIdAndDelete(id);

        if (!deletedSurvey) {
            return res.status(404).send({ message: "Survey not found" });
        }

        res.status(200).send({ message: "Survey deleted successfully" });
    } catch (error) {
        console.error("Error in deleteSurveyById:", error);
        res.status(500).send({ error: "Internal Server Error", message: "Something went wrong while deleting survey by ID" });
    }
};

module.exports = {
    addToSurvey,
    getAllSurveys,
    getSurveyById,
    updateSurveyById,
    deleteSurveyById,
};
