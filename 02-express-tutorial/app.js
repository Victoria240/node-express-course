
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const peopleRouter = require('./routes/people');
const { products } = require('./data');

// Logger middleware function
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url} at ${new Date().toISOString()}`);
    next();
};

// Authentication middleware function
const auth = (req, res, next) => {
    if (req.cookies.name) {
        req.user = req.cookies.name;
        next();
    } else {
        res.status(401).json({ success: false, message: 'Unauthorized' });
    }
};

// Middleware to serve static files from the "public" directory
app.use(express.static('./public'));

// Use express.json() middleware for parsing JSON bodies
app.use(express.json());
app.use(cookieParser());

// Applying logger middleware globally
app.use(logger);

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

// Use the people router
app.use('/api/v1/people', peopleRouter);

// Login route
app.post('/logon', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ success: false, message: 'Please provide a name' });
    }
    res.cookie('name', name);
    res.status(201).json({ success: true, message: `Hello, ${name}` });
});

// Logout route
app.delete('/logoff', (req, res) => {
    res.clearCookie('name');
    res.status(200).json({ success: true, message: 'Logged off' });
});

// Test route with authentication middleware
app.get('/test', auth, (req, res) => {
    res.status(200).json({ success: true, message: `Welcome, ${req.user}` });
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
