// Ｗhen we develop a website, we need to design different functionalities to handle user requests and reponses
//So These functionalities are known as controllers, acting as mnasters of controlling the flow. 
// When a user sends a request, the controller exectues the approiate action based pn the request type and purpose, and provudes a response result.


// Defining an async function as login, and it is able to recive request and response argument
//check username, password in post (login) request 
//if exist create new JWT, and send back to the frontEnd 
const CustomAPIError = require('../errors/custom-error')
const jwt =require('jsonwebtoken')
const login = async (req,res ) => {
  const {username, password} = req.body;
  console.log('安安安ㄢ',username,password)
  // check username and password
  if (!username || !password){
    throw new CustomAPIError('please provide username and password', 400)
  }
  const id = new Date().getDate()




  const token = jwt.sign({id,username}, process.env.JWT_SECRET,{expiresIn:'30d'})

  res.status(200).json({msg:'user created',token})
}
// share the secret or authorized data 
// 做token
const dashboard = async (req,res)=>{

  const authHeader = req.headers.authorization;
  //Check whether the user has the authorization and the token starts with 'Bearer'.
  if (!authHeader || !authHeader.startsWith('Bearer') ) {
    throw new CustomAPIError('No token provide', 401)
  }   
  
  const Token = authHeader.split(' ')[1]
  console.log('Token',Token);
  //decode,verify
  try {
    const decoded = jwt.verify(Token,process.env.JWT_SECRET)
      // Create a random number between 1 and 100 and capture it as an integer.
      // responding success message which inculdes Hello, username and lucky number message 
    const luckyNumber = Math.floor(Math.random()*100)
    console.log(decoded)
    res.status(200).json({msg:`hello, ${decoded.username} `, secret:`Here is your authorized data, your lucky number is ${luckyNumber} `})
  } catch(error){
    console.log(error)
    throw new CustomAPIError('Not authorized to access this route', 401)
    
  }


}
module.exports = {
  login, dashboard
}