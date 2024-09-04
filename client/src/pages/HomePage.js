import React from 'react';
import DynamicHelmet from '../components/Common/DynamicHelmet';

function HomePage() {
  return (
    <>
      <DynamicHelmet
        title="Home Page - Shopease E-Commerce"
        description="Welcome to Shopease, the ultimate student marketplace for all your needs."
        keywords="home, ecommerce, marketplace, mern project, Shopease"
      />
      <div className='home-container'>HomePage Content</div>
    </>
  );
}

export default HomePage;
