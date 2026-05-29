const axios = require("axios");

module.exports.getCoordinates = async (locationText) => {
    const geo = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
            params: {
                q: locationText,
                format: "json",
                limit: 1
            },
            headers: {
                "User-Agent": "AirbnbProject/1.0"
            }
        }
    );

    if (!geo.data.length) return null;

    const place = geo.data[0];

    return {
        type: "Point",
        coordinates: [
            parseFloat(place.lon),
            parseFloat(place.lat)
        ]
    };
};