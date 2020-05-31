const { email } =  require('../config')
const nodemailer = require('nodemailer')
const texts =  require('./i18n')

async function validateSite(siteName, lang, Site) {
    let result
    try {
        result = (siteName == texts()[lang].getGames7) ? await Site.findAll() : await Site.findByName(siteName)
    } catch (error) {
        console.log('Error getting site--> ', error)
        result = 500
    }

    return result
}

async function sendMail(email){
    let status
    const mailOptions = {
        from: 'workshopgl2020@gmail.com',
        to: email, 
        subject: 'Game Tournament!',
        html: `
        <div>
            <div style='background-color: #003685; padding: 20px 0px 20px 20px; text-align:left;'>
                <p style='color: #FFFFFF; font-weight: bold;'>Hello Gorillas,</p>
            </div>
            <div style='padding: 20px 0px 20px 20px; margin-top:1%;'>
                This is a testing mail sent via CHATBOT for workshop purposes :), ignore it.<br/>
            </div>
        </div>
        `
    };

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'workshopgl2020@gmail.com',
            pass: 'workshop123'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log("Error sending mail!! ----->", error);
            status = 500
        } else {
            console.log('Email sent: ' + info.response);
            status = 200
        }
    });
    
    return status
}

function parseDates (date) {
    const d = new Date(date)
    let month = '' + (d.getMonth() + 1)
    let day = '' + d.getDate()
    let year = d.getFullYear()

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

function validateMail (email) {
    return /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(gorillalogic)\.com$/.test(email)
}

module.exports = {
    sendMail,
    validateSite,
    parseDates,
    validateMail
}