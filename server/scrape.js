const axios = require("axios");
const cheerio = require("cheerio");

const scrapeCarData = async (searchParams) => {
  const { zipcode, make, model, color, price, type } = searchParams;

  const url = [
    `https://www.cars.com/shopping/results/?exterior_color_slugs[]=${color}&list_price_max=${price}&makes[]=${make}&maximum_distance=30&models[]=${model}&page_size=20&sort=best_match_desc&stock_type=${type}&zip=${zipcode}`,
    `https://www.autotrader.com/cars-for-sale/cars-under-${price}/${color}/${make}/${model}?listingType=${type}&zip=${zipcode}`,
  ];

  for (let u of url) {
    try {
      const response = await axios.get(url[0]);
      const $ = cheerio.load(response.data);

      let cars = [];

      if (u.includes("cars.com")) {
        $("div.vehicle-card").each((index, element) => {
          const carModel = $(element).find("h2.title").text();
          const carPrice = $(element).find("span.primary-price").text();
          const carDealer = $(element).find("div.dealer-name").text().trim();
          const carDistance = $(element).find(".miles-from").text().trim();
          const carType = $(element).find("p.stock-type").text();
          const imageUrl = $(element)
            .find("img.vehicle-image")
            .attr("data-src");

          cars.push({
            model: carModel,
            price: carPrice,
            carDealer: carDealer,
            distance: carDistance,
            type: carType,
            imageUrl: imageUrl,
          });
        });
      }

      if (u.includes("autotrader.com")) {
        $("div.col-xs-12.col-sm-4.display-flex").each((index, element) => {
          const carModel = $(element).find("h2.text-bold.text-size-400").text();
          const carPrice = $(element).find("div.first-price").text();
          const carDealer = $(element)
            .find("div.text-subdued")
            .first()
            .text()
            .trim();
          const carType = type;
          const imageUrl = $(
            "img.img-responsive-scale.img-vertically-aligned",
          ).attr("src");

          cars.push({
            model: carModel,
            price: carPrice,
            carDealer: carDealer,
            // distance: carDistance,
            type: carType,
            imageUrl: imageUrl,
          });
        });
      }

      return cars;
    } catch (error) {
      console.error("Error scraping car data:", error);
      throw error;
    }
  }
};

// const scrapePrice = async () => {};

module.exports = { scrapeCarData };
