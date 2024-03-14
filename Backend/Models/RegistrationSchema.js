const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // For secure password hashing

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  virtualMoney:{
    type:Number
  },
  equity: {
    type: [{
      stock: { type: mongoose.Schema.Types.ObjectId, ref: 'Stock' },
      quantity: { type: Number, required: true, default: 0 },
      stock_name:{type:String,required:true},
      purchased_value:{type:Number,required:true}
      // Add averagePrice to track investment cost per share (optional)
    }],
    default: [],
  },
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10); // Customize salt rounds as needed
    }
    next();
  });

const Sign = mongoose.model('Sign', userSchema);
module.exports = Sign;