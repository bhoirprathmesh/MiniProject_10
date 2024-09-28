require('dotenv').config();
const express = require("express");
const cors = require("cors")
const app = express();
const authRoute = require("./router/auth-router");
const ContactRoute = require("./router/contact-router");
const connectDb = require("./utils/db");
const errorMiddleware = require('./middlewares/error-middleware');

//handling cors policy issues
const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, OPTIONS, PATCH, HEAD",
    credentials: true, 
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/auth", authRoute);
app.use("/form", ContactRoute);

app.use(errorMiddleware);

// to start the server
const PORT = 4000;

connectDb().then( () => {
    app.listen(PORT, () => {
        console.log(`Server is Running at port: ${PORT}`);
    });
});

