import nodemailer from 'nodemailer';
export const nodemailerEmail = (email, subject, text) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        tls: {
            rejectUnauthorized: false
        },
        auth: {
            user: Enter your email,
            pass: Enter your generated password
        },
        connectionTimeout: 5 * 60 * 1000, // 5 min
    });
    var mailOptions = {
        from: Enter email,
        to: enter email,
        subject: subject,
        text: text
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log(info);
        }
    });
}