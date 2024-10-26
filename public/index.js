function calculateBMI() {
  const height = parseFloat(document.getElementById("height").value) / 100;
  const weight = parseFloat(document.getElementById("weight").value);
  const goal = document.getElementById("goal").value;

  if (!height || !weight || height <= 0 || weight <= 0) {
    alert("Please enter valid values.");
    return;
  }

  const bmi = (weight / (height * height)).toFixed(2);

  let status = "";
  let dietPlan = "";

  // Determine BMI category
  if (bmi < 18.5) {
    status = "Underweight";
    dietPlan = `
        <strong>Diet Plan for Underweight:</strong><br>
        - Nuts and nut butter<br>
        - Avocados<br>
        - Whole grains (e.g., quinoa, brown rice)<br>
        - Dairy products (e.g., cheese, yogurt)<br>
        - Healthy fats (e.g., avocado, olive oil, and peanut butter)<br>
    `;
  } else if (bmi < 24.9) {
    status = "Normal weight";
    dietPlan = `
        <strong>Diet Plan for Normal Weight:</strong><br>
        - Fruits & vegetables<br>
        - Whole grains (e.g., oats, brown rice)<br>
        - Lean proteins (e.g., chicken, fish)<br>
        - Nuts and seeds<br>
        - Low-fat dairy products<br>
    `;
  } else if (bmi < 29.9) {
    status = "Overweight";
    dietPlan = `
        <strong>Diet Plan for Overweight:</strong><br>
        - Leafy greens (e.g., spinach, kale)<br>
        - Lean meats (e.g., turkey, chicken breast)<br>
        - Whole grains (e.g., quinoa, barley)<br>
        - Fruits (e.g., berries, apples)<br>
        - Legumes (e.g., lentils, chickpeas)<br>
    `;
  } else {
    status = "Obesity";
    dietPlan = `
        <strong>Diet Plan for Obesity:</strong><br>
        - Lean protein sources (e.g., fish, chicken breast, tofu)<br>
        - Non-starchy vegetables (e.g., broccoli, cauliflower, peppers)<br>
        - High-fiber foods (e.g., oats, beans, legumes)<br>
        - Healthy fats (e.g., avocados, nuts in moderation)<br>
        - Drink plenty of water and avoid sugary drinks<br>
    `;
  }

  // Adjust recommendations based on the goal (weight-loss or muscle-gain)
  if (goal === "weight-loss") {
    dietPlan += `
        <strong>Weight Loss Tips:</strong><br>
        - Track your calorie intake to maintain a calorie deficit<br>
        - Drink plenty of water and avoid liquid calories<br>
        - Incorporate more physical activity like walking, running, or resistance training<br>
        - Focus on whole foods and avoid overeating<br>
    `;
  } else if (goal === "muscle-gain") {
    dietPlan += `
        <strong>Muscle Gain Tips:</strong><br>
        - Consume a high-protein diet with lean meats, eggs, and protein supplements<br>
        - Include complex carbs like sweet potatoes, brown rice, and whole grains<br>
        - Focus on strength training and resistance exercises<br>
        - Ensure adequate rest and recovery after workouts<br>
    `;
  }

  // Send data to server
  fetch("http://localhost:5000/save-diet-plan", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ bmi, status, dietPlan, goal }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        alert(data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  localStorage.setItem("bmi", bmi);
  localStorage.setItem("status", status);
  localStorage.setItem("dietPlan", dietPlan);

  // Optionally, redirect to the diet plan page
  window.location.href = "diet-plan.html";
}
