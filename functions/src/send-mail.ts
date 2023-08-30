import { NodeMailgun } from 'ts-mailgun';
import * as dotenv from "dotenv";
const path = require('path')

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const mailer = new NodeMailgun();
mailer.apiKey = process.env.REACT_APP_MAILGUN_API_KEY!; // Set your API key
mailer.domain = process.env.REACT_APP_MAILGUN_DOMAIN!; // Set the domain you registered earlier
mailer.fromEmail = process.env.REACT_APP_MAILGUN_FROM_EMAIL!; // Set your from email
mailer.fromTitle = process.env.REACT_APP_MAILGUN_FROM_TITLE!; // Set the name you would like to send from

mailer.init();

// Send an email to test@example.com
const sendMail = (email: string, subject: string, message: string) => {
    mailer
	.send(email, subject, message)
	.then((result) => console.log('Done', result))
	.catch((error) => console.error('Error: ', error));
}

export default sendMail