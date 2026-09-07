import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const calculateTotalQuantity = () => {
    return cartItems ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;
  };

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night, improves air quality.", cost: "$15" },
        { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters formaldehyde and xylene from indoor air.", cost: "$12" }
      ]
    },
    {
      category: "Aromatic Plants",
      plants: [
        { name: "Lavender", image: "https://cdn.pixabay.com/photo/2016/07/18/16/06/lavender-1526180_1280.jpg", description: "Calming scent, aids relaxation and sleep quality.", cost: "$18" },
        { name: "Jasmine", image: "https://cdn.pixabay.com/photo/2017/08/10/02/58/jasmine-2618113_1280.jpg", description: "Sweet fragrance, reduces anxiety and stress.", cost: "$20" }
      ]
    },
    {
      category: "Low Maintenance Plants",
      plants: [
        { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/18/03/aloe-vera-3284620_1280.jpg", description: "Soothes skin burns, requires minimal watering.", cost: "$10" },
        { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/15/07/peace-lily-4269512_1280.jpg", description: "Thrives in low light, purifies indoor environment.", cost: "$22" }
      ]
    }
  ];

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
    setAddedToCart((prevState) => ({
      ...prevState,
      [product.name]: true,
    }));
  };

  return (
    <div>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 30px', backgroundColor: '#2e7d32', color: 'white' }}>
        <h2 style={{ margin: 0, cursor: 'pointer' }} onClick={() => setShowCart(false)}>Paradise Nursery</h2>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <span style={{ cursor: 'pointer', fontWeight: 'bold' }} onClick={() => setShowCart(false)}>Plants</span>
          <div style={{ cursor: 'pointer', fontSize: '20px', fontWeight: 'bold' }} onClick={() => setShowCart(true)}>
            🛒 Cart ({calculateTotalQuantity()})
          </div>
        </div>
      </nav>

      {!showCart ? (
        <div className="product-grid" style={{ padding: '30px' }}>
          {plantsArray.map((categoryObj, index) => (
            <div key={index} style={{ marginBottom: '40px' }}>
              <h1 style={{ textAlign: 'center', color: '#2e7d32', borderBottom: '2px solid #2e7d32', paddingBottom: '10px' }}>
                {categoryObj.category}
              </h1>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap', marginTop: '20px' }}>
                {categoryObj.plants.map((plant, plantIndex) => (
                  <div key={plantIndex} className="product-card" style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '15px', width: '250px', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                    <img className="product-image" src={plant.image} alt={plant.name} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px' }} />
                    <div className="product-title" style={{ fontSize: '20px', fontWeight: 'bold', margin: '10px 0' }}>{plant.name}</div>
                    <div className="product-description" style={{ fontSize: '14px', color: '#666', height: '40px' }}>{plant.description}</div>
                    <div className="product-cost" style={{ fontSize: '18px', fontWeight: 'bold', color: '#2e7d32', margin: '10px 0' }}>{plant.cost}</div>
                    <button
                      className="product-button"
                      disabled={addedToCart[plant.name]}
                      onClick={() => handleAddToCart(plant)}
                      style={{
                        padding: '10px 15px',
                        backgroundColor: addedToCart[plant.name] ? '#ccc' : '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: addedToCart[plant.name] ? 'not-allowed' : 'pointer',
                        width: '100%'
                      }}
                    >
                      {addedToCart[plant.name] ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={(e) => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;