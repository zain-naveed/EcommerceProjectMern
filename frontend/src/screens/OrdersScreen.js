import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listOrders, deleteOrder,orderName } from '../actions/orderActions';


function OrdersScreen(props) {
  const [newData,setData] = useState([]);
  const orderList = useSelector(state => state.orderList);
  const { loading, orders,user, error } = orderList;
  console.log(orders)
// console.log(user)
  const orderDelete = useSelector(state => state.orderDelete);
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = orderDelete;
// console.log(user)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrders());
    return () => {
      //
    };
  }, [successDelete]);

  const deleteHandler = (order) => {
    dispatch(deleteOrder(order._id));
  }

// console.log(newData)
  // <td>{order._id}</td>
  // <td>{order.createdAt}</td>
  // <td>{order.totalPrice}</td>
  // <td>{order.user.name}</td>
  // <td>{order.isPaid.toString()}</td>
  // <td>{order.paidAt}</td>
  // <td>{order.isDelivered.toString()}</td>
  // <td>{order.deliveredAt}</td>
  // <td>
  //   <Link to={"/order/" + order._id} className="button secondary" >Details</Link>
  //   {' '}
  //   <button type="button" onClick={() => deleteHandler(order)} className="button secondary">Delete</button>
  // </td>
  const customer_name = (id,order)=>{
    console.log(id)
    dispatch(orderName(id,order))
  }


 

 var z;
  // if(orders){
  //   var r = orders.map((order) => {
     
  //     return  order.order.map((value)=>{
        
       
  //      return value.orderid.orderItems.map((data,index)=>{
        
  //       return <tr key={index}>
          
  //       <td>{value._id}</td>
  //       <td>{value.orderid.createdAt}</td>
  //       <td>{value.orderid.totalPrice}</td>
  //       <td>{value.orderid.user}</td>
  //     <td> <button onClick={()=>{customer_name(value)
  //     setData(orders)
      
  //     }}> click me </button></td>
  // </tr>    
          
            
       
  //       })
         
  //      })
  //     })
  // }else{
  //   r =  <tr>
  //     <td colSpan="9">No orders</td>
  //   </tr>
  // }
  
  return loading ? <div>Loading...</div> :
    <div className="content content-margined">

      <div className="order-header">
        <h3>Orders</h3>
      </div>
      <div className="order-list">

        <table className="table">
          <thead>
            {/* <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>USER</th>
              <th>PAID</th>
              <th>PAID AT</th>
              <th>DELIVERED</th>
              <th>DELIVERED AT</th>
              <th>ACTIONS</th>
            </tr> */}
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>Email</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            
         
        {orders.map((result)=>{
            return result.user.map((value,key)=>{
              return <tr key={key}>
               <td> {value._id}</td>
               <td> {value.name}</td>
               <td> {value.email}</td>
               <td><Link to={`/order/${result._id} `}  ><button>Details</button></Link></td>
             </tr>
           })
         
        })}
            
          </tbody>
        </table>

      </div>
    </div>
}
export default OrdersScreen;