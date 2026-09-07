import React from 'react';

function AboutUs() {
  return (
    <div className="about-us-container" style={{ padding: '20px', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '28px', color: '#2e7d32' }}>About Paradise Nursery</h2>
      <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#fff', textShadow: '1px 1px 2px black' }}>
        Welcome to Paradise Nursery, your ultimate destination for fresh, vibrant, and healthy houseplants. 
        Our mission is to bring nature closer to your everyday life by offering a wide variety of plants 
        ranging from air-purifying indoor greenery to aromatic and low-maintenance plants. Whether you are 
        a seasoned plant parent or just starting your green journey, we are here to nurture your passion.
      </p>
    </div>
  );
}

export default AboutUs;