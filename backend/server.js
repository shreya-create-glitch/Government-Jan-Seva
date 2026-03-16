// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');

// // Load environment variables
// dotenv.config();

// // Connect to MongoDB
// connectDB();

// // Initialize app
// const app = express();


// // Middleware
// app.use(cors());
// app.use(express.json()); // for parsing application/json
// app.use(express.urlencoded({ extended: true })); // for parsing form data

// // Static folder for uploaded images
// app.use('/uploads', express.static('uploads'));

// // Routes
// app.use("/user",require("./routes/user"))
// app.use("/complaint",require("./routes/complaint"));
// app.use("/comment",require("./routes/comment"));
// app.use("/",require("./routes/analytics"));
// // Root Route
// app.get('/', (req, res) => {
//   res.send('API is running...');
// });

// // Start server
// const PORT = process.env.PORT || 5000;



// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });





const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');

dotenv.config();
connectDB();

const app = express();

const _dirname = path.resolve();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// uploads
app.use('/uploads', express.static('uploads'));

// API routes
app.use("/user", require("./routes/user"));
app.use("/complaint", require("./routes/complaint"));
app.use("/comment", require("./routes/comment"));
app.use("/analytics", require("./routes/analytics"));

app.get('/api', (req, res) => {
  res.send('API is running...');
});

// frontend static
app.use(express.static(path.join(_dirname, "gvmt-app", "dist")));

app.get( (req, res) => {
  res.sendFile(path.resolve(_dirname, "gvmt-app", "dist", "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});