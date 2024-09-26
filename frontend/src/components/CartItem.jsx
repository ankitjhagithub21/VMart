import React, { useState } from 'react';

const CartItem = ({ item, handleRemoveFromCart, handleIncrementQuantity, handleDecrementQuantity }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  // Handle incrementing quantity
  const onIncrement = () => {
    handleIncrementQuantity(item.productId._id);
    setQuantity(quantity + 1);
  };

  // Handle decrementing quantity
  const onDecrement = () => {
    if (quantity > 1) {
      handleDecrementQuantity(item.productId._id);
      setQuantity(quantity - 1);
    }
  };

  return (
    <tr>
      <td>
        <div className="avatar">
          <div className="mask mask-squircle h-14 w-14">
            <img src={item.productId.image} alt={item.productId.title} />
          </div>
        </div>
      </td>
      <td>{item.productId.title}</td>
      <td>&#8377; {item.price}</td>
      <td>
        <div className="flex gap-3 items-center">
          <button
            className="btn btn-xs btn-error"
            onClick={onDecrement}
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            className="btn btn-xs btn-info"
            onClick={onIncrement}
          >
            +
          </button>
        </div>
      </td>
      <td>&#8377; {item.price * quantity}</td>
      <td>
        <button
          className="btn btn-square btn-outline btn-sm"
          onClick={() => handleRemoveFromCart(item.productId._id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
