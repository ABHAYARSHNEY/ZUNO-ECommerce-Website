import jwt from 'jsonwebtoken';

const authUser = (req, res, next) => {
    const {token} = req.cookies;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
         if(decoded.userId){
             req.userId = decoded.userId;
         }
         else{
                return res.status(401).json({ message: 'Unauthorized: Invalid token' });

         }
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

export default authUser;