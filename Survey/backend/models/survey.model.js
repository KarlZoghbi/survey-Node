const mongoose = require("mongoose");

const surveySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },
        description: {
            type: String,
            required: true,
            maxlength: 1000,
        },
        questions: [{
            type: {

            },
            title: {
                type: String,
                required: true,
                trim: true
            },
            answers: [

            ]
        }]


        ,
        // completed: {
        //     type: Boolean,
        //     default: false,
        // },
        // user: {
        //   type: mongoose.Schema.Types.ObjectId,
        //   ref: "User",
        //   required: true,
        // },
    },
    {
        timestamps: true,
    }
);

const Survey = mongoose.model("Survey", surveySchema);

module.exports = Survey;
