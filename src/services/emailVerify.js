const sgMail = require('@sendgrid/mail');


// setting the sendGrid_Api_KEY
sgMail.setApiKey(process.env.SEND_GRID_API);

// verification email address
const verificationEmail = async  (email, emailToken, username)=> {
    console.log(process.env.BASE_URL)
    console.log(process.env.SEND_GRID_API)
    console.log(emailToken)
    const msg ={
        to:email,
        from: 'c.echendu@genesystechhub.com',
        subject: 'VERIFY YOUR EMAIL',
        text:`
            thanks for registrating on Rewind website. Before we take you on the nostalgic experience,
            copy the link below and and post in you web browser.
            <http://${process.env.BASE_URL}/verify-email/?token=${emailToken}>
        ` ,
        html:`
            <h2>HELLO ${username}</h2>
            <p>thanks for registrating on Rewind website. Before we take you on the nostalgic experience,</p>
            <a href="http://${process.env.BASE_URL}/users/verify-email/?token=${emailToken}"> Verify Your Account</a>
        `
    }

    try{
        await sgMail.send(msg)
        console.log('email sent successfully')
    }catch(e){
        console.log(e)
    }
}

// send welcoming email
const sendWelcomeEmail = async (userEmail, username)=> {
    const msg = {
        to: userEmail,
        from:'c.echendu@genesystechhub.com',
        subject: 'WELCOME TO REWIND',
        text: `$
            Hello {username}, 
            Welcome to rewind. Allow us help you with that nostalgic feeling`,
        html: `
            <p>Hello ${username}</p>
            <p>Welcome to rewind. Allow us help you with that nostalgic feeling<p
        `
    }

    try{
        await sgMail.send(msg)
        console.log('emailsent successfully')
    }catch(e){
        console.log(e)
    }
  
}


module.exports = {
    verificationEmail,
    sendWelcomeEmail,

}
