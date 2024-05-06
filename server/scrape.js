const axios = require("axios");
const cheerio = require("cheerio");

const scrapeCarData = async (searchParams) => {
  const { zipcode, make, model, color, price, type, year } = searchParams;

  const url1 = `https://www.cars.com/shopping/results/?exterior_color_slugs[]=${color}&list_price_max=${price}&makes[]=${make}&maximum_distance=30&models[]=${model}&page_size=20&sort=best_match_desc&stock_type=${type}&zip=${zipcode}&year_max=${year}&year_min=${year}`;
  const url2 = `https://www.autotrader.com/cars-for-sale/cars-under-${price}/${color}/${year}/${make}/${model}?listingType=${type}&zip=${zipcode}`;

  let cars = [];
  let autotrader = [];

  try {
    const response = await axios.get(url1);

    const $ = cheerio.load(response.data);

    $("div.vehicle-card").each((index, element) => {
      const carModel = $(element).find("h2.title").text();
      const carPrice = $(element).find("span.primary-price").text();
      const carDealer = $(element).find("div.dealer-name").text().trim();
      const carDistance = $(element).find(".miles-from").text().trim();
      const carType = $(element).find("p.stock-type").text();
      const imageUrl = $(element).find("img.vehicle-image").attr("data-src");
      const carDetails = $(element).find("a").attr("href");

      cars.push({
        source: "cars.com",
        model: carModel,
        price: carPrice,
        carDealer: carDealer,
        distance: carDistance,
        type: carType,
        imageUrl: imageUrl,
        year: year,
        details: carDetails,
      });
    });

    console.log(cars);
  } catch (error) {
    console.error("Error scraping car data:", error);
    throw error;
  }

  try {
    const response = await axios.get(url2);
    const $ = cheerio.load(response.data);

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
      const carDetails = $(element).find("a").attr("href");

      console.log(carModel);
      console.log(carPrice);
      console.log(carDealer);
      // console.log(carDistance); change to just use search param location
      // console.log(carType); change to use search param type
      console.log(imageUrl);

      autotrader.push({
        source: "autotrader.com",
        model: carModel,
        price: carPrice,
        carDealer: carDealer,
        // distance: carDistance,
        type: carType,
        imageUrl: imageUrl,
        year: year,
        details: carDetails,
      });
    });

    console.log(autotrader);
  } catch (error) {
    throw error;
  }

  return { cars, autotrader };
};

module.exports = { scrapeCarData };
