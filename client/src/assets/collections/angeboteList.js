// Liste der Produkte, die an Aktionen oder Rabatten teilnehmen


import blaubeersaft_image from "../blaubeersaft_image.png";
import koelln_cereals_image from "../koelln_cereals_image.png";
import lindor_pistazien_image from "../lindor_pistazien_image.png";
import oatly_haferdrink_1_5F_1L_image from "../oatly_haferdrink_1_5_Fett_Liter_image.png";
import chinkali_hackfleischfüllung_image from "../chinkali_hackfleischfüllung_image.png";
import mozzarella_galbani_image from "../mozzarella_galbani_image.png";

export const assetsAngebote = {
  blaubeersaft_image,
  koelln_cereals_image,
  oatly_haferdrink_1_5F_1L_image,
  lindor_pistazien_image,
  chinkali_hackfleischfüllung_image,
  mozzarella_galbani_image
};

export const angebote = [  
  {
    _id: "1234qwert", 
    name: "Waldheidelbeersaft",
    volume: "0,7L",
    category: "Alkoholfreie Getränke",
    price: 7.99,
    offerPrice: 5.99,
    image: [blaubeersaft_image],
    description: [
      "100% Bio Heidelbeersaft",
      "Muttersaft aus wilden Waldheidelbeeren",
      "EU-Öko zertifiziert",
      "Kalt gepresst, abgefüllt unter Vakuum, pasteurisiert",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
  {
    _id: "gd48asdf",
    name: "Kölln Cereals Cinna Snax",
    volume: "375g",
    category: "Cerealien & Getreide",
    price: 3.79,
    offerPrice: 2.69,
    image: [koelln_cereals_image],
    description: [
      "Vollgepackt mit echtem Zimtgeschmack",
      "Ohne künstliche Aromen",
      "Die perfekte Wahl für ein ausgewogenes Frühstück",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
  {
    _id: "gd49lindt",
    name: "Lindt Lindor Kugeln Pistazie",
    volume: "137g",
    category: "Süßes",
    price: 7.99,
    offerPrice: 6.59,
    image: [lindor_pistazien_image],
    description: [
      "Köstliche Kreation aus dem Hause der Schweizer Maîtres Chocolatiers",
      "Feinste Vollmilchschokolade",
      "Süße und salzige Noten",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
  {
    _id: "gd50oatl",
    name: "Oatly Haferdrink",
    volume: "1L",
    category: "Kühlregal",
    price: 2.95,
    offerPrice: 1.69,
    image: [oatly_haferdrink_1_5F_1L_image],
    description: [
      "Der beste Haferdrink für Kaffeekenner*innen",
      "Reich an ungesättigten Fettsäuren",
      "Nach dem Öffnen gekühlt aufbewahren",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
  {
    _id: "gd50fhh",
    name: "Teigtaschen 'Chinkali' mit Hackfleischfüllung",
    volume: "900g",
    category: "Instantgerichte",
    price: 11.95,
    offerPrice: 10.95,
    image: [chinkali_hackfleischfüllung_image],
    description: [
      "Nach georgischer Art",
      "Füllung 45% (Schweinefleisch (70%)"
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
  {
    _id: "gd50mozz",
    name: "Galbani Mozzarella ",
    volume: "125g",
    category: "Kühlregal",
    price: 1.59,
    offerPrice: 1.05,
    image: [mozzarella_galbani_image],
    description: [
      "Mozzarella aus pasteurisierter Kuhmilch",
      "Mindestens 43% Fett "
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
    {
      _id: "1234qwert", 
      name: "Waldheidelbeersaft",
      volume: "0,7L",
      category: "Alkoholfreie Getränke",
      price: 7.99,
      offerPrice: 5.99,
      image: [blaubeersaft_image],
      description: [
        "100% Bio Heidelbeersaft",
        "Muttersaft aus wilden Waldheidelbeeren",
        "EU-Öko zertifiziert",
        "Kalt gepresst, abgefüllt unter Vakuum, pasteurisiert",
      ],
      createdAt: "2025-03-25T07:17:46.018Z",
      updatedAt: "2025-03-25T07:18:13.103Z",
      inStock: true,
    },
];
