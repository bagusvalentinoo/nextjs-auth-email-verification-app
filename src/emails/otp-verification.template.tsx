type OTPVerificationEmailTemplateProps = {
  name: string
  otp: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type: any
}

export const OTPVerificationEmailTemplate = ({
  name,
  otp,
  type
}: OTPVerificationEmailTemplateProps) => {
  return `
  <!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${
    type === 'sign-in'
      ? 'Two Factor Authentication'
      : type === 'email-verification'
      ? 'Verify Your Email'
      : 'Reset Your Password'
  }</title>
  <style>
    body {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      margin: 0;
      padding: 0;
      color: #333333;
      background-color: #f7f7f7;
      -webkit-text-size-adjust: none;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #ffffff;
    }
    .header {
      text-align: center;
      padding: 20px 0;
      border-bottom: 1px solid #eeeeee;
    }
    .logo {
      max-width: 150px;
      height: auto;
    }
    .content {
      padding: 30px 20px;
      line-height: 1.5;
    }
    .footer {
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #888888;
      border-top: 1px solid #eeeeee;
    }
    .otp-code {
      font-family: monospace;
      font-size: 32px;
      font-weight: bold;
      letter-spacing: 8px;
      text-align: center;
      margin: 30px 0;
      color: #000000;
    }
    .otp-container {
      background-color: #f5f5f5;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }
    .button {
      display: inline-block;
      padding: 12px 24px;
      background-color: #000000;
      color: #ffffff !important;
      text-decoration: none;
      border-radius: 4px;
      font-weight: bold;
      margin: 20px 0;
    }
    .highlight {
      color: #000000;
      font-weight: bold;
    }
    @media only screen and (max-width: 600px) {
      .container {
        width: 100% !important;
      }
      .content {
        padding: 20px 15px !important;
      }
      .otp-code {
        font-size: 28px;
        letter-spacing: 6px;
      }
    }
  </style>
</head>
<body>
  <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f7f7f7">
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table class="container" width="600" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff">
          <!-- Header -->
          <tr>
            <td class="header">
              NA - Next Auth
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td class="content">
              <h1 style="margin-top: 0; color: #000000; text-align: center;">
                ${type === 'sign-in' ? 'Two Factor Authentication' : ''}
                ${type === 'email-verification' ? 'Verify Your Email' : ''}
                ${type === 'forget-password' ? 'Reset Your Password' : ''}
              </h1>
              
              <p>Hello ${name},</p>
              
              <p>Please use the verification code below:</p>
              
              <table class="otp-container" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <div class="otp-code">${otp}</div>
                  </td>
                </tr>
              </table>
              
              <p>This code will expire in <span class="highlight">
                ${type === 'sign-in' ? '1 minute' : '5 minutes'}
              </span>.</p>
              
              <p>If you didn't request this code, you can safely ignore this email. Someone might have entered your email address by mistake.</p>
              
              <p>If you're having trouble with the verification process, please contact our support team.</p>
              
              <p>Best regards,<br>The Team</p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td class="footer">
              <p>&copy; 2025 Next Auth. All rights reserved.</p>
              <p>If you have any questions, please <a href="mailto:support@example.com" style="color: #888888; text-decoration: underline;">contact our support team</a>.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}
