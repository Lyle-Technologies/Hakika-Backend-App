const nodemailer = require('nodemailer')

const sendEmail = async (email, subject, message) => {
  try {
      const transporter = nodemailer.createTransport({
          service: process.env.SERVICE,
          auth: {
              user: process.env.USER,
              pass: process.env.PASS
          }
      })
      await transporter.sendMail({
          from: process.env.USER,
          to: email,
          subject: subject,
          text: message
      })
      console.log('Email sent successfully')
  } catch (error) {
      console.log('Email not sent')
  }
}
module.exports = sendEmail;