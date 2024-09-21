# CampusCart

**CampusCart** is an E-commerce platform specifically designed for students to buy and sell used items like books, gadgets, and equipment. The goal is to promote sustainability by allowing students to pass on their items to juniors, fostering a community-driven marketplace within educational institutions. This project is a demonstration of my full-stack development skills, with a focus on user experience and functional efficiency.

## Features

- **User Authentication:** Secure login and signup functionality to protect user data.
- **Product Listings and Categories:** Browse through various product categories, making it easy to find what you need.
- **Shopping Cart:** Add items to your cart and proceed to a seamless checkout experience.
- **Wishlist:** Save items for later purchase.
- **Secure Payments:** Integrated with the Braintree API for safe and reliable payments.
- **Order Tracking:** Keep track of orders after purchasing.
- **Responsive Design:** Built with pure CSS using Flexbox and Grid, ensuring smooth performance across devices.

CampusCart demonstrates my ability to build a robust web application using modern technologies, focusing on both frontend and backend integration.

## Technologies Used

### Frontend:
- **React.js** for a dynamic and interactive user interface.
- **Context API** for managing the application’s state effectively.
- **Pure CSS (Flexbox and Grid)** for creating a fully responsive layout without external libraries.

### Backend:
- **Node.js** and **Express.js** for server-side logic and API handling.
- **MongoDB** for efficient and scalable database management.

### Payment Integration:
- **Braintree API** for handling secure transactions, ensuring user confidence during payments.

### Additional Tools:
- **JWT (JSON Web Tokens)** for secure user authentication.
- **Axios** for handling API requests between the frontend and backend.

## Why CampusCart?

CampusCart is more than just an E-commerce platform—it's built specifically for the student community. By creating a simple and intuitive platform, I aimed to address the needs of students who want to buy or sell items they no longer need. This project highlights my ability to develop full-stack web applications with a strong focus on practical use cases.

## Installation and Setup

### Prerequisites:
Ensure you have Node.js, MongoDB, and a Braintree Sandbox account for payment integration.

### Steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/campuscart.git
   cd campuscart
   ```

2. **Install dependencies:**

   - Backend:
     ```bash
     cd server
     npm install
     ```

   - Frontend:
     ```bash
     cd client
     npm install
     ```

3. **Set up environment variables:**

   In the `server` folder, create a `.env` file with the following content:

   ```bash
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   BRAINTREE_MERCHANT_ID=your_braintree_merchant_id
   BRAINTREE_PUBLIC_KEY=your_braintree_public_key
   BRAINTREE_PRIVATE_KEY=your_braintree_private_key
   ```

4. **Run the application:**

   - **Backend:** 
     ```bash
     cd server
     npm start
     ```

   - **Frontend:**
     ```bash
     cd client
     npm start
     ```

   The app will be available on `http://localhost:3000`.

## Project Highlights

- **Responsive Design with Pure CSS:** No external CSS libraries were used. The layout is fully responsive using CSS Grid and Flexbox, ensuring smooth performance across devices.
- **Full-Stack Development:** Combines a dynamic React.js frontend with a Node.js/Express backend and MongoDB for database management.
- **Secure Payment Integration:** The Braintree API ensures that all transactions are secure and efficient.
- **Efficient State Management:** Context API allows for smooth data handling across components.
- **Real-World Application:** Designed with practicality in mind, CampusCart can be easily adopted by any student community.

## What's Next?

This project is ready for practical use, with the potential for future enhancements like email notifications for order confirmations and updates.

## Project Structure

```
CampusCart/
│
├── client/               # Frontend React app
│   ├── public/           # Public assets and index.html
│   ├── src/              # React components and logic
│   │   ├── components/   # UI components
│   │   ├── context/      # State management using Context API
│   │   ├── pages/        # Application pages (Home, Cart, etc.)
│   │   └── utils/        # Helper functions (API calls, etc.)
│   └── package.json      # Client dependencies
│
├── server/               # Backend Express app
│   ├── controllers/      # API route controllers
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   └── config/           # Configurations (DB, Braintree, etc.)
│
└── README.md             # Project documentation
```

## Why This Project?

CampusCart is a reflection of my technical skills and ability to think through real-world problems. The project emphasizes my strengths in frontend and backend development, and it's designed to be practical and user-friendly. It’s a project I am proud to showcase as part of my portfolio for future employment.