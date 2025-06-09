const Order = require("../../models/Order");

const getAllOrdersOfAllUser = async (req, res) => {
  try {
    const orders = await Order.find({});

    if (!orders.length) {
      res.status(404).json({
        success: false,
        message: "Order Not found",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured!",
    });
  }
};

const getOrderDetailsForAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      res.status(404).json({
        success: false,
        message: "Order Not found",
      });
    }
    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured!",
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;
    const order = await Order.findById(id);

    if (!order) {
      res.status(404).json({
        success: false,
        message: "Order Not found",
      });
    }

    await Order.findByIdAndUpdate(id, { orderStatus });

    res.status(200).json({
      success: true,
      message: "Order Status is updated Successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured!",
    });
  }
};

module.exports = {
  getAllOrdersOfAllUser,
  getOrderDetailsForAdmin,
  updateOrderStatus,
};
