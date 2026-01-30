// Email utility structured for real provider (Resend/SendGrid/Nodemailer)
// For demo, this is a mock implementation

interface EmailOptions {
  to: string
  subject: string
  html: string
}

interface LeadNotificationData {
  source: 'tour' | 'custom'
  tourName?: string
  userEmail: string
  name?: string
  phone?: string
  message?: string
  dates?: string
  travelersCount?: number
  interests?: string[]
  budgetRange?: string
}

// Mock email sender - in production, replace with actual provider
export async function sendEmail(options: EmailOptions): Promise<{ success: boolean; messageId?: string }> {
  // Simulate email sending
  console.log('[Email Service] Sending email:', {
    to: options.to,
    subject: options.subject
  })
  
  // In production with Resend:
  // const resend = new Resend(process.env.RESEND_API_KEY)
  // const { data, error } = await resend.emails.send({
  //   from: 'Mongolia Travel <noreply@mongolia.travel>',
  //   to: options.to,
  //   subject: options.subject,
  //   html: options.html
  // })
  
  return {
    success: true,
    messageId: `mock_${Date.now()}`
  }
}

export async function sendLeadNotificationToAdmin(data: LeadNotificationData): Promise<boolean> {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@mongolia.travel'
  
  const sourceLabel = data.source === 'tour' ? 'Аялалын хүсэлт' : 'Тусгай аялалын хүсэлт'
  
  let detailsHtml = `
    <p><strong>И-мэйл:</strong> ${data.userEmail}</p>
    ${data.name ? `<p><strong>Нэр:</strong> ${data.name}</p>` : ''}
    ${data.phone ? `<p><strong>Утас:</strong> ${data.phone}</p>` : ''}
  `
  
  if (data.source === 'tour') {
    detailsHtml += `
      <p><strong>Аялал:</strong> ${data.tourName}</p>
      ${data.message ? `<p><strong>Мессеж:</strong> ${data.message}</p>` : ''}
    `
  } else {
    detailsHtml += `
      ${data.dates ? `<p><strong>Огноо:</strong> ${data.dates}</p>` : ''}
      ${data.travelersCount ? `<p><strong>Зорчигч:</strong> ${data.travelersCount}</p>` : ''}
      ${data.interests?.length ? `<p><strong>Сонирхол:</strong> ${data.interests.join(', ')}</p>` : ''}
      ${data.budgetRange ? `<p><strong>Төсөв:</strong> ${data.budgetRange}</p>` : ''}
      ${data.message ? `<p><strong>Мессеж:</strong> ${data.message}</p>` : ''}
    `
  }
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #1a4d3e; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f9f7f4; padding: 20px; border-radius: 0 0 8px 8px; }
        .footer { margin-top: 20px; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>${sourceLabel}</h2>
        </div>
        <div class="content">
          ${detailsHtml}
        </div>
        <div class="footer">
          <p>Mongolia Travel - Админ мэдэгдэл</p>
        </div>
      </div>
    </body>
    </html>
  `
  
  const result = await sendEmail({
    to: adminEmail,
    subject: `Шинэ ${sourceLabel.toLowerCase()} - ${data.userEmail}`,
    html
  })
  
  return result.success
}
