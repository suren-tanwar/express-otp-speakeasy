// controllers/secureController.js
const secureResource = (req, res) => {
    res.json({ message: 'You have access to this secure resource' });
  };
  
  module.exports = {
    secureResource,
  };
 

