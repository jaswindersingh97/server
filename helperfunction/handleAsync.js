const handleAsync = (fn) => {
    return async (req, res) => {
        try {
            await fn(req, res);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Server error occurred.' });
        }
    };
};

module.exports = handleAsync;