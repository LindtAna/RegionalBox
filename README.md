# RegionalBox - Full-Stack E-Commerce Platform

![RegionalBox](https://img.shields.io/badge/version-1.0.0-green.svg)
![React](https://img.shields.io/badge/React-19.2.0-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-20.x-green.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)

Eine Full-Stack E-Commerce-Plattform für die Lieferung regionaler Lebensmittel mit React, Node.js, Express, MongoDB und Stripe-Integration.

---

## Inhaltsverzeichnis

- [Über das Projekt](#über-das-projekt)
- [Features](#features)
- [Technologie-Stack](#technologie-stack)
- [Repository-Struktur](#repository-struktur)
- [Umgebungsvariablen](#umgebungsvariablen)
- [API-Dokumentation](#api-dokumentation)
- [Datenbank-Schema](#datenbank-schema)
- [Architektur](#architektur)
- [Sicherheit & Authentifizierung](#sicherheit--authentifizierung)
- [Deployment](#deployment)
- [UI-Design](#ui-design)
- [Roadmap](#roadmap)

---

##  Über das Projekt

**RegionalBox** ist eine moderne E-Commerce-Lösung, die es Benutzern ermöglicht, regionale Lebensmittel online zu bestellen. Die Plattform bietet:

-  Intuitive Produktsuche und Warenkorb-Verwaltung
-  Mehrere Zahlungsoptionen (Nachnahme & Stripe)
-  Benutzer-Authentifizierung mit JWT
-  Admin-Dashboard für Verkäufer
-  Vollständig responsives Design

**Live Demo:** [https://regional-box.vercel.app](https://regional-box.vercel.app)

---

##  Features

### Für Kunden

-  **Benutzerregistrierung & Login** - Sichere Authentifizierung mit JWT
-  **Produktkatalog** - Durchsuchen von Produkten nach Kategorien
-  **Suchfunktion** - Echtzeit-Produktsuche
-  **Mehrere Lieferadressen** - Speichern und Auswählen verschiedener Adressen
-  **Bestellhistorie** - Übersicht aller getätigten Bestellungen
-  **Zahlungsoptionen**:
  - Bargeld bei Lieferung (COD)
  - Online-Zahlung via Stripe

### Für Verkäufer

-  **Admin-Dashboard** - Übersichtliche Verwaltungsoberfläche
-  **Produktverwaltung** - Hinzufügen, Bearbeiten und Verwalten von Produkten
-  **Angebotsverwaltung** - Erstellen von Aktionsprodukten mit reduzierten Preisen
-  **Bild-Upload** - Integration mit Cloudinary
-  **Lagerverwaltung** - Produkte auf "In Stock" / "Out of Stock" setzen
-  **Highlight-Funktion** - Produkte auf der Homepage hervorheben
-  **Bestellungsübersicht** - Alle Bestellungen einsehen und verwalten
-  **Demo-Modus** - Verkäufer-Dashboard ohne Schreibrechte testen

### UI/UX

-  **Responsive Design** - Optimiert für Desktop, Tablet und Mobile
- **Video-Banner** - Ansprechender Hero-Bereich auf der Homepage
-  **Modern UI** - Gestaltet mit Tailwind CSS
- **Toast-Benachrichtigungen** - Echtzeit-Feedback für Benutzeraktionen
-  **Lazy Loading** - Optimierte Performance

---

## Technologie-Stack

### Frontend

| Technologie | Version | Verwendung |
|------------|---------|------------|
| React | 19.2.0 | UI-Framework |
| React Router DOM | 7.9.4 | Navigation & Routing |
| Tailwind CSS | 4.1.14 | Styling |
| Axios | 1.13.1 | HTTP-Client |
| React Hot Toast | 2.6.0 | Benachrichtigungen |
| Vite | 7.1.7 | Build-Tool & Dev-Server |

### Backend

| Technologie | Version | Verwendung |
|------------|---------|------------|
| Node.js | 20.x | Runtime-Umgebung |
| Express | 5.1.0 | Web-Framework |
| MongoDB | - | Datenbank |
| Mongoose | 8.19.2 | ODM für MongoDB |
| JWT | 9.0.2 | Authentifizierung |
| Bcrypt.js | 3.0.2 | Passwort-Hashing |
| Cloudinary | 2.8.0 | Bild-Hosting |
| Stripe | 19.1.0 | Zahlungsabwicklung |
| Multer | 2.0.2 | Datei-Uploads |

### DevOps

- **Hosting:** Vercel (Frontend & Backend)
- **Datenbank:** MongoDB Atlas
- **Bild-Storage:** Cloudinary
- **Zahlungen:** Stripe

---

##  Repository-Struktur
```
RegionalBox/
│
├── 📁 client/                       # Frontend React Application
│   ├── 📁 public/                   # Statische Assets
│   │   └── favicon.png
│   │
│   ├── 📁 src/
│   │   ├── 📁 assets/               # Bilder, Icons, Videos, Banner
│   │   │   ├── assets.js            # Asset-Exporte
│   │   │   ├── 📁 categories/       # Kategorie-Bilder & Listen
│   │   │   └── 📁 collections/      # Feature-Listen, Footer-Links
│   │   │
│   │   ├── 📁 components/           # Wiederverwendbare Komponenten
│   │   │   ├── 📁 seller/           # Verkäufer-spezifische Komponenten
│   │   │   │   └── SellerLogin.jsx
│   │   │   ├── Angebote.jsx         # Angebots-Highlights
│   │   │   ├── Categories.jsx       # Kategorien-Slider
│   │   │   ├── Features.jsx         # Service-Features
│   │   │   ├── Footer.jsx
│   │   │   ├── Hero.jsx             # Haupt-Banner
│   │   │   ├── Loading.jsx          # Ladebildschirm
│   │   │   ├── LoginForm.jsx        # Login/Registrierung
│   │   │   ├── NavBar.jsx
│   │   │   ├── NewsLetter.jsx       # Newsletter-Anmeldung
│   │   │   ├── ProdCardAction.jsx   # Angebots-Produktkarte
│   │   │   └── ProductCard.jsx      # Reguläre Produktkarte
│   │   │
│   │   ├── 📁 context/              # Global State Management
│   │   │   └── AppContext.jsx       # React Context
│   │   │
│   │   ├── 📁 pages/                # Seiten-Komponenten
│   │   │   ├── 📁 seller/           # Verkäufer-Dashboard
│   │   │   │   ├── ActionProductList.jsx
│   │   │   │   ├── AddProduct.jsx
│   │   │   │   ├── OrdersList.jsx
│   │   │   │   ├── ProductsList.jsx
│   │   │   │   └── SellerLayout.jsx
│   │   │   ├── ActionProductDetails.jsx
│   │   │   ├── AddAddress.jsx
│   │   │   ├── AllProducts.jsx
│   │   │   ├── Angebote.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── CategoryProducts.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Orders.jsx
│   │   │   └── ProductDetails.jsx
│   │   │
│   │   ├── App.jsx                  # Haupt-App-Komponente
│   │   ├── index.css                # Globale Styles
│   │   └── main.jsx                 # App-Einstiegspunkt
│   │
│   ├── .env                         # Umgebungsvariablen
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── vercel.json                  # Vercel-Konfiguration
│   └── vite.config.js
│
├── 📁 server/                       # Backend Node.js/Express
│   ├── 📁 configs/                  # Konfigurationsdateien
│   │   ├── cloudinary.js            # Cloudinary-Setup
│   │   ├── db.js                    # MongoDB-Verbindung
│   │   └── multer.js                # Multer-Konfiguration
│   │
│   ├── 📁 controllers/              # Business-Logik
│   │   ├── actionProductController.js
│   │   ├── cartController.js
│   │   ├── orderController.js
│   │   ├── productController.js
│   │   ├── sellerController.js
│   │   ├── userAddressController.js
│   │   └── userController.js
│   │
│   ├── 📁 middleware/               # Middleware-Funktionen
│   │   ├── authSeller.js            # Verkäufer-Auth
│   │   ├── authUser.js              # Benutzer-Auth
│   │   └── demoSeller.js            # Demo-Einschränkungen
│   │
│   ├── 📁 models/                   # Mongoose-Schemas
│   │   ├── Angebot.js               # Angebots-Produkt
│   │   ├── Order.js                 # Bestellung
│   │   ├── Product.js               # Produkt
│   │   ├── User.js                  # Benutzer
│   │   └── UserAddress.js           # Adresse
│   │
│   ├── 📁 routes/                   # API-Routen
│   │   ├── addressRouter.js
│   │   ├── angebotRouter.js
│   │   ├── cartRouter.js
│   │   ├── ordersRouter.js
│   │   ├── productRouter.js
│   │   ├── sellerRouter.js
│   │   └── userRouter.js
│   │
│   ├── .env                         # Umgebungsvariablen
│   ├── .gitignore
│   ├── package.json
│   ├── server.js                    # Server-Einstiegspunkt
│   └── vercel.json                  # Vercel-Konfiguration
│
└── README.md                        # Diese Datei
```

###  Verzeichnis-Beschreibungen

#### Frontend (`/client`)

| Verzeichnis | Beschreibung |
|------------|--------------|
| `/src/assets` | Statische Ressourcen (Bilder, Icons, Videos) |
| `/src/components` | Wiederverwendbare UI-Komponenten |
| `/src/context` | React Context für globalen State |
| `/src/pages` | Seiten-Level-Komponenten (Routes) |
| `/src/pages/seller` | Verkäufer-Dashboard-Seiten |

#### Backend (`/server`)

| Verzeichnis | Beschreibung |
|------------|--------------|
| `/configs` | Datenbank-, Cloudinary- und Multer-Konfig |
| `/controllers` | Geschäftslogik für API-Endpunkte |
| `/middleware` | Authentifizierung & Autorisierung |
| `/models` | MongoDB-Schemas (Mongoose) |
| `/routes` | Express-Routen-Definitionen |

---

##  Umgebungsvariablen

### Backend (`/server/.env`)
```env
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/regionalbox

# JWT Secret
JWT_SECRET=ihr_sehr_sehr_geheimes_jwt_secret_password_hier

# Cloudinary
CLOUDINARY_CLOUD_NAME=ihr_cloud_name
CLOUDINARY_API_KEY=ihr_api_key
CLOUDINARY_API_SECRET=ihr_api_secret

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Verkäufer-Credentials
SELLER_EMAIL=secretname@regionalbox.de
SELLER_PASSWORD=sellers_sicheres_admin_passwort
SELLER_DEMO_EMAIL=admin-demo@regionalbox.de
SELLER_DEMO_PASSWORD=demo_password_hier

# Server
PORT=4000
NODE_ENV=development
```

### Frontend (`/client/.env`)
```env
# Währung
VITE_CURRENCY=€

# Backend URL
VITE_BACKEND_URL=http://localhost:4000

# Für Produktion:
# VITE_BACKEND_URL=https://regional-box-backend.vercel.app
```
---

##  API-Dokumentation

### Base URL
- **Lokal:** `http://localhost:4000`
- **Produktion:** `https://regional-box-backend.vercel.app`

### Authentifizierung

Alle geschützten Routen erfordern ein JWT-Token in Cookies:
- **Benutzer:** `token` Cookie
- **Verkäufer:** `sellerToken` Cookie

---
### User Endpoints
#### Registrierung
```http
POST /api/user/register
Content-Type: application/json

{
  "name": "Erika Musterfrau",
  "email": "user@example.com",
  "password": "sicheres_passwort123"
}
```
**Response:**
```json
{
  "success": true,
  "user": {
    "email": "user@example.com",
    "name": "Erika Musterfrau"
  }
}
```
#### Login
```http
POST /api/user/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "sicheres_passwort123"
}
```

#### Auth-Status prüfen
```http
GET /api/user/is-auth
Cookie: token=jwt_token_here
```

**Response:**
```json
{
  "success": true,
  "user": {
    "_id": "...",
    "name": "Max Mustermann",
    "email": "max@example.com",
    "cartItems": {},
    "actionCartItems": {}
  }
}
```

#### Logout
```http
GET /api/user/logout
Cookie: token=jwt_token_here
```

---
###  Product Endpoints
#### Alle Produkte abrufen
```http
GET /api/product/list
```

**Response:**
```json
{
  "success": true,
  "products": [
    {
      "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
      "name": "Bio-Äpfel",
      "description": ["Frisch vom Bauernhof", "100% Bio"],
      "volume": "1kg",
      "price": 3.99,
      "image": ["https://cloudinary.com/..."],
      "category": "Obst",
      "inStock": true,
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

#### Produkt hinzufügen (Verkäufer)
```http
POST /api/product/add
Cookie: sellerToken=jwt_token_here
Content-Type: multipart/form-data

productData: {
  "name": "Bio-Tomaten",
  "description": ["Aus regionalem Anbau"],
  "volume": "500g",
  "price": 2.99,
  "category": "Gemüse"
}
images: [file1, file2]
```

#### Lagerstatus ändern (Verkäufer)
```http
PATCH /api/product/stock
Cookie: sellerToken=jwt_token_here
Content-Type: application/json

{
  "id": "65f1a2b3c4d5e6f7g8h9i0j1",
  "inStock": false
}
```

---
### Action Product Endpoints
#### Alle Angebote abrufen
```http
GET /api/action-product/list
```

#### Angebot hinzufügen (Verkäufer)
```http
POST /api/action-product/add
Cookie: sellerToken=jwt_token_here
Content-Type: multipart/form-data

actionProductData: {
  "name": "Bio-Erdbeeren",
  "price": 4.99,
  "offerPrice": 3.49,
  ...
}
images: [file1, file2]
```

#### Highlight-Status ändern (Verkäufer)
```http
PATCH /api/action-product/highlight
Cookie: sellerToken=jwt_token_here
Content-Type: application/json

{
  "id": "65f1a2b3c4d5e6f7g8h9i0j1",
  "highlight": true
}
```

---
###  Cart Endpoints
#### Warenkorb aktualisieren
```http
POST /api/cart/update
Cookie: token=jwt_token_here
Content-Type: application/json

{
  "cartItems": {
    "product_id_1": 2,
    "product_id_2": 1
  },
  "actionCartItems": {
    "action_product_id_1": 3
  }
}
```

---
###  Address Endpoints
#### Adresse hinzufügen
```http
POST /api/address/add
Cookie: token=jwt_token_here
Content-Type: application/json

{
  "firstName": "Erika",
  "lastName": "Musterfrau",
  "phone": "+49123456789",
  "street": "Hauptstraße 1",
  "postcode": "12345",
  "city": "Cologne",
  "country": "Deutschland"
}
```

#### Alle Adressen abrufen
```http
GET /api/address
Cookie: token=jwt_token_here
```

---

### Order Endpoints
#### Bestellung mit Zahlung an den Kurier
```http
POST /api/orders/cod
Cookie: token=jwt_token_here
Content-Type: application/json

{
  "userId": "user_id",
  "items": [
    { "product": "product_id", "quantity": 2 }
  ],
  "address": "address_id"
}
```

#### Bestellung mit Stripe
```http
POST /api/orders/stripe
Cookie: token=jwt_token_here
Content-Type: application/json

{
  "userId": "user_id",
  "items": [...],
  "address": "address_id"
}
```

**Response:**
```json
{
  "success": true,
  "url": "https://checkout.stripe.com/pay/..."
}
```

#### Benutzer-Bestellungen abrufen
```http
GET /api/orders/user?userId=user_id
Cookie: token=jwt_token_here
```

#### Alle Bestellungen (Verkäufer)
```http
GET /api/orders/seller
Cookie: sellerToken=jwt_token_here
```
---

###  Seller Endpoints
#### Verkäufer-Login
```http
POST /api/seller/login
Content-Type: application/json

{
  "email": "admin@regionalbox.de",
  "password": "admin_password"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Angemeldet",
  "isDemoSeller": false
}
```

#### Verkäufer-Auth prüfen
```http
GET /api/seller/is-auth
Cookie: sellerToken=jwt_token_here
```

#### Verkäufer-Logout
```http
GET /api/seller/logout
Cookie: sellerToken=jwt_token_here
```

---

## Datenbank-Schema

### User Collection
```javascript
{
  _id: ObjectId,
  name: String,              // Benutzername
  email: String,             // Unique Email
  password: String,          // Gehashtes Passwort (bcrypt)
  cartItems: {               // Reguläre Warenkorb-Artikel
    [productId]: Number      // Menge
  },
  actionCartItems: {         // Angebots-Warenkorb-Artikel
    [productId]: Number
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Product Collection
```javascript
{
  _id: ObjectId,
  name: String,              // Produktname
  description: [String],     // Array von Beschreibungen
  volume: String,            // z.B. "500ml", "1kg"
  price: Number,             // Preis in EUR
  image: [String],           // Array von Cloudinary URLs
  category: String,          // Kategorie (z.B. "Obst")
  inStock: Boolean,          // Verfügbarkeit
  createdAt: Date,
  updatedAt: Date
}
```

### Angebot Collection
Die Struktur ähnelt der von Produkt. Unterschiede:
```javascript
{  
  offerPrice: Number,        // Reduzierter Preis
  highlight: Boolean,        // Auf Homepage anzeigen
}
```

### UserAddress Collection
```javascript
{
  _id: ObjectId,
  userId: String,            // Referenz zu User._id
  firstName: String,
  lastName: String,
  phone: String,
  street: String,
  postcode: String,
  city: String,
  country: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Order Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,          // Ref: 'user'
  items: [{
    product: ObjectId,       // Ref: 'product'
    quantity: Number
  }],
  amount: Number,            // Gesamtbetrag
  address: ObjectId,         // Ref: 'address'
  status: String,            // 'Bestellung aufgegeben' | 'In Bearbeitung' | 'Abgeschlossen'
  paymentType: String,       // 'COD' | 'Online'
  isPaid: Boolean,           // Zahlungsstatus
  createdAt: Date,
  updatedAt: Date
}
```

---

##  Architektur

### System-Architektur
```
┌───────────────────────────────────────────────────────┐
│                   Frontend (React)                    │
│  ┌──────────┐  ┌────────────┐  ┌─────────────┐        │
│  │  Pages   │  │ Components │  │   Context   │        │
│  │          │  │            │  │  (Global    │        │
│  │ - Home   │  │ - NavBar   │  │   State)    │        │
│  │ - Cart   │  │ - Products │  │             │        │
│  │ - Orders │  │ - Footer   │  │ - User      │        │
│  │ - Seller │  │            │  │ - Cart      │        │
│  └──────────┘  └────────────┘  └─────────────┘        │
│                        │                              │
│                        ▼                              │
│                Axios HTTP Client                      │
└────────────────────────│──────────────────────────────┘
                         │
                         │ REST API Calls
                         │
┌────────────────────────▼──────────────────────────────┐
│               Backend (Express.js)                    │
│  ┌───────────┐     ┌───────────┐  ┌─────────────┐     │
│  │ Routes    │     │Controllers│  │ Middleware  │     │
│  │           │     │           │  │             │     │
│  │ - /user   │---> │ userCtrl  │  │- authUser   │     │
│  │ - /product│     │ - login   │  │- authSeller │     │
│  │ - /cart   │     │ - register│  │- demoSeller │     │
│  │ - /order  │     │ sellerCtrl│  │             │     │
│  │ - /seller │     │ - login   │  │             │     │
│  └───────────┘     └───────────┘  └─────────────┘     │
│                        │                              │
│                        ▼                              │
│                Mongoose Models                        │
└────────────────────────│──────────────────────────────┘
                         │
                         ▼
┌───────────────────────────────────────────────────────┐
│                MongoDB Database                       │
│                                                       │
│  Collections:                                         │
│  - users (Benutzer)                                   │
│  - products (Reguläre Produkte)                       │
│  - angebots (Angebots-Produkte)                       │
│  - addresses (Lieferadressen)                         │
│  - orders (Bestellungen)                              │
└───────────────────────────────────────────────────────┘

External Services:
┌─────────────┐    ┌─────────────┐
│ Cloudinary  │    │   Stripe    │
│  (Bilder)   │    │ (Zahlung)   │
└─────────────┘    └─────────────┘
```

### Request-Flow

1. **Benutzer-Aktion** → Frontend sendet HTTP-Request über Axios
2. **Express-Router** → Leitet Request an entsprechenden Controller
3. **Middleware** → Authentifizierung/Autorisierung prüfen
4. **Controller** → Geschäftslogik ausführen
5. **Model** → Datenbankoperationen über Mongoose
6. **Response** → JSON-Response zurück an Frontend
7. **State-Update** → React Context aktualisiert globalen State
8. **UI-Update** → Komponenten re-rendern mit neuen Daten

---

##  Sicherheit & Authentifizierung

### JWT-Token-Strategie

#### Benutzer-Authentifizierung
- Token wird bei Login/Registrierung erstellt
- Gespeichert als **HttpOnly-Cookie** (`token`)
- **Gültigkeitsdauer:** 7 Tage
- Middleware `authUser` prüft Token bei geschützten Routen

#### Verkäufer-Authentifizierung
- **Zwei Modi:**
  - **Vollzugriff:** Admin-Credentials
  - **Demo-Zugriff:** Eingeschränkte Rechte (nur Lesezugriff)
- Token gespeichert als `sellerToken`
- Middleware `authSeller` prüft Verkäufer-Status
- Middleware `demoSeller` verhindert Änderungen im Demo-Modus

### Passwort-Sicherheit
```javascript
// Passwort-Hashing mit bcrypt
const hashedPassword = await bcrypt.hash(password, 10);

// Passwort-Vergleich
if (!user || !(await bcrypt.compare(password, user.password))) {
return res.status(401).json({ success: false, message: "Ungültige Anmeldedaten" });}
```

### Cross-Origin Cookie Configuration
```javascript
{
  httpOnly: true,              // Schutz vor XSS
  secure: NODE_ENV === "production",  // HTTPS-only in Produktion
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // CORS-Kompatibilität
  maxAge: 7 * 24 * 60 * 60 * 1000  // 7 Tage
}

{
  app.use(cors({
  origin: ['http://localhost:5173', 'https://regional-box.vercel.app'],
  credentials: true}));
}

{
  axios.defaults.withCredentials = true;
}

```

### Sicherheits-Features

-  **XSS-Schutz** durch HttpOnly-Cookies
-  **SQL/NoSQL-Injection-Schutz** durch Mongoose
-  **CORS** nur für bekannte Origins
-  **Input-Validierung** mit validator.js
-  **Rate-Limiting** für API-Endpunkte (TODO)
-  **Passwort-Hashing** mit bcrypt (10 Salt-Rounds)

---

## Deployment

### Frontend (Vercel)

**Vercel-Konfiguration** (`client/vercel.json`):
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

**Umgebungsvariablen in Vercel:**
- `VITE_BACKEND_URL`
- `VITE_CURRENCY`

### Backend (Vercel)

**Vercel-Konfiguration** (`server/vercel.json`):
```json
{
  "version": 2,
  "builds": [
    { "src": "server.js", "use": "@vercel/node" }
  ],
  "routes": [
    { "src": "/(.*)", "dest": "server.js" }
  ]
}
```

**Umgebungsvariablen in Vercel:**
Alle Variablen aus `server/.env` über Vercel Dashboard → Settings → Environment Variables eintragen.

### MongoDB Atlas

1. Cluster erstellen
2. Database User anlegen
3. Network Access konfigurieren (IP-Whitelist: `0.0.0.0/0` für Vercel)
4. Connection String kopieren und in `MONGODB_URI` einfügen

### Cloudinary

1. Account erstellen auf [cloudinary.com](https://cloudinary.com)
2. Cloud Name, API Key und API Secret notieren
3. In Backend `.env` eintragen

### Stripe

1. Account erstellen auf [stripe.com](https://stripe.com)
2. API Keys (Test & Live) abrufen
3. Webhook-Endpunkt konfigurieren: `https://your-backend.vercel.app/stripe`
4. Webhook-Secret notieren

---

## UI-Design

Die Benutzeroberfläche ist **responsiv** und **modular** aufgebaut.

### Design in Figma

Das UI-Design wurde im Verlauf der Entwicklung von mir angepasst und weiterentwickelt, um eine bessere visuelle Darstellung und Nutzererlebnis zu erzielen.

Das UI-Design basiert auf dem folgenden Figma-Template:  
[GreenCart](https://www.figma.com/design/0JYbBdbL7eIoS0GSeMs6iZ/Green-Cart-Haven-Website-Landing-Page-Design--Community-?node-id=37-292&t=HakwDcIXtFGbxfNS-0)

- **Icons & Bilder:** Cloudinary
- **UI-Framework:** Tailwind CSS
---

##  Roadmap
### Geplante Features

- **Newsletter-Backend** - E-Mail-Versand implementieren
- **Favoriten** - Wunschliste für Benutzer
- **Advanced Search** - Filter nach Preis, Kategorie, etc.
- **Benachrichtigungen** - E-Mail-Bestätigungen für Bestellungen
- **Rabatt-Codes** - Gutschein-System
