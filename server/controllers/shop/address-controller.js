const Address = require("../../models/Address");

const addAddress = async (req, res) => {
  try {
    const { userId, address, city, pincode, phone, notes } = req.body;

    if (!userId || !address || !city || !pincode || !phone || !notes) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }
    const newlyCreatedAddress = new Address({
      userId,
      address,
      city,
      pincode,
      phone,
      notes,
    });

    await newlyCreatedAddress.save();
    res.status(201).json({
      success: true,
      data: newlyCreatedAddress,
    });
  } catch (e) {
    console.log(e);
    res.status(500)({
      success: false,
      message: "Error",
    });
  }
};
const fetchAllAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Required UserId",
      });
    }
    const addressList = await Address.find({ userId });
    res.status(200).json({
      success: true,
      data: addressList,
    });
  } catch (e) {
    console.log(e);
    res.status(500)({
      success: false,
      message: "Error",
    });
  }
};
const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "Required User and Address Id",
      });
    }
    const address = await Address.findOneAndUpdate(
      {
        _id: addressId,
        userId,
      },
      formData,
      { new: true }
    );
    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }
    res.status(200).json({
      success: true,
      data: address,
    });
  } catch (e) {
    console.log(e);
    res.status(500)({
      success: false,
      message: "Error",
    });
  }
};
const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "Required User and Address Id",
      });
    }
    const address = Address.findOne({
      _id: addressId,
      userId,
    });
    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found!",
      });
    }
    await Address.findByIdAndDelete(addressId);
    res.status(200).json({
      success: true,
      message: "Address deleted Successfully!",
    });
  } catch (e) {
    console.log(e);
    res.status(500)({
      success: false,
      message: "Error",
    });
  }
};

module.exports = { addAddress, editAddress, fetchAllAddress, deleteAddress };
