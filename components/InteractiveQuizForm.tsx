'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  AlertCircle,
  Calendar,
  User,
  MessageSquare,
  Send,
  ShieldCheck,
  ChevronRight,
  Check,
  Loader2,
  TrendingUp,
  Target,
  Rocket
} from 'lucide-react';
import { enviarLead } from '@/app/actions';

// --- Esquema de Datos ---
interface QuizData {
  industry: string;
  painPoint: string;
  timeline: string;
  budget: string;
  name: string;
  whatsapp: string;
}

const InteractiveQuizForm = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<QuizData>();

  const currentTimeline = watch('timeline');
  const currentBudget = watch('budget') || '';

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const onSubmit = async (data: QuizData) => {
    setIsSubmitting(true);
    try {
      const result = await enviarLead(data);
      if (result.success) {
        setIsSuccess(true);
        if (typeof window !== 'undefined' && window.fbq) {
          window.fbq('track', 'Lead', {
            content_name: 'Formulario Estrategia Web',
            value: 0.00,
            currency: 'CLP'
          });
        }
      } else {
        alert('Error al enviar. Intenta de nuevo.');
      }
    } catch (error) {
      alert('Error de conexión.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-black/60 backdrop-blur-3xl border border-emerald-500/20 rounded-[2.5rem] p-8 md:p-12 text-center space-y-6 md:space-y-8 mx-4 shadow-2xl"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-emerald-500 text-white shadow-[0_0_40px_rgba(16,185,129,0.4)]">
          <Check size={32} strokeWidth={3} className="md:w-10 md:h-10" />
        </div>
        <div className="space-y-2 md:space-y-3">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-none uppercase">Análisis Completo</h2>
          <p className="text-white/60 text-sm md:text-lg font-light leading-relaxed max-w-sm mx-auto">
            Hemos recibido tus datos. Un consultor senior de **noweb** te contactará en breve vía WhatsApp.
          </p>
        </div>
        <button onClick={() => window.location.reload()} className="px-6 py-2.5 md:px-8 md:py-3 bg-white/5 border border-white/10 rounded-full text-white/40 text-[10px] md:text-xs font-bold tracking-widest hover:text-white hover:bg-white/10 transition-all">REINICIAR</button>
      </motion.div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      {/* Header Premium y Espacioso */}
      <div className="flex flex-col items-center mb-4 md:mb-6 space-y-3 md:space-y-4">
        <h2 className="text-xl md:text-4xl font-bold text-white tracking-tight text-center flex items-center gap-3 md:gap-4">
          Evolución Digital <TrendingUp className="text-cyan-400 w-6 h-6 md:w-8 md:h-8" strokeWidth={2.5} />
        </h2>
        <div className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md">
          <ShieldCheck size={12} className="text-emerald-400 md:w-3.5 md:h-3.5" />
          <span className="text-[8px] md:text-xs font-black text-emerald-400 tracking-[0.2em] md:tracking-[0.3em] uppercase">Encriptación activa</span>
        </div>
      </div>

      {/* Tarjeta del Formulario: Ajustada para el canvas móvil */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full bg-slate-900/40 backdrop-blur-3xl rounded-[2rem] md:rounded-[3rem] border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 md:h-1.5 bg-white/5 flex z-50">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex-1 h-full relative overflow-hidden border-r border-black/20 last:border-0">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                initial={{ x: '-100%' }}
                animate={{ x: s <= step ? '0%' : '-100%' }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:px-12 md:py-10">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="s1" variants={containerVariants} initial="initial" animate="animate" exit="exit" className="space-y-6 md:space-y-8">
                <div className="space-y-2 md:space-y-3">
                  <h3 className="text-xl md:text-3xl font-bold text-white flex items-center gap-2 md:gap-3">
                    <Target className="text-cyan-400 w-5 h-5 md:w-7 md:h-7" /> Definición Objetiva
                  </h3>
                  <p className="text-white/40 text-xs md:text-base font-light italic">Establezcamos la base estratégica.</p>
                </div>
                <div className="space-y-4 md:space-y-6">
                  <div className="space-y-2 md:space-y-4">
                    <label className="text-[9px] md:text-[11px] font-black text-white/30 uppercase tracking-[0.2em] md:tracking-[0.3em] px-1">Sector Industrial</label>
                    <div className="relative group">
                      <Briefcase size={16} className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-cyan-400 transition-colors md:w-[18px] md:h-[18px]" />
                      <input {...register('industry', { required: true })} placeholder="Ej: Construcción..." className="w-full bg-white/[0.03] border border-white/10 p-4 md:p-5 pl-12 md:pl-14 rounded-xl md:rounded-2xl text-sm md:text-base text-white focus:border-cyan-500 focus:bg-white/[0.07] outline-none transition-all font-medium" />
                    </div>
                  </div>
                  <div className="space-y-2 md:space-y-4">
                    <label className="text-[9px] md:text-[11px] font-black text-white/30 uppercase tracking-[0.2em] md:tracking-[0.3em] px-1">Meta Principal</label>
                    <div className="relative group">
                      <AlertCircle size={16} className="absolute left-4 md:left-5 top-5 md:top-6 text-white/20 group-focus-within:text-cyan-400 transition-colors md:w-[18px] md:h-[18px]" />
                      <textarea {...register('painPoint', { required: true })} rows={2} placeholder="Ej: Vender 24/7..." className="w-full bg-white/[0.03] border border-white/10 p-4 md:p-5 pl-12 md:pl-14 rounded-xl md:rounded-2xl text-sm md:text-base text-white focus:border-cyan-500 focus:bg-white/[0.07] outline-none transition-all resize-none font-medium md:min-h-[100px]" />
                    </div>
                  </div>
                </div>
                <button type="button" onClick={nextStep} className="w-full py-4 md:py-5 bg-white text-black font-black rounded-xl md:rounded-2xl text-[10px] md:text-sm tracking-[0.2em] shadow-[0_20px_40px_-10px_rgba(255,255,255,0.2)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 md:gap-3">
                  SIGUIENTE NIVEL <ChevronRight size={18} className="md:w-5 md:h-5" />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="s2" variants={containerVariants} initial="initial" animate="animate" exit="exit" className="space-y-6 md:space-y-8">
                <div className="space-y-2 md:space-y-3">
                  <h3 className="text-xl md:text-3xl font-bold text-white flex items-center gap-2 md:gap-3">
                    <Calendar className="text-cyan-400 w-5 h-5 md:w-7 md:h-7" /> Viabilidad Técnica
                  </h3>
                  <p className="text-white/40 text-xs md:text-base font-light italic">Ajustemos tiempos y recursos.</p>
                </div>
                <div className="space-y-6 md:space-y-8">
                  <div className="space-y-3 md:space-y-4">
                    <label className="text-[9px] md:text-[11px] font-black text-white/30 uppercase tracking-[0.2em]">Prioridad</label>
                    <div className="grid grid-cols-3 gap-2 md:gap-3">
                      {['Urgente', '30 días', 'Planificar'].map((opt) => (
                        <button key={opt} type="button" onClick={() => setValue('timeline', opt)} className={`py-3 md:py-4 rounded-xl border text-[9px] md:text-xs font-black transition-all uppercase tracking-widest ${currentTimeline === opt ? 'bg-cyan-500 border-cyan-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.5)]' : 'bg-white/5 border-white/10 text-white/30 hover:bg-white/10 hover:text-white'}`}>{opt}</button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3 md:space-y-4">
                    <label className="text-[9px] md:text-[11px] font-black text-white/30 uppercase tracking-[0.2em]">Inversión Estimada</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                      {[
                        { l: '$100k - $500k', v: 'initial' },
                        { l: '$500k - $1.5M', v: 'pro' },
                        { l: '+$1.5M', v: 'expert' },
                        { l: 'Monto Personalizado', v: 'custom' }
                      ].map((r) => (
                        <div key={r.v} className="relative">
                          <button type="button" onClick={() => setValue('budget', r.l)} className={`w-full py-3 md:py-4 px-4 md:px-5 rounded-xl border text-[9px] md:text-xs font-black text-left flex justify-between items-center transition-all ${currentBudget.includes(r.l) || (r.v === 'custom' && currentBudget.includes('Personalizado')) ? 'bg-white/10 border-cyan-500/50 text-white' : 'bg-white/[0.03] border-white/10 text-white/30 hover:border-white/30'}`}>
                            {r.l}
                            <div className={`w-3.5 h-3.5 md:w-4 md:h-4 rounded-full border flex items-center justify-center ${currentBudget.includes(r.l) || (r.v === 'custom' && currentBudget.includes('Personalizado')) ? 'border-cyan-500' : 'border-white/10'}`}>{(currentBudget.includes(r.l) || (r.v === 'custom' && currentBudget.includes('Personalizado'))) && <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-cyan-500" />}</div>
                          </button>
                        </div>
                      ))}
                    </div>
                    {(currentBudget.includes('Personalizado') || currentBudget.includes('custom') || currentBudget.includes('Monto')) ? (
                      <motion.input initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} required type="text" placeholder="Indica el monto..." className="w-full bg-cyan-500/5 border border-cyan-500/40 p-4 md:p-5 rounded-xl md:rounded-2xl text-xs md:text-sm text-white placeholder:text-white/20 outline-none focus:border-cyan-400 transition-all font-medium" onChange={(e) => setValue('budget', `Monto Personalizado: ${e.target.value}`)} />
                    ) : null}
                  </div>
                </div>
                <div className="flex gap-3 md:gap-4">
                  <button type="button" onClick={prevStep} className="flex-1 py-4 md:py-5 text-white/30 font-black text-[10px] md:text-xs border border-white/10 rounded-xl md:rounded-2xl uppercase tracking-[0.2em] hover:bg-white/5 transition-all">Anterior</button>
                  <button type="button" onClick={nextStep} className="flex-[2] py-4 md:py-5 bg-white text-black font-black rounded-xl md:rounded-2xl text-[10px] md:text-sm tracking-[0.2em] shadow-xl active:scale-95 transition-all uppercase">Siguiente</button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="s3" variants={containerVariants} initial="initial" animate="animate" exit="exit" className="space-y-8 md:space-y-10">
                <div className="text-center space-y-3 md:space-y-4">
                  <div className="inline-flex p-2.5 md:p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mb-2">
                    <Rocket size={24} className="md:w-8 md:h-8" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tighter">Último paso</h3>
                  <p className="text-white/40 text-sm md:text-base font-light italic">¿Dónde te enviamos tu diagnóstico?</p>
                </div>
                <div className="space-y-3 md:space-y-4">
                  <div className="relative group">
                    <User size={16} className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-cyan-400 transition-colors md:w-[18px] md:h-[18px]" />
                    <input {...register('name', { required: true })} placeholder="NOMBRE COMPLETO" className="w-full bg-white/[0.03] border border-white/10 p-4 md:p-5 pl-12 md:pl-14 rounded-xl md:rounded-2xl text-sm md:text-base text-white placeholder:text-white/10 font-bold tracking-widest outline-none focus:border-cyan-500" />
                  </div>
                  <div className="relative group">
                    <MessageSquare size={16} className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-cyan-400 transition-colors md:w-[18px] md:h-[18px]" />
                    <input {...register('whatsapp', { required: true })} type="tel" placeholder="NÚMERO WHATSAPP" className="w-full bg-white/[0.03] border border-white/10 p-4 md:p-5 pl-12 md:pl-14 rounded-xl md:rounded-2xl text-sm md:text-base text-white placeholder:text-white/10 font-bold tracking-widest outline-none focus:border-cyan-500" />
                  </div>
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full py-5 md:py-6 bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 text-white font-black text-[11px] md:text-sm tracking-[0.2em] md:tracking-[0.3em] rounded-xl md:rounded-2xl shadow-[0_30px_60px_-15px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2 md:gap-3 active:scale-[0.98] transition-all disabled:opacity-50">
                  {isSubmitting ? <><Loader2 className="animate-spin w-4 h-4 md:w-5 md:h-5" /> PROCESANDO...</> : <>ENVIAR DIAGNÓSTICO</>}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </motion.div>
    </div>
  );
};

export default InteractiveQuizForm;
