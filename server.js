// server.js
const express = require('express');
const connectDB = require('./db');
const DietPlan = require('./models/DietPlan');

const app = express();
app.use(express.json());

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));


// Connect to the database
connectDB();

// Route to save the diet plan
app.post('/save-diet-plan', async (req, res) => {
    try {
        const { bmi, status, dietPlan, goal } = req.body;

        const newDietPlan = new DietPlan({
            bmi,
            status,
            dietPlan,
            goal,
        });

        await newDietPlan.save();
        res.status(201).json({ message: "Diet plan saved successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/get-diet-plan',async (req,res)=>{
    try {
        const response = await DietPlan.findOne({})
        res.status(200).json({data:[response]})

    } catch (error) {
        console.log(error.message);
        
    }
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
