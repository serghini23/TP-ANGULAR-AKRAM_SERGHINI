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

// Charger les utilisateurs depuis le fichier
let users = [];
if (fs.existsSync(USERS_FILE)) {
  users = JSON.parse(fs.readFileSync(USERS_FILE));
}

// Fonction pour sauvegarder les utilisateurs
function saveUsersToFile() {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// ----------- USERS API -----------

app.post('/api/users/register', (req, res) => {
  const { firstName, lastName, email, password, userType } = req.body;
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).send({ message: "L'utilisateur existe déjà." });
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
  res.status(201).send({ message: "Inscription réussie", user: newUser });
});

app.post('/api/users/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    const { password, ...userWithoutPassword } = user;
    res.send({ message: "Login success", user: userWithoutPassword });
  } else {
    res.status(401).send({ message: "Email ou mot de passe incorrect" });
  }
});

app.get('/api/users/profile/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.userId === userId);
  if (!user) {
    return res.status(404).send({ message: "Utilisateur introuvable" });
  }
  const { password, ...profile } = user;
  res.send(profile);
});

app.put('/api/users/update/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const index = users.findIndex(u => u.userId === userId);
  if (index === -1) {
    return res.status(404).send({ message: "Utilisateur introuvable" });
  }
  users[index] = { ...users[index], ...req.body };
  saveUsersToFile();
  res.send({ message: "Profil mis à jour", user: users[index] });
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

app.get("/api/products", (req, res) => {
  res.send(products);
});

app.get("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const matchedProducts = products.filter(p => p.productID === id);
  if (matchedProducts.length > 0) {
    res.send(matchedProducts);
  } else {
    res.status(404).send({ message: "Product not found" });
  }
});

// ----------- CART API -----------

let cart = [];

app.post("/api/cart", (req, res) => {
  cart = req.body;
  setTimeout(() => res.status(201).send(), 20);
});

app.get("/api/cart", (req, res) => {
  res.send(cart);
});

// ----------- LOCALIZATION -----------

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
  console.log(`🌍 App localisée disponible sur :`);
  console.log(`➡️  http://localhost:${PORT}/fr-CA`);
  console.log(`➡️  http://localhost:${PORT}/en-US`);
});
