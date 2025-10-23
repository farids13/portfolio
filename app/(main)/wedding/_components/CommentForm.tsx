'use client';

import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

import { useScrollAnimations, FadeType } from '../_utils/scrollAnimations';

import { db } from '@/lib/firebase';

interface CommentFormProps {
    scrollY: number;
    start: number;
    end: number;
}

export default function CommentForm({ scrollY, start, end }: CommentFormProps) {
    const searchParams = useSearchParams();
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { createBackdropStyles, createContainerStyles } = useScrollAnimations({
        scrollY,
        start: start,
        end: end,
        fadeType: FadeType.BOTH,
        fadeInSpeed: 5,
        fadeOutSpeed: 5,
        fadeOutBuffer: 2,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitting) {return;}
        setIsLoading(true);
        if (!name.trim() || !message.trim()) { return; }

        setIsSubmitting(true);
        try {
            // Save to Firestore
            await addDoc(collection(db, 'comments'), {
                name: name.trim(),
                message: message.trim(),
                createdAt: serverTimestamp(),
                isApproved: true,
                likes: 0
            });

            // Reset form and show success
            setName('');
            setMessage('');
            setIsSubmitted(true);

            setTimeout(() => {
                setIsSubmitted(false);
            }, 5000);
        } catch (error) {
            console.error('Error submitting comment:', error);
            alert('Gagal mengirim komentar. Silakan coba lagi.');
        } finally {
            setIsLoading(false);
            setIsSubmitting(false);
        }
    };

    const thankYouMessage = (
        <div className="relative z-10 p-8 text-center pointer-events-none">
            <div className="text-6xl mb-6">💌</div>
            <h3 className="text-2xl font-bold text-amber-900 mb-3">Terima Kasih!</h3>
            <p className="text-amber-800/90 mb-8">Ucapan dan doa Anda sudah kami terima.</p>
        </div>
    );

    const formContent = (
        <div className="relative z-10 p-8 pointer-events-none">
            <div className='text-center mb-6'>
                <h3 className="text-3xl font-bold text-amber-900 tracking-wider font-allura">Ucapan & Doa</h3>
                <div className='h-px w-48 mb-2 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto my-4' />
                <p className="text-xs text-amber-700/80 mt-2 tracking-widest font-sans">KIRIM UCAPAN</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-amber-800/90 mb-1">Nama Anda</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pointer-events-auto w-full px-4 py-2 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-300 focus:border-amber-300 text-amber-900 placeholder-amber-600/50 bg-white/70"
                        placeholder="Masukkan nama Anda"
                        disabled={isSubmitting}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-amber-800/90 mb-1">Ucapan & Doa</label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={4}
                        className="pointer-events-auto w-full px-4 py-2 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-300 focus:border-amber-300 text-amber-900 placeholder-amber-600/50 bg-white/70 resize-none"
                        placeholder="Tuliskan ucapan dan doa Anda..."
                        disabled={isSubmitting}
                        required
                    />
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={isSubmitting || isLoading}
                        className="pointer-events-auto w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full hover:from-amber-600 hover:to-amber-700 transition-colors text-sm font-medium shadow-md hover:shadow-amber-200/50 flex items-center justify-center space-x-2 disabled:opacity-80 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Mengirim...
                          </>
                        ) : (
                          <>
                            <FaPaperPlane className="w-4 h-4" />
                            <span>Tinggalkan Ucapan</span>
                          </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );

    useEffect(() => {
        const guestName = searchParams.get('to');
        if (guestName) {
            setName(guestName);
        }
    }, [searchParams]);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-8 pointer-events-none"
            style={createBackdropStyles()}
        >
            <div className="relative w-full max-w-md min-w-[300px] bg-gradient-to-br rounded-lg from-white/90 to-amber-50/80 backdrop-blur-xs shadow-lg" style={createContainerStyles()}>
                {isSubmitted ? thankYouMessage : formContent}
            </div>
        </div>
    );
}
