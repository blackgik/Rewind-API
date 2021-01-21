const sgMail = require('@sendgrid/mail');
const jwt = require('jsonwebtoken');


// setting the sendGrid_Api_KEY
sgMail.setApiKey(process.env.SEND_GRID_API);

// 
// sending email with password link
const sendPasswordEmailChange = async (email, name, token)=> {
    
    const msg = {
        to: email,
        from:'c.echendu@genesystechhub.com',
        subject: 'CHANGE PASSWORD NOTIFICATION',
        text: `
            Hello ${name} kindly copy the link below and post on your browser to change your password
            <http://${process.env.BASE_URL}/users/reset-password/?token=${token}>
        `,
        html: `
            <h2>Hello ${name}</h2>
            <p>kindly click on the link below to change your password</p>
            <a href="http://${process.env.BASE_URL}/users/reset-password/?token=${token}">Change password</a>
        `
    }

    try{
        await sgMail.send(msg)
        console.log({
            meassage: 'password reset link has been sent successfully'
        })
    }catch(e){
        console.log(e)
    }
}

module.exports = {
    sendPasswordEmailChange
};