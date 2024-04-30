const axios = require("axios");
const cheerio = require("cheerio");

const scrapeCarData = async (searchParams) => {
  const { zipcode, make, model, color, price } = searchParams;

  const url = [
    `https://www.cars.com/shopping/results/?exterior_color_slugs[]=${color}&list_price_max=${price}&makes[]=${make}&maximum_distance=30&models[]=${model}&page_size=20&sort=best_match_desc&zip=${zipcode}`,
  ];

  // https://www.cars.com/shopping/results/?exterior_color_slugs[]=gray&keyword=&list_price_max=&list_price_min=&makes[]=nissan&maximum_distance=30&mileage_max=&models[]=nissan-pathfinder&monthly_payment=&page_size=20&sort=best_match_desc&stock_type=new&year_max=&year_min=&zip=

  try {
    const response = await axios.get(url[0]);
    const $ = cheerio.load(response.data);

    let cars = [];

    $("div.vehicle-card").each((index, element) => {
      const carModel = $(element).find("h2.title").text();
      const carPrice = $(element).find("span.primary-price").text();
      const carDealer = $(element).find("div.dealer-name").text().trim();
      const carDistance = $(element).find(".miles-from").text().trim();
      const imageUrl = $(element).find("img.vehicle-image").attr("data-src");


      cars.push({
        model: carModel,
        price: carPrice,
        carDealer: carDealer,
        distance: carDistance,
        imageUrl: imageUrl,
      });
    });

    return cars;
  } catch (error) {
    console.error("Error scraping car data:", error);
    throw error;
  }
};

const scrapePrice = async () => {};

module.exports = { scrapeCarData };
