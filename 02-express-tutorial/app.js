const express = require('express');
const app = express();
const { products } = require('./data'); // Import the products data

// Middleware to serve static files from the "public" directory
app.use(express.static('./public'));

// Route to return all products as JSON
app.get('/api/v1/products', (req, res) => {
    res.json(products);
});

// New route to handle searching and filtering products
app.get('/api/v1/query', (req, res) => {
    const { search, limit, priceLessThan } = req.query;
    let filteredProducts = [...products];

    // Search by name using a regular expression
    if (search) {
        const regex = new RegExp(search, 'i'); // 'i' for case-insensitive
        filteredProducts = filteredProducts.filter((product) => regex.test(product.name));
    }

    // Filter by price
    if (priceLessThan) {
        filteredProducts = filteredProducts.filter((product) => product.price < parseFloat(priceLessThan));
    }

    // Limit the number of results
    if (limit) {
        filteredProducts = filteredProducts.slice(0, parseInt(limit));
    }

    // If no products found, return a 404 status
    if (filteredProducts.length === 0) {
        return res.status(404).json({ message: 'No products found' });
    }

    res.json(filteredProducts);
});

// Handle 404 errors for other routes
app.all('*', (req, res) => {
    res.status(404).send('Resource not found');
});

// Start the server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
