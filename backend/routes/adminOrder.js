import Order from '../models/orderModel';
exports.admin = async (req, res) => {
    var {admin,order} = req.query;
  
    const norder = await Order.findById({_id:order});
    console.log(norder);
    if(norder){
      norder.shop.push({shop:admin});
      var update = await norder.save();
      res.send(norder);
    }
    
    }