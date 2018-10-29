import { datumCreate } from '../actions/datum';
import crypto from 'crypto';
import transporter from './nodemailer';

export function sendMagicLinkEmail(userProfile) {
  const now = new Date();
  const oneHoursTime = new Date(now.getTime() + 1 * 1000 * 60 * 60);
  const magicLink = {
    userId: userProfile.id,
    expiry: oneHoursTime,
    key: crypto.randomBytes(20).toString('hex'),
  };
  datumCreate({ redisKey: 'magiclinks' }, { body: magicLink });
  const magicLinkUrl = `https://www.georgegillams.co.uk/magic-login/${
    magicLink.key
  }`;
  // Send the magic link URL to the email address of the user
  transporter.sendMail(
    {
      from: 'g@georgegillams.co.ukb',
      to: userProfile.email,
      subject: 'Your magic login link',
      text: `Your magic link is:
${magicLinkUrl}\n\nIt will expire ${oneHoursTime.toString()}`,
      html: `<div style="text-align: center;color: #1e1e1e;">
  <img src="https://i.imgur.com/Fvg8HXM.png" style="width: 7rem;">
  <p>
    Tap the button below to login
    <br><br><br>
    <a href="${magicLinkUrl}" style="background-color: #44aeff;padding: .9rem 1.2rem;color: white;border-radius: .2rem;text-decoration: none;">Log in</a>
    <br><br><br>
    <p>
      Once you're logged in, feel free to delete this email
    </p>
    <p>
      This once-use magic-link will expire ${oneHoursTime.toString()}
    </p>
  </p>
</div>`,
    },
    error => {
      if (error) {
        return console.log(error);
      }
    },
  );
}

export function sendEmailVerificationEmail(userProfile) {
  const now = new Date();
  const oneDaysTime = new Date(now.getTime() + 24 * 1000 * 60 * 60);
  const verificationLink = {
    userId: userProfile.id,
    expiry: oneDaysTime,
    key: crypto.randomBytes(20).toString('hex'),
  };
  datumCreate(
    { redisKey: 'emailVerificationCodes' },
    { body: verificationLink },
  );
  const emailVerificationLink = `https://www.georgegillams.co.uk/email-verification/${
    verificationLink.key
  }`;
  // Send the magic link URL to the email address of the user
  transporter.sendMail(
    {
      from: 'g@georgegillams.co.ukb',
      to: userProfile.email,
      subject: 'Verify your email address',
      text: `Your email verification link is:
${emailVerificationLink}\n\nIt will expire ${oneDaysTime.toString()}`,
      html: `<div style="text-align: center;color: #1e1e1e;">
  <img src="https://i.imgur.com/Fvg8HXM.png" style="width: 7rem;">
  <p>
    Please verify your email address using the button below.
    <br><br><br>
    <a href="${emailVerificationLink}" style="background-color: #44aeff;padding: .9rem 1.2rem;color: white;border-radius: .2rem;text-decoration: none;">Click here to verify your email address.</a>
    <br><br><br>
    <p>
      This verification link will expire ${oneDaysTime.toString()}
    </p>
  </p>
</div>`,
    },
    error => {
      if (error) {
        return console.log(error);
      }
    },
  );
}
