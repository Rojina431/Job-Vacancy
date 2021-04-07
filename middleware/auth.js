const config=require('config');
const jwt=require('jsonwebtoken');


function auth(req,res,next){
    var bearerToken='';
    const Token=(req.headers['authorization']);
    if(typeof Token!=="undefined"){
         const bearer=Token.split(' ')
         bearerToken=bearer[1]
         next();
         console.log(req.token)
    }else{
        res.sendStatus(403)
    }

    //check for token
    if(!bearerToken) {
        res.statusCode=400;
        res.json({msg:"No token,authorization denied"});
    } 

    //verify token
    try{
         const decode=jwt.verify(bearerToken,config.get('jwtSecret'))
         req.user=decode;
         next();
        }
    catch(e){
        res.status(400).json({msg:'Token is not valid'})
    }    
}

;

module.exports=auth;