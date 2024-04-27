const express = require("express");
const cors = require("cors");

const app = express();

const sequelize = require("./sequelize");

const { scrapeCarData } = require("./scrape");

const { Car, Notification } = require("./models");

const PORT = process.env.PORT || 3000;

const cron = require("node-cron");
const axios = require("axios");
const cheerio = require("cheerio");

sequelize
  .sync({ force: false }) // Set 'force: true' ONLY if you want to drop tables on each startup
  .then(() => {
    console.log("Database & tables created!");
  });

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Endpoint to handle scraper
app.post("/search", async (req, res) => {
  try {
    const searchParams = req.body;
    const carData = await scrapeCarData(searchParams);
    res.json(carData);
  } catch (error) {
    res.status(500).send("Error processing your request");
  }
});

app.post("/car/favorite", async (req, res) => {
  try {
    const { model, price, carDealer, distance, imageUrl } = req.body;
    console.log(req.body);
    const car = await Car.create({
      model,
      price,
      carDealer,
      distance,
      imageUrl,
    });
  } catch (error) {
    res.status(500).send("Error processing your request");
  }
});

app.get("/favorites", async (req, res) => {
  try {
    const cars = await Car.findAll();
    res.json(cars);
  } catch (error) {
    res.status(500).send("Error processing your request");
  }
});

app.delete("/car/favorite/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Car.destroy({ where: { id } });

    res.status(204).send();
  } catch (error) {
    console.error("error");
    res.status(500).send("error");
  }
});
