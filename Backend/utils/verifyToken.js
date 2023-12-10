/*import jwt from 'jsonwebtoken';
export const verifyToken = (req,res,next)=>{
    const token = req.headers['authorization'];

    if (!token) {
      return res.status(403).json({ message: 'Token not provided' });
    }
  
    jwt.verify(token,"ShCQbOf1249059klXwepSU4jv9H18CI+OmYcx7lpuEk+8GTx3pAPCgxeV+QxpKQe", (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }
      // If the token is valid, you can proceed with the request.
      req.user = decoded;
      next();
    });
}


export const verifyUser = (req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.id === req.params.id || req.user.role ==='admin'){
            next()
        }else{
            return res.status(401).json({success:false,message:"you're not authentificated"})
        }
    });
};
export const verifyAdmin = (req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if( req.user.role ==='admin'){
            next()
        }else{
            return res.status(401).json({success:false,message:"you're not authorize"})
        }
    });
};*/