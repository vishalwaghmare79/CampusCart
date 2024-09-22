import React from 'react';
import { Helmet } from 'react-helmet-async';

const DynamicHelmet = ({
  title = 'CampusCart - Student Marketplace',
  description = 'CampusCart is a dedicated platform for students to easily buy and sell products within their community.',
  keywords = 'student marketplace, e-commerce, buy and sell, student community, online shopping',
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

export default DynamicHelmet;
