// src/utils/api.js
import axios from 'axios';

// API request to search for flights
export const searchFlights = async (originSkyId, destinationSkyId, passengers, cabinClass, currency, departureDate) => {
  try {
    const response = await axios.get('https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlights', {
      params: {
        originSkyId: originSkyId,
        destinationSkyId: destinationSkyId,
        originEntityId: 27544008, // Static origin entity ID
        destinationEntityId: 27537542, // Static destination entity ID
        cabinClass: cabinClass,
        adults: passengers,
        sortBy: 'best',
        currency: currency,
        market: 'en-US',
        countryCode: 'US',
        date: departureDate,
      },
      headers: {
        'X-RapidAPI-Key': '9adbec7f3emsha38e337d5ae221dp1592c1jsn2cbe202f096d', // Replace with your actual API key
        'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com',
      },
    });

    return response.data?.data || [];
  } catch (error) {
    console.error("Error fetching flight data: ", error);
    throw new Error("Failed to fetch flight data.");
  }
};
