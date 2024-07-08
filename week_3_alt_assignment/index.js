const express = require('express');
const app = express();

// Middleware to serve static files from the "public" directory
app.use(express.static('./public'));

// Home route to start the game
app.get('/', (_, res) => res.send(`
  <h1>Welcome to the Riddle Game!</h1>
  <p>To start the game, visit <a href="/riddle">/riddle</a></p>
`));

// Riddle route
app.get('/riddle', (_, res) => res.send(`
  <h1>Riddle Time!</h1>
  <p>What has keys but can't open locks?</p>
  <p>Submit your answer in the URL like this: /answer?response=yourAnswer</p>
`));

// Answer route to check the user's response
app.get('/answer', (req, res) => {
  const answer = req.query.response;
  if (answer && answer.toLowerCase() === 'piano') {
    res.send(`
      <h1>Correct!</h1>
      <p>Well done! The answer is a piano.</p>
      <p>Proceed to the next riddle: <a href="/riddle2">/riddle2</a></p>
    `);
  } else {
    res.send(`
      <h1>Incorrect!</h1>
      <p>Try again. Go back to the <a href="/riddle">riddle</a>.</p>
    `);
  }
});

// Second riddle route
app.get('/riddle2', (_, res) => res.send(`
  <h1>Riddle Time Again!</h1>
  <p>I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?</p>
  <p>Submit your answer in the URL like this: /answer2?response=yourAnswer</p>
`));

// Answer route for the second riddle
app.get('/answer2', (req, res) => {
  const answer = req.query.response;
  if (answer && answer.toLowerCase() === 'echo') {
    res.send(`
      <h1>Correct!</h1>
      <p>Well done! The answer is an echo.</p>
      <p>Congratulations, you have completed the game!</p>
    `);
  } else {
    res.send(`
      <h1>Incorrect!</h1>
      <p>Try again. Go back to the <a href="/riddle2">riddle</a>.</p>
    `);
  }
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
