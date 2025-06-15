const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const PORT = 3000;
const USERS_FILE = "./users.json";

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Load users from file
let users = [];
if (fs.existsSync(USERS_FILE)) {
  users = JSON.parse(fs.readFileSync(USERS_FILE));
}

// Save users to file
function saveUsersToFile() {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// ----------- USERS API -----------

app.post('/api/users/register', (req, res) => {
  const { firstName, lastName, email, password, userType } = req.body;
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).send({ message: "User already exists" });
  }
  const newUser = {
    userId: users.length + 1,
    firstName,
    lastName,
    email,
    password,
    userType: userType || "Client"
  };
  users.push(newUser);
  saveUsersToFile();
  res.status(201).send({ message: "Registration successful", user: newUser });
});

app.post('/api/users/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    const { password, ...userWithoutPassword } = user;
    res.send({ message: "Login success", user: userWithoutPassword });
  } else {
    res.status(401).send({ message: "Invalid email or password" });
  }
});

app.get('/api/users/profile/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.userId === userId);
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }
  const { password, ...profile } = user;
  res.send(profile);
});

app.put('/api/users/update/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const index = users.findIndex(u => u.userId === userId);
  if (index === -1) {
    return res.status(404).send({ message: "User not found" });
  }
  users[index] = { ...users[index], ...req.body };
  saveUsersToFile();
  res.send({ message: "Profile updated", user: users[index] });
});

// ----------- PRODUCTS API -----------

const products = [
  {
    productID: "REFetyeAZER",
    productTitle: "Tablette SAM 12 Pouce",
    productImage: "assets/images/tab.png",
    category: "tablet",
    productPrice: "2334 DH",
    productQuantity: 20,
  },
  {
    productID: "SQhetgEE",
    productTitle: "Airpods Pro",
    productImage: "assets/images/blackairpods.png",
    category: "audio",
    productPrice: "1500 DH",
    productQuantity: 210,
  },
  {
    productID: "SQhetggEE",
    productTitle: "Airpods Pro",
    productImage: "assets/images/white airpods.jpg",
    category: "audio",
    productPrice: "1345 DH",
    productQuantity: 170,
  },
  {
    productID: "hetgZEE",
    productTitle: "Airpods Pro",
    productImage: "assets/images/blue_airpods.png",
    category: "audio",
    productPrice: "1500 DH",
    productQuantity: 210,
  },
  {
    productID: "SQhe",
    productTitle: "XBOX Series X",
    productImage: "assets/images/SERIES-X.png",
    category: "GAMING",
    productPrice: "6500 DH",
    productQuantity: 90,
  },
  {
    productID: "xbxons",
    productTitle: "XBOX ONE S",
    productImage: "assets/images/Xbox-one-s.png",
    category: "GAMING",
    productPrice: "1500 DH",
    productQuantity: 134,
  },
  { 
    productID: "PS",
    productTitle: "PS5",
    productImage: "assets/images/ps5.png",
    category: "GAMING",
    productPrice: "7500DH",
    productQuantity: 110,
  },
  {
    productID: "EFRetyeRR",
    productTitle: "IPhone 14",
    productImage: "assets/images/iphone.png",
    category: "phone",
    productPrice: "11000 DH",
    productQuantity: 5,
  },
  {
    productID: "REFhyuyuAZER",
    productTitle: "Tablette SAM 12 Pouce",
    productImage: "assets/images/tab.png",
    category: "tablet",
    productPrice: "2334 DH",
    productQuantity: 0,
  },
  {
    productID: "SQhetgZEE",
    productTitle: "Smart TV 48 Pouce",
    productImage: "assets/images/tv.png",
    category: "smarttv",
    productPrice: "8000 DH",
    productQuantity: 15,
  },
  {
    productID: "RTVhetVV",
    productTitle: "IPhone 14",
    productImage: "assets/images/iphone.png",
    category: "phone",
    productPrice: "11000 DH",
    productQuantity: 2,
  },
  {
    productID: "SQZerEE",
    productTitle: "Smart TV 48 Pouce",
    productImage: "assets/images/tv.png",
    category: "smarttv",
    productPrice: "8000 DH",
    productQuantity: 0,
  },
  {
    productID: "REFsAZER",
    productTitle: "Tablette SAM 12 Pouce",
    productImage: "assets/images/tab.png",
    category: "tablet",
    productPrice: "2334 DH",
    productQuantity: 8,
  },
  {
    productID: "SQZhetEE",
    productTitle: "Smart TV 48 Pouce",
    productImage: "assets/images/tv.png",
    category: "smarttv",
    productPrice: "8000 DH",
    productQuantity: 3,
  },
  {
    productID: "REFAZfrER",
    productTitle: "Tablette SAM 12 Pouce",
    productImage: "assets/images/tab.png",
    category: "tablet",
    productPrice: "2334 DH",
    productQuantity: 11,
  }
];

// Process products with offers
const productsWithOffers = products.map(product => {
  const quantity = product.productQuantity;
  const price = parseInt(product.productPrice.replace(/\D/g, '')) || 0;
  
  if (quantity < 10 && quantity > 0) {
    const discountPercent = 60;
    const discountedPrice = Math.round(price * (1 - discountPercent / 100));
    return {
      ...product,
      hasOffer: true,
      discountPercent,
      originalPrice: price + ' DH',
      productPrice: discountedPrice + ' DH',
    };
  }
  return { 
    ...product,
    hasOffer: false,
    productPrice: price + ' DH'
  };
});

// Products endpoints
app.get("/api/products", (req, res) => {
  const { category, search } = req.query;
  let result = productsWithOffers;
  
  if (category) {
    result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }
  
  if (search) {
    const searchTerm = search.toLowerCase();
    result = result.filter(p => 
      p.productTitle.toLowerCase().includes(searchTerm) ||
      p.category.toLowerCase().includes(searchTerm)
    );
  }
  
  res.send(result);
});

app.get("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const product = productsWithOffers.find(p => p.productID === id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product not found" });
  }
});

app.get("/api/categories", (req, res) => {
  const categories = [...new Set(products.map(p => p.category))];
  res.send(categories);
});

// ----------- CART API -----------

let cart = [];

app.post("/api/cart", (req, res) => {
  cart = req.body;
  res.status(201).send({ message: "Cart updated" });
});

app.get("/api/cart", (req, res) => {
  res.send(cart);
});

// ----------- SERVE STATIC FILES -----------

const locales = ['fr-CA', 'en-US'];
locales.forEach((locale) => {
  const localePath = path.join(__dirname, 'dist/angulartp/browser', locale);
  app.use(`/${locale}`, express.static(localePath));
  app.get(`/${locale}/*`, (req, res) => {
    res.sendFile(path.join(localePath, 'index.html'));
  });
});

app.get('/', (req, res) => {
  res.redirect('/fr-CA');
});

// ----------- START SERVER -----------

app.listen(PORT, () => {
  console.log(`🌍 Server running on port ${PORT}`);
  console.log(`➡️  http://localhost:${PORT}/fr-CA`);
  console.log(`➡️  http://localhost:${PORT}/en-US`);
});