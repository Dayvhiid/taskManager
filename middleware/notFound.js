
export const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
        requestedUrl: req.originalUrl,
        method: req.method
    });
};


export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    // Default error status and message
    let status = err.statusCode || 500;
    let message = err.message || 'Internal server error';
    
    // Handle specific error types
    if (err.name === 'ValidationError') {
        status = 400;
        message = 'Validation error';
    } else if (err.name === 'CastError') {
        status = 400;
        message = 'Invalid ID format';
    } else if (err.code === 11000) {
        status = 400;
        message = 'Duplicate field value';
    }
    
    res.status(status).json({
        success: false,
        message: process.env.NODE_ENV === 'development' ? message : 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
};

