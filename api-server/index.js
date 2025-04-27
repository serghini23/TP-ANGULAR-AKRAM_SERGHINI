const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

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

// Start server
const port = 3000;
app.listen(port, () => console.log(`API Server listening on port ${port}`));
