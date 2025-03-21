import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: true,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD
  }
})

export const sendEmail = async ({
  to,
  subject,
  html
}: {
  to: string
  subject: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  html: any
}) => {
  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to,
    subject,
    html
  })
}
