const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  ticket_Name: {
    type: String,
    required: true,
  },
  Note: {
    type: String,
    required: true,
  },
  Time: {
    type: Date,
    default: Date.now,  // Giá trị mặc định là thời gian hiện tại
  },
  Price: {
    type: Number,
    required: true,  // Chỉnh sửa từ "equired" thành "required"
  },
});

// Điều chỉnh tên model từ "Ticker" thành "Ticket"
const Ticket = mongoose.model("Ticket", userSchema);

module.exports = Ticket;
