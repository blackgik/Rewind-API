const sgMail = require('@sendgrid/mail');
const fs = require('fs')
const path = require('path');


// setting the sendGrid_Api_KEY
sgMail.setApiKey(process.env.SEND_GRID_API);

// change the file name into base64_encoding...
const file = fs.readFileSync(path.resolve(__dirname, "../rewind-photo/" + 'Verify.png'));
const imageDate =  Buffer.from(file).toString("base64")

// verification email address
const verificationEmail = async  (email, emailToken, username)=> {
    console.log(process.env.BASE_URL)
    console.log(process.env.SEND_GRID_API)
    console.log(emailToken)
    const msg ={
        to:email,
        from: {
            email: 'c.echendu@genesystechhub.com',
            name: 'REWIND',
        },
        subject: 'VERIFY YOUR EMAIL',
        text:`
            thanks for registrating on Rewind website. Before we take you on the nostalgic experience,
            copy the link below and and post in you web browser.
            <http://${process.env.BASE_URL}/users/verify-email/?token=${emailToken}>
        ` ,
        html:`
            <h2>HELLO ${username}</h2>
            <p>At Rewind Its all about the experience...</p>
            <a href="http://${process.env.BASE_URL}/users/verify-email/?token=${emailToken}"> <img src="cid:image"/></a>
        `,
        attachments: [
            {
             filename: "Verify",
             type : "image/png",
             content: imageDate,
             content_id: "image",
             disposition : "inline"
            }
        ]
    }

    try{
        await sgMail.send(msg)
        console.log('email sent successfully')
    }catch(e){
        console.log(e)
    }
}


// creating another file for serving up the images on the welcome page
const file2 = fs.readFileSync(path.resolve(__dirname, "../rewind-photo/" + 'welcome.png'));
const imageData2 =  Buffer.from(file2).toString("base64")

// send welcoming email
const sendWelcomeEmail = async (userEmail, username)=> {
    const msg = {
        to: userEmail,
        from: {
            email: 'c.echendu@genesystechhub.com',
            name: 'REWIND',
        },
        subject: 'WELCOME TO REWIND',
        text: `$
            Hello {username}, 
            Welcome to rewind. Allow us help you with that nostalgic feeling`,
        html: `
            <p>Hello ${username}</p>
            <p><img src="cid:image"/><p
        `,
        attachments: [
            {
             filename: "welcome",
             type : "image/png",
             content: imageData2,
             content_id: "image",
             disposition : "inline"
            }
        ]
    }

    try{
        await sgMail.send(msg)
        console.log('emailsent successfully')
    }catch(e){
        console.log(e)
    }
  
}

const sendEmailCancelation = async (email, name)=>{
    try{
        await sgMail({
        to:email,
        from: {
            email: 'c.echendu@genesystechhub.com',
            name: 'REWIND',
        },
        subject: 'USER LOGOUT NOTIFICATION',
        text: `Hey ${name} we noticed you logout on your device, \n anything we could done to be better?`,
        html: `Hey ${name} we noticed you logout on your device, \n anything we could done to be better?`
    })
    }catch(e){
        console.log(e)
    }
}


module.exports = {
    verificationEmail,
    sendWelcomeEmail,
    sendEmailCancelation

}
