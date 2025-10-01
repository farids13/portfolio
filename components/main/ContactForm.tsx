'use client';
import React, { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string | null }>({ type: null, message: null });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', message: 'Semua field harus diisi' });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setStatus({ type: 'error', message: 'Format email tidak valid' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: null, message: null });

    const form = e.target as HTMLFormElement;
    const formDataObj = new FormData(form);
    formDataObj.append('access_key', 'YOUR_WEB3FORMS_ACCESS_KEY'); // Ganti dengan access key Anda
    formDataObj.append('subject', 'Pesan Baru dari Portfolio');
    formDataObj.append('from_name', formData.name);
    formDataObj.append('reply_to', formData.email);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataObj,
      });

      const data = await response.json();

      if (data.success) {
        setStatus({ 
          type: 'success', 
          message: 'Pesan berhasil dikirim! Saya akan segera menghubungi Anda.' 
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(data.message || 'Gagal mengirim pesan');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus({ 
        type: 'error', 
        message: 'Gagal mengirim pesan. Silakan coba lagi nanti.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0E21] px-4">
      <div className="bg-white rounded-3xl shadow-xl p-10 w-full m-10 ">
        <h2 className="text-3xl md:text-6xl font-bold text-center text-gray-900 my-10">
          LET&apos;S HAVE A CHAT
        </h2>
        
        {status.message && (
          <div className={`p-4 mb-6 rounded-lg text-center text-lg ${
            status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {status.message}
          </div>
        )}
        
        <form 
          onSubmit={handleSubmit} 
          action="https://api.web3forms.com/submit" 
          method="POST"
          className="space-y-8 mt-20 mx-10 text-2xl"
        >
          <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY" />
          <input type="hidden" name="subject" value="Pesan Baru dari Portfolio" />
          <input type="hidden" name="from_name" value="Portfolio Contact Form" />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="YOUR NAME"
            className="w-full bg-gray-200 placeholder-gray-600 text-gray-900 py-8 px-10 rounded-3xl focus:outline-none"
            disabled={isSubmitting}
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="EMAIL ADDRESS"
            className="w-full bg-gray-200 placeholder-gray-600 text-gray-900 py-8 px-10 rounded-3xl focus:outline-none"
            disabled={isSubmitting}
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="CHAT HERE"
            rows={4}
            className="w-full bg-gray-200 placeholder-gray-600 text-gray-900 py-8 px-10 rounded-3xl focus:outline-none resize-none"
            disabled={isSubmitting}
          ></textarea>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#EFFD60] text-black font-bold py-8 rounded-3xl hover:bg-[#e1ed4f] transition-all"
          >
            {isSubmitting ? 'SENDING...' : 'SUBMIT HERE'}
          </button>
        </form>
      </div>
    </div>
  );
}
