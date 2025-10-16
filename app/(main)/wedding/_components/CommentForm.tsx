'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { FaPaperPlane } from 'react-icons/fa';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Logger from '@/app/(main)/_utils/logger';

interface CommentFormProps {
    scrollY: number;
    start: number;
    end: number;
}

export default function CommentForm({ scrollY, start, end }: CommentFormProps) {
    const searchParams = useSearchParams();

    useEffect(() => {
        const guestName = searchParams.get('to');
        if (guestName) {
            setName(guestName);
        }
    }, [searchParams]);

    const getProgress = () => {
        if (scrollY < start) return 0;
        if (scrollY > end) return 1;
        return (scrollY - start) / (end - start);
    };

    const progress = getProgress();
    const ANIMATION_DURATION = 500;

    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !message.trim()) return;

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
            Logger.error('Gagal menyimpan komentar', error);
            alert('Gagal mengirim pesan. Silakan coba lagi.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const thankYouMessage = (
        <div className="relative z-10 p-8 text-center">
            <div className="text-6xl mb-6">💌</div>
            <h3 className="text-2xl font-bold text-amber-900 mb-3">Terima Kasih!</h3>
            <p className="text-amber-800/90 mb-8">Ucapan dan doa Anda sudah kami terima.</p>
        </div>
    );

    const formContent = (
        <div className="relative z-10 p-8">
            <div className='text-center mb-6'>
                <h3 className="text-4xl font-bold text-amber-900 tracking-wider font-allura">Ucapan & Doa</h3>
                <div className='h-px w-48 mb-2 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto my-4' />
                <p className="text-xs text-amber-700/80 mt-2 tracking-widest font-sans">KIRIM UCAPAN</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6 pointer-events-auto">
                <div>
                    <label className="block text-sm font-medium text-amber-800/90 mb-1">Nama Anda</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-300 focus:border-amber-300 text-amber-900 placeholder-amber-600/50 bg-white/70"
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
                        className="w-full px-4 py-2 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-300 focus:border-amber-300 text-amber-900 placeholder-amber-600/50 bg-white/70 resize-none"
                        placeholder="Tuliskan ucapan dan doa Anda..."
                        disabled={isSubmitting}
                        required
                    />
                </div>
                
                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full hover:from-amber-600 hover:to-amber-700 transition-colors text-sm font-medium shadow-md hover:shadow-amber-200/50 flex items-center justify-center space-x-2"
                    >
                        <FaPaperPlane className="w-4 h-4" />
                        <span>Tinggalkan Ucapan</span>
                    </button>
                </div>
            </form>
        </div>
    );

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-8"
            style={{
                opacity: progress < 0.1 ? progress * 10 : progress > 0.9 ? (1 - (progress - 0.9) * 10) : 1,
                transition: `opacity ${ANIMATION_DURATION}ms`,
                pointerEvents: 'none' as const,
            }}
        >
            <div className="relative w-full max-w-md min-w-[300px]">
                <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-white/90 to-amber-50/80 backdrop-blur-sm shadow-lg overflow-hidden border border-amber-100/50'>
                    <div className='absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,rgba(180,83,9,0.05)_25%,rgba(180,83,9,0.05)_26%,transparent_27%,transparent_74%,rgba(180,83,9,0.05)_75%,rgba(180,83,9,0.05)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(180,83,9,0.05)_25%,rgba(180,83,9,0.05)_26%,transparent_27%,transparent_74%,rgba(180,83,9,0.05)_75%,rgba(180,83,9,0.05)_76%,transparent_77%,transparent)] bg-[length:30px_30px] opacity-20'></div>
                </div>
                
                {isSubmitted ? thankYouMessage : formContent}
            </div>
        </div>
    );
}
