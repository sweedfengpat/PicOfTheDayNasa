import axios from 'axios';

const API_KEY = "DIDnYl5UClPPKgZGGrxHj2fx8vT7kluEDO1wpsJ2"

export const getApodData = async (startDate: string, endDate: string) => {
  const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${startDate}&end_date=${endDate}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching APOD data:', error);
    throw error;
  }
};

export const getApodDetail = async (date: string) => {
  const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching APOD detail:', error);
    throw error;
  }
};
