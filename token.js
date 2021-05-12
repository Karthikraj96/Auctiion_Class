const jwt = require('jsonwebtoken')
module.exports.tokengenerate = async function (req) {
  token = await jwt.sign(req, process.env.JWT_SECRET, { expiresIn: '30mins' })
  return token
}
module.exports.tokendecode = async function (req) {
  let t = req.headers.authorization.split(' ')[1];
  try{
    const token =  JSON.parse(t)
    let decoded = await jwt.verify(token, process.env.JWT_SECRET);
    return decoded
  }
  catch(e){
    let decoded = await jwt.verify(token, process.env.JWT_SECRET);
    return decoded
  }
}
