# LuxeCart - E-Commerce Product Explorer

A modern, professional e-commerce application built with React, TypeScript, and Tailwind CSS. This app features a global shopping cart, category filtering, product search, and a seamless checkout experience.

## 🚀 Features

- **Product Browsing**: Explore a wide range of products fetched from the FakeStoreAPI.
- **Global Cart**: Manage items across the entire app using React Context API.
- **INR Pricing**: All prices are automatically converted and formatted in Indian Rupees (₹).
- **Advanced Filtering**: Filter by category, search with debounce, and sort by price or rating.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop screens.
- **Modern UI**: Smooth animations using Framer Motion and a clean, minimalist aesthetic.

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Animations**: Motion (Framer Motion)
- **Routing**: React Router DOM

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

## ⚙️ Setup & Installation

Follow these steps to get the project running locally on your machine:

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd luxecart-explorer
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and add your keys (refer to `.env.example`):
```env
API_KEY=your_api_key_here
APP_URL=http://localhost:3000
```

### 4. Run the Development Server
```bash
npm run dev
```
The application will be available at `http://localhost:3000`.

## 🏗️ Building for Production

To create an optimized production build:
```bash
npm run build
```
The production-ready files will be generated in the `dist/` folder.

## 📂 Project Structure

- `src/components/`: Reusable UI components (Navbar, ProductCard, etc.)
- `src/context/`: Global state management (CartContext)
- `src/hooks/`: Custom React hooks (useProducts, useDebounce)
- `src/pages/`: Main application pages (Home, ProductList, Cart, etc.)
- `src/lib/`: Utility functions and helpers
- `src/types.ts`: TypeScript interfaces and types