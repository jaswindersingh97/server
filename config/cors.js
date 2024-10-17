const cors = require('cors');

// Allowed origins
const allowedOrigins = [
    "http://localhost:5173",  // Add your frontend domain here
    'http://another-allowed-domain.com'  // Additional domains can be added
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
