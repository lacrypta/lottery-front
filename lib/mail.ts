import nodemailer from "nodemailer";
import { MailParams } from "../types/mail";

export const sendEmail = async ({ fullname, email, winners }: MailParams) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.NEXT_PUBLIC_SMTP_HOST,
    port: parseInt(process.env.NEXT_PUBLIC_SMTP_PORT || "587"),
    // secure: true,
    auth: {
      user: process.env.NEXT_PUBLIC_SMTP_USERNAME || "", // generated ethereal user
      pass: process.env.NEXT_PUBLIC_SMTP_PASSWORD || "", // generated ethereal password
    },
  });

  // send mail with defined transport object
  return transporter.sendMail({
    from: '"La Crypta" <eventos@lacrypta.com.ar>',
    to: email,
    subject: "Ganadores del Sorteo", // Subject line
    text: "Sentime estos ganadores", // plain text body
    html: generateMailHTML({
      fullname,
      email,
      winners,
    }),
  });
};

const generateMailHTML = ({ fullname, email, winners }: MailParams) => {
  let html = "";
  html += '<div style="padding: 1em; background: white;">';
  html +=
    '  <div style="border: 1em solid black; padding: 1.5em; margin-top: 0.3em; color: black;">';
  html += '    <div style="text-align: right; margin: 0;">';
  html +=
    '        <img width="100" src="https://raw.githubusercontent.com/lacrypta/branding/main/black-skin/256.png" />';
  html += "    </div>";
  html += '    <div style="margin-top: 0.5em; font-size: 1.3em;">';
  html += "      <div>Ganadores del sorteo</div>";
  html += "      <div>Hacé click en el siguiente Link para verla</div>";
  html += '      <div><a href="%URL%">%URL%</a></div>';
  html += "    </h1>";
  html += "    ";
  html +=
    '    <div style="text-align: left; font-size: 0.8em; margin-top: 2.5em; padding-top: 0.7em; border-top: 1px solid black;line-height: 1.5em;">';
  html += "      <div>";
  html += "        <span>La Crypta</span>";
  html += "      </div>";
  html += "      <div>";
  html +=
    '        <span><img width="16" src="https://raw.githubusercontent.com/lacrypta/branding/main/mails/black/envelope.png" /></span>';
  html += "        <span>info@lacrypta.com.ar</span>";
  html += "      </div>";
  html += "      <div>";
  html +=
    '        <span><img width="16" src="https://raw.githubusercontent.com/lacrypta/branding/main/mails/black/phone.png" /></span>';
  html += "        <span>11 3108-0456</span>";
  html += "      </div>";
  html += "    </div>";
  html += '    <div style="text-align: center; margin-top: 1em;">';
  html +=
    '      <img height="15" src="https://raw.githubusercontent.com/lacrypta/branding/main/title/512.png" />';
  html += "    </div>";
  html += "  </div>";
  html += "";
  html += "</div>";

  html = html.replace(/%FULLNAME%/g, fullname);
  html = html.replace(/%EMAIL%/g, email);
  html = html.replace(/%URL%/g, url);

  return html;
};
