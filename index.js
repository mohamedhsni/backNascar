const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const swaggerUI = require('swagger-ui-express');
const swaggerSpecs = require('./swagger');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://mohamedhosniisi_db_user:MacSszu4T7cN8dxM@nascar.qlypuu0.mongodb.net/')
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Swagger UI route
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs));

// Use the user routes
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
