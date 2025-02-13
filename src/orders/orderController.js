const Order = require("./orderModel");

const createOrder = async (req, res) => {
  try {
    const newOrder = await Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    console.log("Error creating order", error);
    res.status(500).send({ message: "Failed to create order" });
  }
};

const getOrderByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const orders = await Order.find({ email }).sort({ createdAt: -1 });
    if (!orders) {
      return res.status(404).json({ message: "Order Not Found" });
    }
    res.status(200).json(orders)
  } catch (error) {
    console.log("Error fetching order", error);
    res.status(500).send({ message: "Failed to fetch order" });
  }
};

module.exports = {
  createOrder,
  getOrderByEmail,
};
