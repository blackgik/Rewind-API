const crypto = require('crypto');
const User = require('../Model/UserModel')
const {verificationEmail} = require('../services/emailVerify')
 
/**
 * 
 * @desc assigning roles to users (admin, users)
 * 
**/

/**
 * 
 * @desc registrating the users {users, admin}
 * */ 
const userRegistration = async (userDet, res, role) => {
    try{
        // username validation
        const usernameNotTaken = await usernameValidation(userDet.username, role);
        if(!usernameNotTaken) {
            res.status(400).json({
                message: 'username already exist',
                success: false
            })
        }

        // email validation
        const userEmailNotTaken = await emailValidation(userDet.email, role)
        if(!userEmailNotTaken) {
            res.status(400).json({
                message: 'userEmail has been taken',
                success: false
            })
        }

        const newUser = new User({
            ...userDet,
            role,
            emailToken: crypto.randomBytes(64).toString('hex'),
            isVerified: false
        })
        var username = ''
        if (userDet.email.includes('.')){
            username = userDet.email.split('.')[0]
        }
        if (userDet.email.includes('@')){
            username = userDet.email.split('@')[0]
        }
        // console.log(username)
        newUser.username = username
        await newUser.save()
        // verificationEmail(newUser.email, newUser.emailToken, newUser.username)
        const token = await newUser.generateAuthToken()
        return res.status(201).json({
            newUser,
            token,
            message: 'Hurray, Let\'s get that nostalgic feeling sparked up',
            success: true
        })
    }catch(err) {
        console.log(err)
        return res.status(500).json({
            message: errs
        })
    }

}

// user login validation
const userLogin = async (userCreds, role, res)=> {
    try{
        const { email, password} = userCreds
        const user = await User.findByCredentials( email, password)

        // if(!user.isVerified) {
        //     verificationEmail(user.email, user.emailToken, user.username)
        //     return res.status(400).json({
        //         message:'please check you mail to verify your account',
        //         success: false
        //     })   
        // }

        if(user.role !== role) {
            return res.status(400).json({
                message: 'please ensure you are logged in as the correct user',
                success: false
            })
        }

        const token = await user.generateAuthToken();

        res.status(202).json({
            user,
            token,
            message: 'you have successfully logged in',
            success: true
        })

    } catch(e) {
        console.log(e)
        res.status(404).send({
            error: 'invalid users'
        })
    }
}

/**
 * 
 *@desc admin getting all the users available 
 **/ 

 const userCount = async(role, res) => {
     if(role = 'admin'){
         try{
            const rewindUsers = []
            const allUsers = await User.find({})

            if(allUsers.role === 'users') {
                rewindUsers.push(allUsers)
                const count = rewindUsers.length()

                return res.status(200).json({
                    count,
                    success: true
                })
            }else{
                return res.status(404).json({
                    message:'users have not registered on the site yet'
                })
            }
         }catch(err) {

         }
     }
 }

/**
 * @desc validationg user for password
 * 
 * */

 const forgotPassword = async (userDet, res)=>{
    try{
        const { email } = userDet;
        const user = await User.findOne({ email })
        
        if(!user) {
            res.status(401).json({message:"user does not exist"})
        }

        token = jwt.sign({id:user._id.toString()}, process.env.RESET_LINK_TOKEN, {expiresIn: "20m"})

        sendPasswordEmailChange(user.email, user.username, token)

        user.passwordToken = token
        await user.save()
        res.status(200).json({message: 'token has been updated'})
    }catch(e){
        res.status(400).json({
            err: 'reset link failed'
        })
    }
}

/**
 * 
 * @desc reseting password link
 * */ 

 const resetPassword = async (userDet, res)=> {
    try{
        const passToken = req.query.token
        const { newPass, confirmPass} = userDet
        if(passToken) {
            jwt.verify(passToken, process.env.RESET_LINK_TOKEN, async (err, data)=> {
                if(err) {
                    res.status(401).json({error:"incorrect token or has expired"})
                }
                const user = await User.findOne({passwordToken: passToken})
                if (user){
                    user.password = newPass
                    user.confirmPassword = confirmPass
                    await user.save
                    res.status(200).json({message:'password has been reset'})
                }else{
                    res.status(404).json({err:'user does not exist'})
                }
            })
        }
    }catch(e){
        res.status(500).json({
            message: 'password can not be reset. please check your details'
        })
    }
}

/**
 * FURTHER CREDENTIALS EVALUATION ASIDE FROM THE SCHEMA EVALUATIONS.
 * TO ENSURE WE GET THE PROPER USERS REGISTERED
 * 
 * */ 

// username validation 
const usernameValidation = async (username, role)=> {
    const user = await User.findOne({ username, role:role })
    return user ? false : true
}

// email validation
const emailValidation = async (email, role)=> {
    const user = await User.findOne({ email, role:role })
    return user ? false : true
}


module.exports = {
    userRegistration,
    userLogin,
    userCount,
    forgotPassword,
    resetPassword,
}