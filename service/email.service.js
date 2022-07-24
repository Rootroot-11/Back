const EmailTemplates = require('email-templates');
const nodemailer = require('nodemailer');
const path = require('path');

const allTemplates = require('../email-templates');
const {SYSTEM_EMAIL, SYSTEM_PASSWORD} = require("../configs/variables");

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});

const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
    auth: {
        user: SYSTEM_EMAIL,
        pass: SYSTEM_PASSWORD
    }
});

const sendMail = async (userMail, emailAction, context = {}) => {
    const templateInfo = allTemplates[emailAction];

    if (!templateInfo) {
        throw new Error('Wrong template name');
    }

    const html = await templateParser.render(templateInfo.templateName, context);

    return transporter.sendMail({
        from: 'No reply',
        to: userMail,
        subject: templateInfo.subject,
        html
    });
};

module.exports = {sendMail};
