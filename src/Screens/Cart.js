import React from 'react';
//import Delete from '@material-ui/icons/Delete';
import { useCart, useDispatchCart } from '../Components/ContextReducer';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import trash from "../trash.svg"
//import { MdDelete } from "react-icons/md";
export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
      </div>
    )
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    // console.log(data,localStorage.getItem("userEmail"),new Date())
    let response = await fetch("http://localhost:4000/api/orderData", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });
    console.log("JSON RESPONSE:::::", response.status)
    console.log("order responses:",response)
    if (response.status === 201) {
      dispatch({ type: "DROP" })
    }
  }
  let totalPrice = data.reduce((total, food) => total + food.price, 0)
  return (
    <div>
      <div>
<div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
  <table className='table table-hover '>
    <thead className=' text-success fs-4'>
      <tr>
        <th scope='col' >#</th>
        <th scope='col' >Name</th>
        <th scope='col' >Quantity</th>
        <th scope='col' >Option</th>
        <th scope='col' >Amount</th>
        <th scope='col' ></th>
      </tr>
    </thead>
    <tbody>
          {data.map((food, index) => (
              <tr>
                <th scope='row' >{index + 1}</th>
                <td >{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <i  class="far fa-trash-alt" onClick={() => { dispatch({ type: "REMOVE", index: index }) }} ></i>
                  {/* <FontAwesomeIcon icon="fa-solid fa-trash" onClick={() => { dispatch({ type: "REMOVE", index: index }) }}/> */}
                </td></tr>
          ))}
    </tbody>
    </table>
    <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5 ' onClick={handleCheckOut} > Check Out </button>
        </div>
    </div>
    </div>
    </div>
  );
}
