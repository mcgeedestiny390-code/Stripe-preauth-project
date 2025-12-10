const express = require("express");
const Stripe = require("stripe");

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.use(express.json());

app.post("/create-hold", async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      capture_method: "manual",
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});
