const cors = require('cors');
// Allowed origins
const allowedOrigins = [
    "http://localhost:5173",
    'https://pro-manage-lilac.vercel.app',
    'https://pro-manage-git-main-jaswinder-singhs-projects-b0479f6f.vercel.app',
    'https://pro-manage-kwg50xign-jaswinder-singhs-projects-b0479f6f.vercel.app'

];

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true); 
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 200,
};

module.exports = cors(corsOptions);
