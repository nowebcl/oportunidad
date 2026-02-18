'use client';

import InteractiveQuizForm from '@/components/InteractiveQuizForm';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
    return (
        <main className="min-h-screen w-full bg-[#020617] relative flex flex-col items-center justify-center overflow-x-hidden selection:bg-cyan-500/30">
            {/* Background Atmosferico Optimizado */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-black to-slate-900" />

                <motion.div
                    animate={{
                        opacity: [0.05, 0.1, 0.05],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    style={{ willChange: 'opacity' }}
                    className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] bg-blue-600/10 blur-[60px] rounded-full"
                />

                <motion.div
                    animate={{
                        opacity: [0.05, 0.1, 0.05],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                    style={{ willChange: 'opacity' }}
                    className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-cyan-600/10 blur-[60px] rounded-full"
                />

                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] brightness-75 contrast-125 mix-blend-overlay" />
            </div>

            {/* Botón WhatsApp - Ajustado para no interferir */}
            <a
                href="https://wa.me/56987843957"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 left-6 z-[60] group flex items-center justify-center w-14 h-14 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md hover:bg-white/[0.1] hover:border-emerald-500/40 transition-all duration-500 shadow-2xl active:scale-95"
            >
                <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                    <MessageCircle className="text-white" size={24} fill="currentColor" />
                </div>
            </a>

            {/* Hero Section / Form Area: Asegurando visibilidad Full Canvas en PC */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center justify-center h-screen py-8 md:py-12">
                <div className="w-full max-w-3xl relative">
                    {/* Brillo ambiental sutil detrás del form */}
                    <div className="absolute inset-0 bg-cyan-500/[0.03] blur-[80px] -z-10" />
                    <InteractiveQuizForm />
                </div>
            </div>

            {/* Branding Footer Centrado */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-0 opacity-20 hidden lg:block select-none pointer-events-none">
                <div className="flex items-center gap-4">
                    <div className="h-[1px] w-8 bg-white/20" />
                    <span className="text-[10px] font-bold tracking-[0.5em] text-white uppercase italic">desarrollado por noweb labs</span>
                    <div className="h-[1px] w-8 bg-white/20" />
                </div>
            </div>
        </main>
    );
}
