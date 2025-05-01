const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://akshitb2050:akshitb2050@cluster0.xfsqh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("MongoDB Connection Error:", err));

module.exports = mongoose;