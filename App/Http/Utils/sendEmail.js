const nodemailer=require("nodemailer");
const sendEmail= async (subject, send_to,send_from,message)=>{
    const transporter =nodemailer.createTransport({
        host:process.env.EMAIL_HOST,
        port:587,
        Auth:{
            user:process.env.EMAIL_uSER,
            pass:process.env.EMAIL_PASS

        }

    })
    let options = {
        from: send_from,
        to: send_to,
        subject: subject,
        html: message
      };
   transporter.sendMail(options, function(err, data) {
        if (err) {
          console.log("Error " + err);
        } else {
          console.log("Email sent successfully");
        }
      });
}
module.exports=sendEmail;

