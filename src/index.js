const express = require('express');
const app = express();

app.use(express.json()); // <-- Add this line
app.use(express.urlencoded({ extended: true })); // <-- For form data

// ...existing code...