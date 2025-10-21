import logo from "./logo.png";
import search_icon from "./search_icon.svg";
import remove_icon from "./remove_icon.svg";
import arrow_right_icon_colored from "./arrow_right_icon_colored.svg";
import cart_icon from "./cart_icon.svg";
import cart_icon_s from "./cart_icon_s.svg";
import add_icon from "./add_icon.svg";
import refresh_icon from "./refresh_icon.svg";
import product_list_icon from "./product_list_icon.svg";
import order_icon from "./order_icon.svg";
import upload_area from "./upload_area.png";
import profile_icon from "./profile_icon.png";
import menu_icon from "./menu_icon.svg";
import box_icon from "./box_icon.svg";
import black_arrow_icon from "./black_arrow_icon.svg";
import white_arrow_icon from "./white_arrow_icon.svg";
import plus_icon from "./plus_icon.svg";
import arrow_left_icon from "./arrow-left-circle_icon.svg";
import arrow_right_icon from "./arrow-right-circle_icon.svg";
import deals_icon from "./deals.svg";
import arrow_down_icon from "./arrow-down-icon.svg";


import main_banner_bg from "./main_banner_bg.png";
import main_banner_bg_sm from "./main_banner_bg_sm.png";
import bottom_banner_image from "./bottom_banner_image.png";
import bottom_banner_image_sm from "./bottom_banner_image_sm.png";
import add_address_iamge from "./add_address_image.svg";
import maggi_oats_image from "./maggi_oats_image.png";
import taschki_pelmeni_image from "./pelmeni.png";
import blaubeersaft_image from "./blaubeersaft_image.png";


export const assets = {
  logo,
  search_icon,
  remove_icon,
  arrow_right_icon_colored,
  cart_icon,
  cart_icon_s,
  add_icon,
  refresh_icon,
  product_list_icon,
  order_icon,
  upload_area,
  profile_icon,
  menu_icon,
  black_arrow_icon,
  white_arrow_icon,
  arrow_left_icon,
  arrow_right_icon,
  deals_icon,

  main_banner_bg,
  main_banner_bg_sm,
  bottom_banner_image,
  bottom_banner_image_sm,
  add_address_iamge,
  box_icon,
  blaubeersaft_image,
  plus_icon,
  arrow_down_icon,
};

export const dummyProducts = [
  {
    _id: "1234qwert",
    name: "Waldheidelbeersaft",
    category: "Alkoholfreie Getränke",
    volume: "0,7L",
    price: 7.99,
    offerPrice: 5.99,
    image: [blaubeersaft_image],
    description: [
      "Fresh and organic",
      "Rich in carbohydrates",
      "Ideal for curries and fries",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
  {
    _id: "in05nood",
    name: "Oats Noodles 72g",
    category: "Instant",
    price: 40,
    offerPrice: 35,
    image: [maggi_oats_image],
    description: [
      "Healthy alternative with oats",
      "Good for digestion",
      "Perfect for breakfast or snacks",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
    {
    _id: "in0pelm",
    name: "Taschki Pelmeni",
    category: "Instant",
    price: 40,
    image: [taschki_pelmeni_image],
    description: [
      "Healthy alternative with oats",
      "Good for digestion",
      "Perfect for breakfast or snacks",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
];

export const dummyAddress = [
  {
    _id: "67b5b9e54ea97f71bbc196a0",
    userId: "67b5880e4d09769c5ca61644",
    firstName: "Great",
    lastName: "Stack",
    email: "user.greatstack@gmail.com",
    street: "Street 123",
    city: "Main City",
    state: "New State",
    zipcode: 123456,
    country: "IN",
    phone: "1234567890",
  },
];

export const dummyOrders = [
  {
    _id: "67e2589a8f87e63366786400",
    userId: "67b5880e4d09769c5ca61644",
    items: [
      {
        product: dummyProducts[3],
        quantity: 2,
        _id: "67e2589a8f87e63366786401",
      },
    ],
    amount: 89,
    address: dummyAddress[0],
    status: "Order Placed",
    paymentType: "Online",
    isPaid: true,
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
  },
  {
    _id: "67e258798f87e633667863f2",
    userId: "67b5880e4d09769c5ca61644",
    items: [
      {
        product: dummyProducts[0],
        quantity: 1,
        _id: "67e258798f87e633667863f3",
      },
      {
        product: dummyProducts[1],
        quantity: 1,
        _id: "67e258798f87e633667863f4",
      },
    ],
    amount: 43,
    address: dummyAddress[0],
    status: "Order Placed",
    paymentType: "COD",
    isPaid: false,
    createdAt: "2025-03-25T07:17:13.068Z",
    updatedAt: "2025-03-25T07:17:13.068Z",
  },
];
