import nodemailer from 'nodemailer';

/**
 * Transmits verification email containing the 6-digit code to the recipient.
 * If SMTP keys are missing, prints the OTP directly in local logs for testing.
 * @param {string} email - Destination email address
 * @param {string} code - 6-digit plaintext code
 * @returns {Promise<boolean>} - True on successful dispatch or mock fallback
 */
export const sendOtpEmail = async (email, code) => {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM_EMAIL || 'info@cbite.com';

  // Check if SMTP is configured
  if (!host || !port || !user || !pass) {
    console.warn('\n[SMTP WARNING] SMTP parameters are missing from environment config.');
    console.log(`[DEV MOCK MAILBOX] Verification OTP for ${email} is: ${code}\n`);
    return true; // Return true to allow dev tests to proceed
  }

  // Create transporter configuration
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465, // secure: false for port 587 (STARTTLS)
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>CBite Verification Code</title>
        <style>
          body {
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            background-color: #fafafa;
            color: #334155;
            margin: 0;
            padding: 40px 20px;
          }
          .container {
            max-width: 500px;
            margin: 0 auto;
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 32px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          }
          .header {
            display: flex;
            align-items: center;
            margin-bottom: 24px;
          }
          .logo-mark {
            width: 32px;
            height: 32px;
            background-color: #2563eb;
            color: #ffffff;
            border-radius: 8px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 16px;
            margin-right: 10px;
          }
          .brand-name {
            font-size: 18px;
            font-weight: bold;
            color: #0f172a;
          }
          h2 {
            font-size: 20px;
            color: #0f172a;
            margin-top: 0;
            margin-bottom: 12px;
          }
          p {
            font-size: 14px;
            line-height: 1.6;
            color: #4b5563;
            margin-bottom: 24px;
          }
          .code-box {
            font-size: 32px;
            font-weight: 800;
            letter-spacing: 6px;
            color: #2563eb;
            background-color: #eff6ff;
            border: 1px solid #bfdbfe;
            border-radius: 8px;
            text-align: center;
            padding: 16px;
            margin-bottom: 24px;
            font-family: monospace;
          }
          .footer {
            font-size: 11px;
            color: #94a3b8;
            border-t: 1px solid #f1f5f9;
            padding-top: 16px;
            line-height: 1.5;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <span class="brand-name">CBite</span>
          </div>
          <h2>Verify your account</h2>
          <p>
            You requested a verification code to access your CBite account. Enter the 6-digit code below to finish signing in.
          </p>
          <div class="code-box">${code}</div>
          <p style="font-size: 12px; color: #64748b;">
            This verification code is valid for 5 minutes and can only be used once. If you did not make this request, you can safely ignore this email.
          </p>
          <div class="footer">
            <p style="margin:0; font-size: 11px; color: #94a3b8;">© 2026 CBite Pvt. Ltd. All rights reserved.</p>
            <p style="margin:4px 0 0; font-size: 11px; color: #94a3b8;">"C the Idea, Bite the Market."</p>
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"CBite" <${from}>`,
      to: email,
      subject: 'Your CBite verification code',
      text: `Your CBite verification code is ${code}. This code expires in 5 minutes and can only be used once. If you did not request this code, you can ignore this email.`,
      html: htmlContent
    });
    console.log('[SMTP DISPATCH] Verification email sent successfully');
    return true;
  } catch (error) {
    console.error('[SMTP ERROR] Failed to send verification email:', error.message);
    throw new Error('SMTP transmittal failed. Verify credentials in your env settings.');
  }
};
