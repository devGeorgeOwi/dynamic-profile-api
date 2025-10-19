const catFactService = require('../services/catFactService');

// Define user profile as a constant
const userProfile = {
  email: "owoichogeorge4400@gmail.com", // Replace with your email
  name: "George Owoicho",  // Replace with your name
  stack: "Node.js/Express" // Replace with your actual stack
};
async function getProfile(req, res, next) {
    try {
      const timestamp = new Date().toISOString();
      
      // Fetch cat fact from external API
      const catFactResult = await catFactService.getRandomFact();
      
      let fact;
      if (catFactResult.success) {
        fact = catFactResult.fact;
      } else {
        console.warn('Using fallback cat fact due to API error:', catFactResult.error);
        fact = catFactService.getFallbackFact();
      }

      // Construct response
      const response = {
        status: "success",
        user: userProfile,
        timestamp: timestamp,
        fact: fact
      };

      // Log successful request
      console.log(`[${timestamp}] Profile request processed - Cat Fact API: ${catFactResult.success ? 'Success' : 'Fallback'}`);

      res.status(200).json(response);
      
    } catch (error) {
      next(error);
    }
  }

module.exports = {
    getProfile
}