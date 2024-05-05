// const axios = require("axios");
// const cheerio = require("cheerio");

// const scrapeCarData = async (searchParams) => {
//   const { zipcode, make, model, color, price } = searchParams;

//   const url = [
//     `https://www.cars.com/shopping/results/?exterior_color_slugs[]=${color}&list_price_max=${price}&makes[]=${make}&maximum_distance=30&models[]=${model}&page_size=20&sort=best_match_desc&zip=${zipcode}`,
//   ];

//   // https://www.cars.com/shopping/results/?exterior_color_slugs[]=gray&keyword=&list_price_max=&list_price_min=&makes[]=nissan&maximum_distance=30&mileage_max=&models[]=nissan-pathfinder&monthly_payment=&page_size=20&sort=best_match_desc&stock_type=new&year_max=&year_min=&zip=

//   try {
//     const response = await axios.get(url[0]);
//     const $ = cheerio.load(response.data);

//     let cars = [];

//     $("div.vehicle-card").each((index, element) => {
//       const carModel = $(element).find("h2.title").text();
//       const carPrice = $(element).find("span.primary-price").text();
//       const carDealer = $(element).find("div.dealer-name").text().trim();
//       const carDistance = $(element).find(".miles-from").text().trim();
//       const imageUrl = $(element).find("img.vehicle-image").attr("data-src");


//       cars.push({
//         model: carModel,
//         price: carPrice,
//         carDealer: carDealer,
//         distance: carDistance,
//         imageUrl: imageUrl,
//       });
//     });

//     return cars;
//   } catch (error) {
//     console.error("Error scraping car data:", error);
//     throw error;
//   }
// };

// const scrapePrice = async () => {};

// module.exports = { scrapeCarData };

const axios = require("axios");
const cheerio = require("cheerio");

const scrapeCarData = async (searchParams) => {
  const { zipcode, make, model, color, price, type } = searchParams;

  const urls = [
    `https://www.cars.com/shopping/results/?exterior_color_slugs[]=${color}&list_price_max=${price}&makes[]=${make}&maximum_distance=30&models[]=${model}&page_size=20&sort=best_match_desc&stock_type=${type}&zip=${zipcode}`,
    `https://www.carmax.com/cars/all/${searchParams.make}/${searchParams.model}?color=${searchParams.color}&maxPrice=${searchParams.price}&zipCode=${searchParams.zipCode}&includeNonTransferables=true`,
  ];

  let cars = [];

  for (let u of urls) {
    try {
      const response = await axios.get(u);
      const $ = cheerio.load(response.data);

      if (u.includes("cars.com")) {
        $("div.vehicle-card").each((index, element) => {
          const carModel = $(element).find("h2.title").text();
          const carPrice = $(element).find("span.primary-price").text();
          const carDealer = $(element).find("div.dealer-name").text().trim();
          const carDistance = $(element).find(".miles-from").text().trim();
          const carType = $(element).find("p.stock-type").text();  // Ensure this selector is correct
          const imageUrl = $(element).find("img.vehicle-image").attr("data-src");

          cars.push({
            source: 'Cars.com',
            model: carModel,
            price: carPrice,
            dealer: carDealer,
            distance: carDistance,
            type: carType,
            imageUrl: imageUrl
          });
        });
      } else if (u.includes("carmax.com")) {
        $("article.sc--car-tile").each((index, element) => {
          const $element = $(element);
          const carModel = $element.find("h3.sc--make-model-info").text().trim();
          const carPrice = $element.find("span.sc--price-miles-info--price").text().trim();
          const carMiles = $element.find("span.sc--price-miles-info--miles").text().trim();
          const carStoreAvailability = $element.find("span.sc--store-transfer-info--transfer").text().trim();
          const imageUrl = $element.find("img.sc--image-gallery__image").attr("src");
      
          cars.push({
            source: 'CarMax.com',
            model: carModel,
            price: carPrice,
            miles: carMiles,
            storeAvailability: carStoreAvailability,
            imageUrl: imageUrl
          });
        });
      }
    } catch (error) {
      console.error("Error scraping car data from URL:", u, error);
    }
  }

  return cars;
};

module.exports = { scrapeCarData };

