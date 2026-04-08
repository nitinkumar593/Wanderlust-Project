const sampleListings = [
  {
    title: "Luxury Beach Villa",
    description: "Beautiful villa near the beach with private pool.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
    },
    price: 3500,
    location: "Goa",
    country: "India",
  },
  {
    title: "Mountain View Cabin",
    description: "Cozy cabin with stunning mountain views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    },
    price: 2000,
    location: "Manali",
    country: "India",
  },
  {
    title: "Lake Side Cottage",
    description: "Relaxing stay near the lake.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
    },
    price: 1800,
    location: "Nainital",
    country: "India",
  },
  {
    title: "Royal Heritage Haveli",
    description: "Experience royal lifestyle in Rajasthan.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1564501049412-61c2a3083791",
    },
    price: 4000,
    location: "Jaipur",
    country: "India",
  },
  {
    title: "Backwater Villa",
    description: "Peaceful villa near Kerala backwaters.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    },
    price: 3200,
    location: "Alleppey",
    country: "India",
  },
  {
    title: "Modern City Apartment",
    description: "Stylish apartment in city center.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
    },
    price: 2500,
    location: "Mumbai",
    country: "India",
  },
  {
    title: "Hilltop Retreat",
    description: "Stay surrounded by tea gardens.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    },
    price: 2200,
    location: "Munnar",
    country: "India",
  },
  {
    title: "Desert Camp",
    description: "Luxury desert experience.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    },
    price: 2700,
    location: "Jaisalmer",
    country: "India",
  },
  {
    title: "Beach Hut",
    description: "Simple hut near beach.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1493558103817-58b2924bce98",
    },
    price: 1200,
    location: "Gokarna",
    country: "India",
  },
  {
    title: "Luxury Penthouse",
    description: "Top floor luxury stay.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
    },
    price: 5000,
    location: "Delhi",
    country: "India",
  },

  {
    title: "Forest Treehouse",
    description: "Treehouse in dense forest.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
    },
    price: 2100,
    location: "Wayanad",
    country: "India",
  },
  {
    title: "Snow Chalet",
    description: "Stay with snow views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66",
    },
    price: 2600,
    location: "Shimla",
    country: "India",
  },
  {
    title: "Riverfront Stay",
    description: "Stay beside flowing river.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    },
    price: 1900,
    location: "Rishikesh",
    country: "India",
  },
  {
    title: "Tea Estate Bungalow",
    description: "Bungalow in tea gardens.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
    },
    price: 2800,
    location: "Darjeeling",
    country: "India",
  },
  {
    title: "Cliffside Villa",
    description: "Villa with cliff view.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    },
    price: 3600,
    location: "Varkala",
    country: "India",
  },

  {
    title: "Island Resort Stay",
    description: "Relaxing island vibes.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    },
    price: 4200,
    location: "Andaman",
    country: "India",
  },
  {
    title: "Heritage Fort Stay",
    description: "Stay in historic fort.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da",
    },
    price: 4500,
    location: "Jodhpur",
    country: "India",
  },
  {
    title: "Eco Farm Stay",
    description: "Organic farm experience.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
    },
    price: 1700,
    location: "Pune",
    country: "India",
  },
  {
    title: "City Studio Flat",
    description: "Compact modern living.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1493666438817-866a91353ca9",
    },
    price: 1400,
    location: "Bangalore",
    country: "India",
  },
  {
    title: "Luxury Houseboat",
    description: "Stay on water.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    },
    price: 3800,
    location: "Kerala",
    country: "India",
  },

  {
    title: "Hill Cottage",
    description: "Cozy hill cottage.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1505691723518-36a5ac3b2d4d",
    },
    price: 2000,
    location: "Mussoorie",
    country: "India",
  },
  {
    title: "Luxury Resort Room",
    description: "5-star resort stay.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    },
    price: 5500,
    location: "Udaipur",
    country: "India",
  },
  {
    title: "Village Homestay",
    description: "Traditional rural experience.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1523217582562-09d0def993a6",
    },
    price: 1100,
    location: "Punjab",
    country: "India",
  },
  {
    title: "Luxury Jungle Lodge",
    description: "Stay inside jungle.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    },
    price: 3300,
    location: "Jim Corbett",
    country: "India",
  },
  {
    title: "Beach Resort Room",
    description: "Sea facing room.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
    },
    price: 2900,
    location: "Pondicherry",
    country: "India",
  },

  {
    title: "Luxury Glass House",
    description: "Modern glass architecture stay.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    },
    price: 4100,
    location: "Hyderabad",
    country: "India",
  },
  {
    title: "Hill View Apartment",
    description: "Apartment with scenic hills.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1494526585095-c41746248156",
    },
    price: 2300,
    location: "Dehradun",
    country: "India",
  },
  {
    title: "Temple City Stay",
    description: "Stay near temples.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
    },
    price: 1600,
    location: "Varanasi",
    country: "India",
  },
  {
    title: "Luxury Palace Stay",
    description: "Live like a king.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
    },
    price: 6000,
    location: "Udaipur",
    country: "India",
  },
  {
    title: "Budget Hostel Room",
    description: "Affordable stay option.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5",
    },
    price: 800,
    location: "Delhi",
    country: "India",
  },
];

module.exports = { data: sampleListings };