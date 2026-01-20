
import React from 'react';
import { Category, Language } from '../types';

interface CategoryPickerProps {
  onSelect: (c: Category) => void;
  language: Language;
}

const CategoryPicker: React.FC<CategoryPickerProps> = ({ onSelect, language }) => {
  const isSwahili = language === Language.SW;

  const categoryMeta = [
    { cat: Category.COMMUNICATION, color: 'bg-blue-500', icon: '💬' },
    { cat: Category.BUSINESS, color: 'bg-emerald-500', icon: '💼' },
    { cat: Category.LIFE_SKILLS, color: 'bg-amber-500', icon: '🌱' },
    { cat: Category.DIGITAL_SKILLS, color: 'bg-purple-500', icon: '💻' },
    { cat: Category.LEADERSHIP, color: 'bg-rose-500', icon: '👑' },
    { cat: Category.FINANCE, color: 'bg-cyan-500', icon: '💰' },
    { cat: Category.SPIRITUAL, color: 'bg-indigo-500', icon: '✨' },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-left-4 duration-300">
      <h2 className="text-3xl font-black text-slate-900 mb-2">{isSwahili ? 'Chagua Mada' : 'Pick a Topic'}</h2>
      <p className="text-slate-500 mb-10 font-medium">
        {isSwahili ? 'Ungependa kujifunza nini leo? Gusa mada uone somo.' : 'What would you like to learn today? Tap a topic to start.'}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {categoryMeta.map(({ cat, color, icon }) => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className="flex items-center p-6 bg-white border border-slate-100 rounded-[2rem] hover:border-indigo-300 hover:shadow-xl transition-all group shadow-sm"
          >
            <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center text-3xl mr-5 group-hover:scale-110 transition-transform shadow-lg`}>
              {icon}
            </div>
            <div className="text-left">
              <h3 className="font-black text-slate-800 text-lg group-hover:text-indigo-600 transition-colors">{cat}</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                {isSwahili ? 'Masomo mapya' : 'New lessons available'}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryPicker;
