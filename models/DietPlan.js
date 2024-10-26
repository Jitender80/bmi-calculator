// models/DietPlan.js
const mongoose = require('mongoose');

const DietPlanSchema = new mongoose.Schema({
    bmi: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    dietPlan: {
        type: String,
        required: true,
    },
    goal: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const DietPlan = mongoose.model('DietPlan', DietPlanSchema);
module.exports = DietPlan;
