import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach((item) => {
      const costNum = parseFloat(item.cost.substring(1));
      total += costNum * item.quantity;
    });
    return total;
  };

  const calculateTotalCost = (item) => {
    const costNum = parseFloat(item.cost.substring(1));
    return costNum * item.quantity;
  };

  const handleContinueShopping = (e) => {
    if (onContinueShopping) {
      onContinueShopping(e);
    }
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  return (
    <div className="cart-container" style={{ padding: '30px', maxWidth: '900px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', color: '#2e7d32' }}>Total Shopping Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #ccc', padding: '15px 0' }}>
            <img className="cart-item-image" src={item.image} alt={item.name} style={{ width: '90px', height: '90px', objectFit: 'cover', borderRadius: '8px' }} />
            <div className="cart-item-details" style={{ flex: 1, marginLeft: '20px' }}>
              <div className="cart-item-name" style={{ fontSize: '18px', fontWeight: 'bold' }}>{item.name}</div>
              <div className="cart-item-cost" style={{ color: '#555' }}>Unit Price: {item.cost}</div>
              <div className="cart-item-subtotal" style={{ fontWeight: 'bold', marginTop: '5px' }}>Subtotal: ${calculateTotalCost(item)}</div>
            </div>
            <div className="cart-item-quantity" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)} style={{ padding: '5px 10px', fontSize: '16px' }}>-</button>
              <span className="cart-item-quantity-value" style={{ fontSize: '16px', fontWeight: 'bold' }}>{item.quantity}</span>
              <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)} style={{ padding: '5px 10px', fontSize: '16px' }}>+</button>
            </div>
            <button className="cart-item-delete" onClick={() => handleRemove(item)} style={{ marginLeft: '20px', padding: '8px 12px', backgroundColor: '#d32f2f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
          </div>
        ))}
      </div>
      <div className="continue_shopping_btn" style={{ marginTop: '30px', textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <button className="get-started-btn" onClick={(e) => handleContinueShopping(e)} style={{ backgroundColor: '#2e7d32', color: 'white', padding: '12px 24px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Continue Shopping</button>
        <button className="get-started-btn" onClick={(e) => handleCheckoutShopping(e)} style={{ backgroundColor: '#1976d2', color: 'white', padding: '12px 24px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;