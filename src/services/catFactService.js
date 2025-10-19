const axios = require('axios');

class CatFactService {
  constructor() {
    this.apiUrl = process.env.CAT_FACT_API_URL || 'https://catfact.ninja/fact';
    this.timeout = parseInt(process.env.API_TIMEOUT) || 5000;
    this.client = axios.create({
      timeout: this.timeout,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Dynamic-Profile-API/1.0.0'
      }
    });
  }

  async getRandomFact() {
    try {
      const response = await this.client.get(this.apiUrl);
      
      if (response.data && response.data.fact) {
        return {
          success: true,
          fact: response.data.fact,
          length: response.data.length
        };
      } else {
        return {
          success: false,
          error: 'Invalid response format from Cat Facts API'
        };
      }
    } catch (error) {
      console.error('Cat Facts API Error:', error.message);
      
      if (error.code === 'ECONNABORTED') {
        return {
          success: false,
          error: 'Cat Facts API request timeout'
        };
      } else if (error.response) {
        return {
          success: false,
          error: `Cat Facts API error: ${error.response.status} - ${error.response.statusText}`
        };
      } else if (error.request) {
        return {
          success: false,
          error: 'Unable to connect to Cat Facts API'
        };
      } else {
        return {
          success: false,
          error: 'Unexpected error fetching cat fact'
        };
      }
    }
  }

  // Fallback facts in case API is down
  getFallbackFact() {
    const fallbackFacts = [
      "Cats have five toes on their front paws, but only four on their back paws.",
      "A group of cats is called a clowder.",
      "Cats sleep for 70% of their lives.",
      "A cat's nose print is unique, much like a human's fingerprint.",
      "Cats can rotate their ears 180 degrees."
    ];
    
    return fallbackFacts[Math.floor(Math.random() * fallbackFacts.length)];
  }
}

module.exports = new CatFactService();