
import React, { useState } from 'react';
import { PremiumItem, Language, PremiumType } from '../types';

interface PremiumDetailProps {
  item: PremiumItem;
  isUnlocked: boolean;
  onUnlock: (id: string) => void;
  onBack: () => void;
  language: Language;
}

const PremiumDetail: React.FC<PremiumDetailProps> = ({ item, isUnlocked, onUnlock, onBack, language }) => {
  const isSwahili = language === Language.SW;
  const [step, setStep] = useState<'details' | 'checkout' | 'success'>('details');
  const [isSimulating, setIsSimulating] = useState(false);

  const t = {
    back: isSwahili ? "Rudi" : "Back",
    buy: isSwahili ? `Lipia sasa - ${item.price}` : `Pay Now - ${item.price}`,
    unlocking: isSwahili ? "Inasindika malipo..." : "Processing payment...",
    success: isSwahili ? "Malipo Yamefanikiwa!" : "Payment Successful!",
    preview: isSwahili ? "Maelezo ya Bidhaa" : "Product Overview",
    checkoutTitle: isSwahili ? "Malipo Salama (Stripe)" : "Secure Checkout (Stripe)",
    checkoutDesc: isSwahili ? "Lipia kwa usalama kwa kadi au simu." : "Securely pay with your card or mobile wallet.",
    cardNumber: isSwahili ? "Namba ya Kadi" : "Card Number",
    expiry: isSwahili ? "Tarehe" : "MM/YY",
    cvc: "CVC",
    pay: isSwahili ? `Lipia ${item.price}` : `Pay ${item.price}`,
    start: isSwahili ? "Anza Sasa" : "Start Now"
  };

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSimulating(true);
    // Simulate Stripe's sophisticated processing animation
    setTimeout(() => {
      onUnlock(item.id);
      setIsSimulating(false);
      setStep('success');
    }, 3000);
  };

  if (isUnlocked && step !== 'success') {
      return (
        <div className="animate-in fade-in slide-in-from-bottom-10 duration-700 pb-20">
             <button onClick={onBack} className="flex items-center space-x-2 text-slate-400 mb-8 hover:text-amber-500 transition-colors">
                <div className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
                </div>
                <span className="font-black text-[10px] uppercase tracking-widest">{t.back}</span>
            </button>

            <div className="bg-white rounded-[3rem] overflow-hidden shadow-premium border border-white/60 p-8 md:p-12">
                <div className="flex items-center space-x-3 mb-8">
                     <span className="px-3 py-1 bg-emerald-100 text-emerald-600 text-[9px] font-black uppercase tracking-widest rounded-lg">Unlocked Content</span>
                     <span className="text-slate-300 font-bold text-[10px] uppercase tracking-widest">• {item.type}</span>
                </div>
                <h1 className="text-3xl font-black text-slate-900 mb-8 leading-tight">{item.title}</h1>
                
                {item.type === PremiumType.VIDEO ? (
                    <div className="aspect-video bg-slate-900 rounded-[2.5rem] flex items-center justify-center text-white mb-10 overflow-hidden relative group">
                        <img src={item.imageUrl} className="absolute inset-0 w-full h-full object-cover opacity-40" />
                        <div className="relative z-10 w-20 h-20 bg-white/10 backdrop-blur-3xl rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform border border-white/20">
                            <svg className="w-8 h-8 text-white fill-current ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        </div>
                        <div className="absolute bottom-6 left-8 right-8 flex items-center justify-between text-[10px] font-black uppercase tracking-widest opacity-60">
                            <span>0:00 / Video Masterclass</span>
                            <span>Ultra HD</span>
                        </div>
                    </div>
                ) : (
                    <div className="lesson-body prose max-w-none mb-10">
                        {Array.isArray(item.content) ? item.content.map((p, i) => <p key={i}>{p}</p>) : <p>{item.content}</p>}
                        <div className="p-8 bg-indigo-50 rounded-[2rem] border border-indigo-100 mt-10">
                            <p className="text-indigo-900 font-bold text-sm italic mb-0">"Hii ni nakala yako ya kudumu. Unaweza kuipata wakati wowote kwenye Maktaba yako."</p>
                        </div>
                    </div>
                )}

                <button onClick={onBack} className="w-full bg-slate-900 text-white py-6 rounded-full font-black text-xs uppercase tracking-widest shadow-xl hover:bg-indigo-600 transition-all">
                    Endelea na Masomo Mengine
                </button>
            </div>
        </div>
      );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-10 duration-700 pb-20">
      <button onClick={onBack} className="flex items-center space-x-2 text-slate-400 mb-8 hover:text-amber-500 transition-colors">
        <div className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
        </div>
        <span className="font-black text-[10px] uppercase tracking-widest">{t.back}</span>
      </button>

      {step === 'details' && (
        <div className="bg-white rounded-[3rem] overflow-hidden shadow-premium border border-white/60">
            <div className="h-72 relative">
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                    <span className="px-3 py-1 bg-amber-500 text-white text-[9px] font-black uppercase tracking-widest rounded-lg mb-3 inline-block">
                        {item.type}
                    </span>
                    <h1 className="text-4xl font-black text-white tracking-tight leading-none">{item.title}</h1>
                </div>
            </div>

            <div className="p-10 md:p-14 space-y-12">
                <div>
                    <h3 className="text-xs font-black text-slate-300 uppercase tracking-widest mb-4">{t.preview}</h3>
                    <p className="text-slate-600 font-medium leading-relaxed text-lg">{item.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                        <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Duration</span>
                        <span className="text-base font-black text-slate-900">{item.duration}</span>
                    </div>
                    <div className="p-8 bg-amber-50 rounded-[2.5rem] border border-amber-100">
                        <span className="block text-[9px] font-black text-amber-500 uppercase tracking-widest mb-1">Gharama</span>
                        <span className="text-base font-black text-slate-900">{item.price}</span>
                    </div>
                </div>

                <button 
                    onClick={() => setStep('checkout')}
                    className="w-full bg-slate-900 text-white py-7 rounded-full font-black text-sm uppercase tracking-widest shadow-2xl hover:bg-amber-500 hover:scale-[1.02] transition-all duration-300"
                >
                    {t.buy}
                </button>
            </div>
        </div>
      )}

      {step === 'checkout' && (
        <div className="bg-white rounded-[3rem] shadow-premium border border-white/60 overflow-hidden animate-in zoom-in-95 duration-500">
            <div className="bg-slate-50 p-10 border-b border-slate-100">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-black text-slate-900">{t.checkoutTitle}</h2>
                    <div className="flex space-x-2">
                        <div className="w-8 h-5 bg-slate-200 rounded-sm"></div>
                        <div className="w-8 h-5 bg-slate-200 rounded-sm"></div>
                    </div>
                </div>
                <p className="text-slate-500 text-xs font-medium">{t.checkoutDesc}</p>
            </div>
            
            <form onSubmit={handlePurchase} className="p-10 space-y-8">
                <div className="space-y-4">
                    <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{t.cardNumber}</label>
                        <div className="relative">
                            <input 
                                type="text" 
                                placeholder="4242 4242 4242 4242" 
                                className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-5 font-medium focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                                required
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>
                            </div>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{t.expiry}</label>
                            <input 
                                type="text" 
                                placeholder="12 / 26" 
                                className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-5 font-medium focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{t.cvc}</label>
                            <input 
                                type="text" 
                                placeholder="•••" 
                                className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-5 font-medium focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-4">
                    <button 
                        type="submit"
                        disabled={isSimulating}
                        className="w-full bg-[#635BFF] text-white py-6 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-[#534bb3] disabled:opacity-50 flex items-center justify-center space-x-3 transition-all"
                    >
                        {isSimulating && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
                        <span>{isSimulating ? t.unlocking : t.pay}</span>
                    </button>
                    <p className="text-center text-[9px] font-bold text-slate-300 uppercase tracking-[0.2em] mt-6">Powered by Stripe</p>
                </div>
            </form>
        </div>
      )}

      {step === 'success' && (
        <div className="bg-white rounded-[3rem] p-16 shadow-premium border border-white/60 text-center animate-in zoom-in duration-700">
             <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-emerald-50 relative">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
                <div className="absolute -inset-2 bg-emerald-400/20 rounded-full animate-ping opacity-30"></div>
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-4">{t.success}</h2>
            <p className="text-slate-500 font-medium mb-12 text-lg">Gharama imekatwa na maarifa sasa ni yako milele. Hongera kwa kuwekeza kwako mwenyewe!</p>
            <button 
                onClick={() => setStep('details')}
                className="w-full bg-slate-900 text-white py-7 rounded-full font-black text-xs uppercase tracking-widest shadow-xl hover:bg-indigo-600 transition-all"
            >
                {t.start}
            </button>
        </div>
      )}
    </div>
  );
};

export default PremiumDetail;
