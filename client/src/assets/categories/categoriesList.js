// Liste der Produktkategorien in Section Categories.jsx (Kategorien)
//der Inhalt der Karten und die Hintergrundfarbe
//Der Rahmen(border) der Karten → Categories.jsx

import vegetable_image from "./vegetables_image.png";
import fruits_image from "./fruits_image.png";
import bottles_image from "./bottles_image.png";
import instant_food_image from "./instant_food.png";
import dairy_product_image from "./dairy_product_image.png";
import bakery_image from "./bakery_image.png";
import grain_image from "./grain_image.png";
import fisch_fleisch_image from "./fisch_fleisch_image.png";
import alkohol_image from "./alkohol_image.png";
import snacks_image from "./snacks_image.png";
import tiefkuehlprodukte_image from "./tiefkuehlprodukte_image.png";

export const categories = [
  {
    text: "Gemüse",
    path: "Gemüse",
    image: vegetable_image,
    bgColor: "#ACDF87"
  },
  {
    text: "Obst",
    path: "Obst",
    image: fruits_image,
    bgColor: "#adf55d"
  },
  {
    text: "Alkoholfreie Getränke",
    path: "Getränke",
    image: bottles_image,
    bgColor: "#42D911"
  },
  {
    text: "Instantgerichte",
    path: "Instantgerichte",
    image: instant_food_image,
    bgColor: "#76BA1B"
  },
  {
    text: "Kühlregal",
    path: "Kühlregal",
    image: dairy_product_image,
    bgColor: "#68BB59"
  },
  {
    text: "Brot & Gebäck",
    path: "Gebäck",
    image: bakery_image,
    bgColor: "#4C9A2A"
  },
  {
    text: "Cerealien & Getreide",
    path: "Getreide",
    image: grain_image,
    bgColor: "#0da156",
    borderColor: "#1b6b45"
  },
   {
    text: "Süßes",
    path: "Süßes",
    image: vegetable_image,
    bgColor: "#ACDF87"
  },
  {
    text: "Fisch & Fleisch ",
    path: "Fisch&Fleisch",
    image: fisch_fleisch_image,
    bgColor: "#adf55d"
  },
  {
    text: "Tiefkühlprodukte",
    path: "Tiefkühlprodukte",
    image: tiefkuehlprodukte_image,
    bgColor: "#42D911"
  },
  {
    text: "Champagner, Sekt & Wein",
    path: "Alkohol",
    image: alkohol_image,
    bgColor: "#76BA1B"
  },
  {
    text: "Snacks",
    path: "Snacks",
    image: snacks_image,
    bgColor: "#68BB59"
  },
];