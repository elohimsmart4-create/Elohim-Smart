
import React from 'react';
import { Language, PremiumItem, PremiumType } from '../types';

interface PremiumSectionProps {
  language: Language;
  onSelectItem: (item: PremiumItem) => void;
  unlockedItems: string[];
}

const PremiumSection: React.FC<PremiumSectionProps> = ({ language, onSelectItem, unlockedItems }) => {
  const isSwahili = language === Language.SW;

  const t = {
    title: isSwahili ? "Premium Club" : "Premium Club",
    subtitle: isSwahili ? "Mafunzo ya kina kutoka kwa wataalamu nguli." : "In-depth training from world-class experts.",
    unlock: isSwahili ? "Fungua Sasa" : "Unlock Now",
    unlocked: isSwahili ? "Umemiliki" : "Owned"
  };

  const premiumData: PremiumItem[] = [
    {
      id: 'v1',
      title: isSwahili ? 'Mbinu za Kuuza (Sales Mastery)' : 'Sales Mastery Techniques',
      description: isSwahili ? 'Video fupi za dakika 5 zinazokufundisha namna ya kufunga mauzo kwa mteja yeyote.' : 'Short 5-minute videos teaching you how to close sales with any customer.',
      type: PremiumType.VIDEO,
      price: 'Tsh 7,500',
      duration: '45 mins total',
      imageUrl: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=400&auto=format&fit=crop',
      content: ['Karibu kwenye Video Masterclass.', 'Somo la kwanza: Psychology of the buyer.']
    },
    {
      id: 'p1',
      title: isSwahili ? 'Misingi ya Uwekezaji 2024' : 'Investment Fundamentals 2024',
      description: isSwahili ? 'Jifunze namna ya kukuza kipato chako kupitia hisa, hatifungani (bonds) na biashara.' : 'Learn how to grow your income through stocks, bonds, and business.',
      type: PremiumType.COURSE,
      price: 'Tsh 15,000',
      duration: '12 Lessons',
      imageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=400&auto=format&fit=crop',
      content: ['Karibu kwenye kozi ya uwekezaji.', 'Hapa utajifunza siri za matajiri wa Kitanzania na kimataifa.']
    },
    {
      id: 'p2',
      title: isSwahili ? 'Nguvu ya Mawasiliano' : 'The Power of Communication',
      description: isSwahili ? 'Ebook inayoelezea namna ya kushawishi watu, kupata marafiki na kujenga network.' : 'Ebook explaining how to influence people, win friends, and build a network.',
      type: PremiumType.EBOOK,
      price: 'Tsh 10,000',
      duration: '85 Pages',
      imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=400&auto=format&fit=crop',
      content: 'Kitabu hiki kina maarifa ya saikolojia ya hali ya juu kuhusu binadamu.'
    }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000 pb-20">
      <div className="mb-12 text-center">
        <div className="inline-block px-4 py-1.5 bg-amber-100 text-amber-600 text-[10px] font-black uppercase tracking-[0.4em] rounded-full mb-4 shadow-sm border border-amber-200">
          Gold Membership
        </div>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-3">{t.title}</h2>
        <p className="text-slate-500 font-medium max-w-xs mx-auto leading-relaxed">{t.subtitle}</p>
      </div>

      <div className="space-y-6">
        {premiumData.map(item => (
          <div 
            key={item.id}
            onClick={() => onSelectItem(item)}
            className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-premium border border-white/60 cursor-pointer hover:-translate-y-2 transition-all duration-500"
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/5 h-48 md:h-auto overflow-hidden relative">
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                {item.type === PremiumType.VIDEO && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-xl">
                      <svg className="w-5 h-5 text-slate-900 fill-current ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="md:w-3/5 p-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-amber-50 text-amber-600 text-[9px] font-black uppercase tracking-widest rounded-lg border border-amber-100">
                    {item.type}
                  </span>
                  <span className="text-slate-300 font-bold text-[10px] uppercase tracking-widest">{item.duration}</span>
                </div>
                
                <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-amber-600 transition-colors leading-tight">
                  {item.title}
                </h3>
                
                <p className="text-slate-500 text-xs font-medium mb-6 leading-relaxed line-clamp-2">
                  {item.description}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <span className="text-sm font-black text-slate-900">{item.price}</span>
                  <button className={`px-5 py-2.5 rounded-full font-black text-[9px] uppercase tracking-widest transition-all ${unlockedItems.includes(item.id) ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-900 text-white shadow-lg'}`}>
                    {unlockedItems.includes(item.id) ? t.unlocked : t.unlock}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PremiumSection;
