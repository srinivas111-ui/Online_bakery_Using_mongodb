const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;
const mongoURI = 'mongodb://localhost:27017/signup_app'; // Replace with your MongoDB connection string

app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, etc.)
app.use(express.static(__dirname));

// Display the login form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

// Handle the login form submission
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Connect to the MongoDB database
    const client = new MongoClient(mongoURI, { useUnifiedTopology: true });

    try {
        await client.connect();

        const db = client.db();
        const collection = db.collection('users');

        // Find the user in the 'users' collection
        const user = await collection.findOne({ email, password });

        if (user) {
            res.send('Login successful!');
        } else {
            res.send('Invalid username or password');
        }
    } catch (error) {
        console.error('Error:', error);
        res.send('Error occurred during login.');
    } finally {
        client.close();
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
