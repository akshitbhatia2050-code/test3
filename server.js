const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Authentication Route (Login)
app.post('/auth/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Missing credentials' });
    }
    res.json({ message: 'Login successful!', userId: '123456' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
