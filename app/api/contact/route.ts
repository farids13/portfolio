import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  // Validasi input
  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'Semua field harus diisi' },
      { status: 400 }
    );
  }

  // Konfigurasi transporter Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Email Anda
      pass: process.env.EMAIL_PASS, // Password/App Password email Anda
    },
  });

  try {
    // Kirim email
    await transporter.sendMail({
      from: `"${name}" <${email}>`, // Email pengirim
      to: 'faridsatria24@gmail.com', // Email tujuan (email Anda)
      replyTo: email, // Email balasan akan dikirim ke pengirim
      subject: `Pesan Baru dari ${name} - Portfolio Contact Form`,
      text: `
        Nama: ${name}
        Email: ${email}
        
        Pesan:
        ${message}
      `,
      html: `
        <h2>Pesan Baru dari Portfolio</h2>
        <p><strong>Nama:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Pesan:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    return NextResponse.json(
      { message: 'Pesan berhasil dikirim!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengirim pesan' },
      { status: 500 }
    );
  }
}
