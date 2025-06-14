const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const path = require('path');

const PORT = 3000;
const app = express();
app.use(bodyParser.json());
app.use(cors());
//users
let users = [
  {
    userId: 1,
    firstName: "Alice",
    lastName: "Smith",
    email: "alice@mail.com",
    password: "alice123", // ⚠️ mot de passe en clair juste pour l'exemple
    userType: "Admin",
  },
  {
    userId: 2,
    firstName: "Bob",
    lastName: "Johnson",
    email: "bob@mail.com",
    password: "bob123",
    userType: "Membre",
  },
  {
    userId: 3,
    firstName: "Charlie",
    lastName: "Brown",
    email: "charlie@mail.com",
    password: "charlie123",
    userType: "Guest",
  },
];
//simulator login
app.post('/api/users/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (user) {
    const { password, ...userWithoutPassword } = user;
    res.send({ message: "Login success", user: userWithoutPassword });
  } else {
    res.status(401).send({ message: "Email ou mot de passe incorrect" });
  }
});


let cart = [];

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
  },
];

// GET all products
app.get("/api/products", (req, res) => {
  res.send(products);
});

// GET a single product by ID
app.get("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const matchedProducts = products.filter(p => p.productID === id);

  if (matchedProducts.length > 0) {
    res.send(matchedProducts);
  } else {
    res.status(404).send({ message: "Product not found" });
  }
});

// POST to cart (replace the entire cart)
app.post("/api/cart", (req, res) => {
  cart = req.body;
  setTimeout(() => res.status(201).send(), 20);
});

// GET current cart
app.get("/api/cart", (req, res) => {
  res.send(cart);
});



// List of supported locales
const locales = ['fr-CA', 'en-US'];

// Serve static files and handle Angular routing
locales.forEach((locale) => {
  const localePath = path.join(__dirname, 'dist/angulartp/browser', locale);

  // Serve static assets
  app.use(`/${locale}`, express.static(localePath));

  // Angular routing fallback
  app.get(`/${locale}/*`, (req, res) => {
    res.sendFile(path.join(localePath, 'index.html'));
  });
});

// Optional: redirect root to a default language
app.get('/', (req, res) => {
  res.redirect('/fr-CA');
});

app.listen(PORT, () => {
  console.log(`🌍 App localisée disponible sur :`);
  console.log(`➡️  http://localhost:${PORT}/fr-CA`);
  console.log(`➡️  http://localhost:${PORT}/en-US`);
});