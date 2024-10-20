export const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next(); // User is admin, proceed to the next middleware/route handler
    } else {
        res.status(403).json({ message: 'Admin access required' });
    }
};

