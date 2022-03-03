const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.EMAIL_KEY);

/**
 * Sends a welcome email to the user.
 * @param {*} email 
 * @param {*} name 
 */
const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'bobbytate.oneword@gmail.com',
    subject: `Welcome to the Task App, ${name}!`,
    text: `Welcome to the Task App, ${name}! It's totes cool, right? Let me know if you hate it.`
  })
};

/**
 * Sends a cancellation email to the user.
 * @param {*} email 
 * @param {*} name 
 */
 const sendCancellationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'bobbytate.oneword@gmail.com',
    subject: `Sorry to see you go, ${name}.`,
    text: `Sorry to see you go, ${name}. It's totes sad. Let me know why you hated it.`
  })
};

module.exports = { sendWelcomeEmail, sendCancellationEmail }
