import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext';
import {  dummyOrders } from '../assets/assets';

const MyOrders = () => {

  const [myOrders, setMyOrders] = useState([]);
  const {currency} = useAppContext();

  const fetchMyOrders = async() => {
    setMyOrders(dummyOrders);
    //fetch orders from backend and set to myOrders state
  }

  useEffect(() => {
    fetchMyOrders();
  }, [])

  return (
    <div className='mt-16 pb-16 '>
      
      
      <div className='flex flex-col items-start mb-10 gap-2 '> 
        <p className='text-2xl font-medium uppercase '>My Orders</p>
        <div className='w-16 h-0.5 bg-green-500 rounded-full'></div>
      </div>

      {myOrders.length === 0 ? (
        <p className='text-gray-500'>No orders found.</p>
      ) : (
        myOrders.map((order, index) => (
          <div key={index} className='border p-4 py-5 mb-10 rounded-lg border-gray-300 max-w-4xl'>
            <p className='flex justify-between md:items-center text-gray-700 md:font-medium max-md:flex-col'>
              <span>Order ID: {order._id}</span>
              <span>Payment: {order.paymentType}</span>
              <span>Total Amount: {currency}{order.amount}</span>
            </p>
          </div>
        ))
      )}
    </div>
  )
}

export default MyOrders
