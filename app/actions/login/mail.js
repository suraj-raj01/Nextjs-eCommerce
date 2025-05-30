
    'use server';
    import { sendEmail } from '../../../lib/sendEmail';
    import { revalidatePath } from 'next/cache';
    
    export async function sendContactForm(prevState:any, formData:FormData) {
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');
    
      if (!name || !email || !message) {
        return { success: false, message: 'All fields are required.' };
      }
    
      const result = await sendEmail({
        to: 'your-email@example.com',
        subject: `Contact Form Submission from ${name}`,
        html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
      });
    
      if (result.success) {
        revalidatePath('/contact');
        return { success: true, message: 'Email sent successfully!' };
      } else {
        return { success: false, message: 'Failed to send email.', error: result.error };
      }
    }