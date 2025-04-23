const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let cart = [];

app.get("/api/products", (req, res) => {
  let products = [
    {
      productID: "REFAZER",
      productTitle: "Tablette SAM 12 Pouce",
      productImage: "samsung-tab-12.png",
      category: "tablet",
      prouctPrice: "2334 DH",
    },
    {
      productID: "EFRRR",
      productTitle: "IPhone 14",
      productImage: "iphone-14.png",
      category: "phone",
      prouctPrice: "11000 DH",
    },
    {
      productID: "REFAZER",
      productTitle: "Tablette SAM 12 Pouce",
      productImage: "samsung-tab-12.png",
      category: "tablet",
      prouctPrice: "2334 DH",
    },
    {
      productID: "SQZEE",
      productTitle: "Smart TV 48 Pouce",
      productImage: "tv-samsung-48.png",
      category: "smarttv",
      prouctPrice: "8000 DH",
    },
    {
      productID: "RTVVV",
      productTitle: "IPhone 14",
      productImage: "iphone-14.png",
      category: "phone",
      prouctPrice: "11000 DH",
    },
    {
      productID: "SQZEE",
      productTitle: "Smart TV 48 Pouce",
      productImage: "tv-samsung-48.png",
      category: "smarttv",
      prouctPrice: "8000 DH"
    },
    {
      productID: "REFAZER",
      productTitle: "Tablette SAM 12 Pouce",
      productImage: "samsung-tab-12.png",
      category: "tablet",
      prouctPrice: "2334 DH",
    },
    {
      productID: "SQZEE",
      productTitle: "Smart TV 48 Pouce",
      productImage: "tv-samsung-48.png",
      category: "smarttv",
      prouctPrice: "8000 DH"
    },

    {
      productID: "REFAZER",
      productTitle: "Tablette SAM 12 Pouce",
      productImage: "samsung-tab-12.png",
      category: "tablet",
      prouctPrice: "2334 DH",
    },
  ];
  res.send(products);
});

app.post("/api/cart", (req, res) => {
  cart = req.body;
  setTimeout(() => res.status(201).send(), 20);
});

app.get("/api/cart", (req, res) => res.send(cart));

const port = 3000;

app.listen(port, () => console.log(`API Server listening on port ${port}`));


