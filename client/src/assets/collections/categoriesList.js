// Liste der Produktkategorien in Section Categories.jsx (Kategorien)
//der Inhalt der Karten und die Hintergrundfarbe
//Der Rahmen(border) der Karten → Categories.jsx

import vegetable_image from "../vegetables_image.png";
import fruits_image from "../fruits_image.png";
import bottles_image from "../bottles_image.png";
import instant_food_image from "../instant_food.png";
import dairy_product_image from "../dairy_product_image.png";
import bakery_image from "../bakery_image.png";
import grain_image from "../grain_image.png";


export const categories = [
  {
    text: "Gemüse",
    path: "Vegetables",
    image: vegetable_image,
    bgColor: "#ACDF87"
  },
  {
    text: "Obst",
    path: "Fruits",
    image: fruits_image,
    bgColor: "#adf55d"
  },
  {
    text: "Alkoholfreie Getränke",
    path: "Drinks",
    image: bottles_image,
    bgColor: "#42D911"
  },
  {
    text: "Instantgerichte",
    path: "Instant",
    image: instant_food_image,
    bgColor: "#76BA1B"
  },
  {
    text: "Kühlregal",
    path: "Dairy",
    image: dairy_product_image,
    bgColor: "#68BB59"
  },
  {
    text: "Brot & Gebäck",
    path: "Bakery",
    image: bakery_image,
    bgColor: "#4C9A2A"
  },
  {
    text: "Cerealien & Getreide",
    path: "Grains",
    image: grain_image,
    bgColor: "#0da156",
    borderColor: "#1b6b45"
  },
];