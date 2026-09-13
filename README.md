# OurMall

A simple e-commerce product application built with Next.js and the Fake Store API.

## Features

* Product listing
* Product details
* Search products
* Filter products by category
* Pagination
* Adjustable products per page
* Product loading states
* Error handling
* Empty search/filter state
* Responsive design
* Product image preview
* Modern and responsive UI

## Tech Stack

* **Next.js**
* **React**
* **TypeScript**
* **Tailwind CSS**
* **Lucide React**
* **Axios**
* **Fake Store API**

## Requirements

Make sure you have the following installed:

* Node.js `22.17.0` or later
* npm

Check your installed versions:

```bash
node -v
npm -v
```

## Getting Started

### 1. Clone the repository

Using HTTPS:

```bash
git clone https://github.com/Satheesh-Baabu/OurMall.git
```

Or using SSH:

```bash
git clone git@github.com:Satheesh-Baabu/OurMall.git
```

Navigate into the project:

```bash
cd OurMall
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root and copy the contents from `.env.example`.

Example:

```env
NEXT_PUBLIC_API_URL=https://fakestoreapi.com
```

### 4. Run the development server

```bash
npm run dev
```

Open the application in your browser:

```text
http://localhost:3000
```

### 5. Production Build

Create an optimized production build:

```bash
npm run build
```

### 6. Start Production Server

Run the application using the production build:

```bash
npm run start
```

## Project Structure

```text
src/
├── app/
│   ├── products/
│   │   ├── [id]/
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── products/
│   │   ├── ProductCard.tsx
│   │   ├── SearchBar.tsx
│   │   ├── CategoryFilter.tsx
│   │   ├── Pagination.tsx
│   │   ├── LoadingCard.tsx
│   │   └── Rating.tsx
│   ├── Button.tsx
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ...
│
├── data/
│   └── featureCards.ts
│
├── lib/
│   ├── api.ts
│   └── axios.ts
│
└── types/
    └── product.ts
```

## API

OurMall uses the **Fake Store API** for product data.

### API Endpoints

```text
GET /products
GET /products/:id
GET /products/categories
```

### Base API

```text
https://fakestoreapi.com
```

The API provides product information including:

* Product title
* Price
* Description
* Category
* Product image
* Rating
* Review count

## Product Listing

The products page provides:

* Product search by title
* Category filtering
* Pagination
* Adjustable page size
* Product count display
* Previous/next navigation

Example:

```text
Showing 1–8 of 20 products
```

The number of products displayed per page can be changed using the page-size dropdown.

## Product Details

The product details page displays:

* Product image
* Product title
* Category
* Price
* Rating
* Review count
* Product description
* Add to Cart action

## Error Handling

The application handles API failures with an error state and retry option.

If no products match the selected search or category filters, an empty state is displayed with an option to clear the filters.

## Responsive Design

The application is designed to work across:

* Desktop
* Tablet
* Mobile

The product grid, navigation, search, filters, and pagination adapt to different screen sizes.

## Deployment

The application is deployed using **Vercel**.

### Live URL

https://ourmall-project.vercel.app/

## License

This project is created for demonstration and technical assessment purposes.
