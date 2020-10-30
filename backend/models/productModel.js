import mongoose from 'mongoose';


const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, default: 0 },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const orderproduct = new mongoose.Schema({
  orderid:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    // required:true,
  },
  userid:{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // required:true
  },
// orderStatus:{
//   type:Boolean,
//   default:true,
//   required:true
// }
})
const prodctSchema = new mongoose.Schema({
  shopid: {
    type: mongoose.Schema.Types.ObjectId,
     ref:'User', 
    //  required:true
    },
    order: [orderproduct],
  name: { type: String,
    //  required: true 
    },
  price: { type: Number, default: 0,
    //  required: true
     },
  image: { type: String, required: true 
  },
  brand: { type: String, 
    // required: true
   },
  category: { type: String,
    //  required: true 
  },
  countInStock: { type: Number, default: 0, 
    // required: true
   },
  description: { type: String,
    //  required: true
     },
  rating: { type: Number, default: 0, 
    // required: true 
  },
  numReviews: { type: Number, default: 0, 
    // required: true 
  },
  reviews: [reviewSchema],
});

const productModel = mongoose.model('Product', prodctSchema);

export default productModel;
