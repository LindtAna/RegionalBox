import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Angebot from "../models/Angebot.js";
import Stripe from 'stripe';
import User from "../models/User.js";


// Place Order (Cash on Delivery): POST /api/orders/cod

export const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    if (!address || !items || items.length === 0) {
      return res.status(400).json({ success: false, message: "Ungültige Daten" });
    }

    //den Betrag anhand der Artikel berechnen

    let amount = 0;
    for (const item of items) {
      let product = await Product.findById(item.product);
      if (!product) {
        product = await Angebot.findById(item.product);
      }
      if (!product) {
        return res.status(400).json({ success: false, message: "Produkt nicht gefunden" });
      }
      const priceToUse = product.offerPrice || product.price;
      amount += priceToUse * item.quantity;
    }
    await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: 'COD'
    })
    return res
      .status(200)
      .json({ success: true, message: "Bestellung aufgegeben" });

  } catch (error) {
    console.log(error.stack);
    return res.status(500).json({ success: false, message: 'Interner Serverfehler' });
  }
}


// Place Order (Stripe): POST /api/orders/stripe

export const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    const { origin } = req.headers;

    if (!address || !items || items.length === 0) {
      return res.status(400).json({ success: false, message: "Ungültige Daten" });
    }

    let productData = [];

    let amount = 0;
    for (const item of items) {
      let product = await Product.findById(item.product);
      if (!product) {
        product = await Angebot.findById(item.product);
      }
      if (!product) {
        return res.status(400).json({ success: false, message: "Produkt nicht gefunden" });
      }

      const priceToUse = product.offerPrice || product.price;

      productData.push({
        name: product.name,
        price: priceToUse,
        quantity: item.quantity,
      });
      amount += priceToUse * item.quantity;
    }
    const order = await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: 'Online',
    })

    //Stripe Gateway Intitialize

    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY)

    //Line items for Stripe

    const line_items = productData.map((item) => {
      return {
        price_data: {
          currency: "eur",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.floor(item.price * 100)
        },
        quantity: item.quantity,
      }
    })

    //Create Session

    const session = await stripeInstance.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${origin}/loader?next=orders`,
      cancel_url: `${origin}/cart`,
      metadata: {
        orderId: order._id.toString(),
        userId,
      }
    })
    return res
      .status(200)
      .json({ success: true, url: session.url });

  } catch (error) {
    console.log(error.stack);
    return res.status(500).json({ success: false, message: 'Interner Serverfehler' });
  }
}

//Stripe Webhooks to Verify Payments Action: /stripe
export const stripeWebhooks = async (req, res) => {
  const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripeInstance.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error(`Webhook Error: ${error.message}`);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const { orderId, userId } = session.metadata;

    await Order.findByIdAndUpdate(orderId, { isPaid: true });
    await User.findByIdAndUpdate(userId, { cartItems: {} });

    console.log(`Order ${orderId} marked as paid`);
  }

  res.json({ received: true });
};


// get orders by userId : /api/orders/user?userId=...

export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.query

    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }]
    }).sort({ createdAt: -1 })

    const populatedOrders = [];
    for (const order of orders) {
      const populatedItems = [];
      for (const item of order.items) {
        let product = await Product.findById(item.product);
        if (!product) product = await Angebot.findById(item.product);
        populatedItems.push({ ...item.toObject(), product });
      }
      populatedOrders.push({ ...order.toObject(), items: populatedItems });
    }

    return res
      .status(200)
      .json({ success: true, orders: populatedOrders });

  } catch (error) {
    console.log(error.stack);
    return res.status(500).json({ success: false, message: 'Interner Serverfehler' });
  }
}


// get all orders for Seller/admin : /api/seller/orders-list

export const getAllOrders = async (req, res) => {
  try {

    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }]
    })
      .populate("address")
      .sort({ createdAt: -1 });


    const populatedOrders = [];

    for (const order of orders) {
      const populatedItems = [];

      for (const item of order.items) {

        let product = await Product.findById(item.product);

        if (!product) product = await Angebot.findById(item.product);

        populatedItems.push({
          ...item.toObject(),
          product,
        });
      }

      populatedOrders.push({
        ...order.toObject(),
        items: populatedItems,
      });
    }

    return res.status(200).json({
      success: true,
      orders: populatedOrders,
    });
  } catch (error) {
    console.error(error.stack);
    return res
      .status(500)
      .json({ success: false, message: "Interner Serverfehler" });
  }
};