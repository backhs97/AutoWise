# CarWise

CarWise is a car-searching application designed to help users find the perfect car based on specific search criteria. The app scrapes car listings from popular car sale websites and provides an easy-to-use interface for searching, saving favorites, and viewing detailed car information.

## Features

- **Car Search**: Search for cars by make, model, color, price, type, and year.
- **Scraping**: Scrapes car data from popular websites such as Cars.com and AutoTrader.com.
- **Favorites**: Save your favorite car listings for quick access.
- **Notifications**: Get notified when a car's price changes.
- **Responsive Design**: Optimized for both mobile and desktop use.

## Tech Stack

- **Backend**: Node.js
- **Database**: PostgreSQL, Sequelize ORM
- **Web Scraping**: Axios, Cheerio
- **Scheduling**: Jira
- **API Testing**: Postman
- **Version Control**: Git, GitHub

## Installation

To run the CarWise application locally, follow these steps:

1. Clone the repository

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up the PostgreSQL database:
    - Ensure PostgreSQL is installed and running.
    - Update the connection string in `sequelize.js` to match your PostgreSQL setup.

4. Run the server:
    ```bash
    npm start
    ```

5. The server will run on `http://localhost:3000`.

## Usage

1. **Search for Cars**: Use the search form to filter cars by your desired criteria.
2. **View Results**: Browse through the search results, which include car details and images.
3. **Save Favorites**: Click the heart icon to save cars to your favorites list.
4. **Manage Favorites**: View and manage your favorite cars by accessing the "Favorites" tab.

## API Endpoints

### POST /search

- **Description**: Scrapes car data based on the search parameters provided.
- **Request Body**:
  ```json
  {
    "zipcode": "90001",
    "make": "Honda",
    "model": "Civic",
    "color": "blue",
    "price": "20000",
    "type": "new",
    "year": "2023"
  }

![111111111111111111111111](https://github.com/user-attachments/assets/8447711a-b9ba-4075-b22e-e365cb668b93) ![22222222222222222222222222](https://github.com/user-attachments/assets/ded22c12-b4ea-49b7-b8b3-bd01e23242a6) ![3333333333333333333333](https://github.com/user-attachments/assets/c6c4fed0-ea1e-45f2-a5bc-0c896fd6b0f6) ![4444444444444444444](https://github.com/user-attachments/assets/c2f752c3-4cae-4e00-b330-06cb6d61eb53) ![5555555555555555555555](https://github.com/user-attachments/assets/caf1e1d9-14ae-4b4e-af5b-a44c45a6f420)


