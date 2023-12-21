require("dotenv").config();
const { verifyToken } = require("../helper/token.helper");
const { getDetails } = require("../controller/auth.controller");
const AUTHKEY = process.env.AUTHKEY

class JWT {

  async authenticateJWT(req, res, next) {
    try {
      const authHeader = req.headers.access_token;
      const authkey = req.headers.authkey;
      // console.log(authHeader,authkey)
      if (authHeader && authHeader !== null && authkey) {
        if(AUTHKEY == authkey){
        const decoded = verifyToken(authHeader);
        // console.log(decoded)
            if(decoded){
                req.userId = decoded.userId.userId;
                req.code = decoded.userId.code;
                var user;
                const result = await getDetails(req.userId);
              // console.log(result)
                if (result && result.status) {
                  next();
                } else {
                  return res.status(403).json({
                    message: "Unauthorized",
                    status: false,
                    data: null,
                  });
                }
            }else{
              return res.status(403).json({
                message: "Unauthorized",
                status: false,
                data: null,
              });
            }
        } else {
          console.log("SDFA")
          return res.status(403).json({
            message: "Unauthorized",
            status: false
          });
        }
      } else {
        // console.log("SDFA")
        return res.status(403).json({
          message: "Unauthorized",
          status: false
        });
      }
    } catch (error) {
      console.log(error)
      return res.status(400).json({
        message: "Unauthorized",
        status: false
      });
    }
  }


}

module.exports = new JWT();
