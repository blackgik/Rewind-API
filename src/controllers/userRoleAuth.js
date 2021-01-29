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
const userRegistration = async (userDet, role, res) => {
    try{
        // username validation
        const usernameNotTaken = await usernameValidation(userDet.username);
        if(!usernameNotTaken) {
            res.status(400).json({
                message: 'username already exist',
                success: false
            })
        }

        // email validation
        const userEmailNotTaken = await emailValidation(userDet.email)
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
        await newUser.save()
        verificationEmail(newUser.email, newUser.emailToken, newUser.username)
        const token = newUser.generateAuthToken()
        return res.status(201).json({
            newUser,
            token,
            message: 'Hurray, Let\'s get that nostalgic feeling sparked up',
            success: true
        })
    }catch(err) {
        console.log(err)
        return res.status(500).json({
            message: 'unable to register the user'
        })
    }

}

/**
 * 
 * @desc registrating the users {users, admin}
 * */ 

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

// username validation 
const usernameValidation = async (username)=> {
    const user = await User.findOne({ username })
    return user ? false : true
}

// email validation
const emailValidation = async (email)=> {
    const user = await User.findOne({ email })
    return user ? false : true
}


module.exports = {
    userRegistration,
    userLogin,
    userCount,
}