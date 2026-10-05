import Mailgen from "mailgen";
import nodemailer from "nodemailer";


const sendEmail = async (options) => {
    const mailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Task Manager",
            link: "https://mailgen.js/",
        },
    });

    const emailTextual = mailGenerator.generatePlaintext(
        options.mailgenContent
    );
    const emailHtml = mailGenerator.generate(options.mailgenContent);

    const transport = nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port: process.env.MAILTRAP_SMTP_PORT,
        auth: {
            user: process.env.MAILTRAP_SMTP_USER,
            pass: process.env.MAILTRAP_SMTP_PASSWORD,
        },
    });

    const mail = {
        from: "mail.projectmanager@example.com",
        to: options.email,
        subject: options.subject,
        text: emailTextual,
        html: emailHtml,
    };

    try {
        return await transport.sendMail(mail);
    } catch (error) {
        console.error("Email service failed:", error);
        throw error;
    }
};


// const sendEmail = async (option) => {
//     const mailGenerator = new Mailgen({
//         theme: 'default',
//         product: {
//             name: 'Task Manager',
//             link: 'https://mailgen.js/'
//         }
//     });

//     const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);
//     const emailHtml = mailGenerator.generate(options.mailgenContent);

//     var transport = nodemailer.createTransport({
//         host: process.env.MAILTRAP_SMTP_HOST,
//         port: process.env.MAILTRAP_SMTP_PORT,
//         auth: {
//             user: process.env.MAILTRAP_SMTP_USER,
//             pass: process.env.MAILTRAP_SMTP_PASSWORD
//         }
//     });

//     const mail= {
//         from: "mail.projectmanager@example.com",
//         to: option.email,
//         subject: option.subject,
//         text: emailTextual,
//         html: emailHtml
//     }

//     try {
//         transport.sendMail(mail)
//     } catch (error) {
//         console.log("Email service failed : " + error);
        
//     }
// }

const emialVerificationMailgenContent = (username, verificationUrl) => {
    return {
        body: {
            name: username,
            intro: 'Welcome to Mailgen! We\'re very excited to have you on board.',
            action: {
                instructions: 'To verify the email please check on the following button',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'verify your email',
                    link: verificationUrl ?? 'https://mailgen.js/confirm?s=d9729feb74992cc3482b350163a1a010'
                }
            },
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'

        }
    }
}

const forgetPasswordMailgenContent = (username, passwordResetUrl) => {
    return {
        body: {
            name: username,
            intro: 'We got a request to reset the password of your account',
            action: {
                instructions: 'To reset your password click on the following button',
                button: {
                    color: '#2c724a',
                    text: 'Reset Password ',
                    link: verificationUrl ?? 'https://mailgen.js/confirm?s=d9729feb74992cc3482b350163a1a010'
                }
            },
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'

        }
    }
}

export { emialVerificationMailgenContent, forgetPasswordMailgenContent, sendEmail }