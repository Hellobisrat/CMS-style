const router = require('express').Router();
const User = require('../../models/User')

router.post('/',async(req,res)=>{
  try {
    const userData = await User.create(
      {
      username: req.body.username,
      email : req.body.email,
      password: req.body.password

      })
    req.session.save(()=>{
      req.session.loggedIn = true,
      res.status(200).json(userData)

    })
  } catch (error) {
     res.status(500).json(error)
  }

})



router.post('/login', async(req,res)=>{
  try {
    const userData =  await User.findAll({
      where : {
        email : req.body.email
      }
    })
    if(!userData){
      res
      .status(400)
      .json({message:'Incorrect email or password'})
    }
    const validPassword = await userData.checkPassword(req.body.password)
    if(!validPassword){
      res
      .status(400)
      .json({message:'Incorrect email or password'})
    }

    req.session.save(()=>{
      req.session.loggedIn=true,
      res
       .status(200)
       .json({user:userData, message:'you are logged In '})
    })

  } catch (error) {
    res.status(400).json(error)
  }
})


router.post('/logout', async(req,res)=>{
  if(req.session.loggedIn){
    req.session.destroy(()=>{
      res.status(200).end()
    })

  }
  else {
  res.status(400).end()
  }
})

module.exports = router;