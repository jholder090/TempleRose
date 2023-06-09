import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adjustQtyAsync, removeCartItemAsync } from "../slices/userCartSlice";
import {
  increase,
  decrease,
  remove,
} from '../slices/visitorCartSlice'

const CartItem = ({ item, }) => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const visitorCart = useSelector(state => state.visitorCart);


  const adjustCartQuantityAsync = (e) => {
    let newItem = { ...item };

    if (e.target.id == "decrease") {
      newItem.quantity--;
      if (newItem.quantity < 1) {
        removeItemAsync(item);
      }
      newItem.price = newItem.product.price * newItem.quantity;
      return dispatch(adjustQtyAsync(newItem));
    }
    newItem.quantity++;
    newItem.price = newItem.product.price * newItem.quantity;
    return dispatch(adjustQtyAsync(newItem));
  }

  const removeItemAsync = (item) => {
    dispatch(removeCartItemAsync(item));
  }

  const adjustQty = (e) => {
    if (e.target.id == "decrease") {
      if (item.quantity == 1) {
        dispatch(remove(item.id))
      } else {
        dispatch(decrease(item.id))
      }
    }
    if (e.target.id == 'increase') {
      dispatch(increase(item.id))
    }

  }

  return (
    <>
      {isLoggedIn ?
        <div className='cart_itemContainer flex justify-between h-36 my-2 '>
          <div className='cart_itemInfo flex justify-center w-2/5'>
            <div className='cart__itemImage flex w-2/5'>
              <img src={item.product.imageUrl} className='' />
            </div>
            <div className='cart__itemText flex flex-col justify-center w-2/5'>
              <div className='cart__itemName my-2'>{item.product.name}</div>
              <div className='cart__itemPrice my-2'>{item.product.price}</div>
            </div>
          </div>
          <div className='cart_itemQty flex justify-around items-center w-2/5 mr-6'>
            <div className="cart__adjustQty flex justify-between items-center h-10 w-1/2 my-6 rounded-full border border-solid border-black">
              <button id='decrease' className=' text-black font-bold py-2 px-5 rounded-full' onClick={(e) => adjustCartQuantityAsync(e)}
              >-</button>
              <div>{item.quantity}</div>
              <button id='increase' className=' text-black font-bold py-2 px-5 rounded-full' onClick={(e) => adjustCartQuantityAsync(e)}
              >+</button>
            </div>
            <div className='cart__itemTotal'>${(Math.round((item.quantity * item.product.price) * 100) / 100).toFixed(2)}</div>
            <div className='cart__clearItem cursor-pointer' onClick={() => removeItemAsync(item)}>X</div>
          </div>
        </div>

        :

        <div key={item.id} className='cart_itemContainer flex justify-between h-36 my-2 '>
          <div className='cart_itemInfo flex justify-center w-2/5'>
            <div className='cart__itemImage flex w-2/5'>
              <img src={item.imageUrl} className='' />
            </div>
            <div className='cart__itemText flex flex-col justify-center w-2/5'>
              <div className='cart__itemName my-2'>{item.name}</div>
              <div className='cart__itemPrice my-2'>{item.price}</div>
            </div>
          </div>
          <div className='cart_itemQty flex justify-around items-center w-2/5 mr-6'>
            <div className="cart__adjustQty flex justify-between items-center h-10 w-1/2 my-6 rounded-full border border-solid border-black">
              <button id='decrease' className=' text-black font-bold py-2 px-5 rounded-full' onClick={(e) => adjustQty(e)}
              >-</button>
              <div>{item.quantity}</div>
              <button id='increase' className=' text-black font-bold py-2 px-5 rounded-full' onClick={() => dispatch(increase(item.id))}
              >+</button>
            </div>
            <div className='cart__itemTotal'>${(Math.round((item.quantity * item.price) * 100) / 100).toFixed(2)}</div>
            <div className='cart__clearItem cursor-pointer' onClick={() => dispatch(remove(item.id))}>X</div>
          </div>
        </div>}
    </>


  )
}

export default CartItem;





