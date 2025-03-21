type ResetPasswordEmailTemplateProps = {
  name: string
  url: string
  token: string
}

export const ResetPasswordEmailTemplate = ({
  name,
  url,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  token
}: ResetPasswordEmailTemplateProps) => {
  return `
  <!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
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
    .footer {
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #888888;
      border-top: 1px solid #eeeeee;
    }
    .code {
      display: inline-block;
      padding: 10px 20px;
      background-color: #f5f5f5;
      border: 1px solid #eeeeee;
      border-radius: 4px;
      font-family: monospace;
      font-size: 18px;
      letter-spacing: 2px;
      margin: 20px 0;
    }
    @media only screen and (max-width: 600px) {
      .container {
        width: 100% !important;
      }
      .content {
        padding: 20px 15px !important;
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
              <h1 style="margin-top: 0; color: #000000;">Reset Your Password</h1>
              <p>Hello ${name},</p>
              <p>We received a request to reset your password. If you didn't make this request, you can safely ignore this email.</p>
              
              <p>To reset your password, click the button below:</p>
              
              <p style="text-align: center;">
                <a href="${url}" class="button">Reset Password</a>
              </p>
              
              <p>This link will expire in 5 minutes.</p>
              
              <p>Best regards,<br>The Support Team</p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td class="footer">
              <p>&copy; 2025 Next Auth. All rights reserved.</p>
              <p>If you have any questions, please contact our support team.</p>
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
