import React, { useState, useEffect } from 'react';
import { DataService } from '../services/storage';
import { MenuItem, MenuCategory } from '../types';
import { X, ChevronLeft, ChevronRight, Coffee } from 'lucide-react';

const Menu: React.FC = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<MenuCategory | 'all'>('all');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    setItems(DataService.getMenu());
  }, []);

  const filteredItems = activeCategory === 'all' 
    ? items 
    : items.filter(item => item.category === activeCategory);

  const categories: { id: MenuCategory | 'all'; label: string; colorClass: string }[] = [
    { id: 'all', label: 'All Menu', colorClass: 'border-brand-coffee text-brand-coffee' },
    { id: 'coffee', label: 'Specialty Coffee', colorClass: 'border-brand-catCoffee text-brand-catCoffee' },
    { id: 'beverage', label: 'Coffee & Beverage', colorClass: 'border-brand-catBev text-brand-catBev' },
    { id: 'bakery', label: 'Master Bakery', colorClass: 'border-brand-catBaker text-brand-catBaker' },
    { id: 'brunch', label: 'Brunch & Meal', colorClass: 'border-brand-catBrunch text-brand-catBrunch' },
  ];

  // Helper to get accent color based on item category
  const getCategoryColor = (category: MenuCategory) => {
      switch(category) {
          case 'coffee': return 'text-brand-catCoffee';
          case 'beverage': return 'text-brand-catBev';
          case 'bakery': return 'text-brand-catBaker';
          case 'brunch': return 'text-brand-catBrunch';
          default: return 'text-brand-coffee';
      }
  };

  const getCategoryBg = (category: MenuCategory) => {
      switch(category) {
          case 'coffee': return 'bg-brand-catCoffee';
          case 'beverage': return 'bg-brand-catBev';
          case 'bakery': return 'bg-brand-catBaker';
          case 'brunch': return 'bg-brand-catBrunch';
          default: return 'bg-brand-coffee';
      }
  };

  const openModal = (index: number) => {
    setSelectedIndex(index);
  };

  const closeModal = () => {
    setSelectedIndex(null);
  };

  const showNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev !== null ? (prev + 1) % filteredItems.length : null));
    }
  };

  const showPrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null));
    }
  };

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, filteredItems.length]);

  const selectedItem = selectedIndex !== null ? filteredItems[selectedIndex] : null;

  return (
    <div className="pt-24 min-h-screen bg-brand-latte">
      {/* Header with separate look */}
      <div className="bg-brand-mocha py-16 mb-12 shadow-wood relative overflow-hidden">
        {/* Pattern overlay if desired */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="font-serif text-4xl md:text-5xl text-brand-cream mb-4 drop-shadow-md">MENU</h1>
          <p className="text-brand-wood">제로니모만의 특별한 미식 경험을 만나보세요</p>
        </div>
      </div>

      <div className="container mx-auto px-6 pb-24">
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            let activeClass = '';
            
            // Define active styles based on category color
            if (isActive) {
                if (cat.id === 'all') activeClass = 'bg-brand-coffee text-white border-brand-coffee';
                else if (cat.id === 'coffee') activeClass = 'bg-brand-catCoffee text-white border-brand-catCoffee';
                else if (cat.id === 'beverage') activeClass = 'bg-brand-catBev text-white border-brand-catBev';
                else if (cat.id === 'bakery') activeClass = 'bg-brand-catBaker text-white border-brand-catBaker';
                else if (cat.id === 'brunch') activeClass = 'bg-brand-catBrunch text-white border-brand-catBrunch';
            } else {
                activeClass = `bg-brand-cream hover:bg-white ${cat.colorClass}`;
            }

            return (
                <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setSelectedIndex(null); }}
                className={`px-6 py-3 text-sm font-bold tracking-wider uppercase transition-all duration-300 border-2 rounded-lg shadow-sm ${activeClass}`}
                >
                {cat.label}
                </button>
            )
          })}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-12 gap-y-16 max-w-5xl mx-auto">
          {filteredItems.map((item, index) => (
            <div 
              key={item.id} 
              className="flex flex-col sm:flex-row gap-6 group cursor-pointer bg-brand-cream p-5 rounded-xl shadow-wood hover:shadow-2xl transition-all duration-300 border border-brand-wood/20 hover:-translate-y-1"
              onClick={() => openModal(index)}
            >
              <div className="w-full sm:w-40 h-40 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 shadow-inner relative">
                <img 
                  src={item.imageUrl} 
                  alt={item.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                {/* Category color strip */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 ${getCategoryBg(item.category)}`}></div>
              </div>
              <div className="flex-grow flex flex-col justify-center border-b border-brand-wood/10 pb-2 sm:border-none sm:pb-0">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-xl font-serif text-brand-text group-hover:text-brand-coffee transition-colors">
                    {item.name}
                  </h3>
                  <span className={`text-lg font-bold ${getCategoryColor(item.category)}`}>
                    ₩ {item.price.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-brand-muted uppercase tracking-widest mb-2 font-medium">{item.nameEng}</p>
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                  {item.description}
                </p>
                {item.isSignature && (
                  <span className="inline-block mt-3 text-[10px] bg-brand-gold/20 text-brand-gold px-2 py-1 rounded-sm w-fit font-bold border border-brand-gold/30">
                    SIGNATURE
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center text-brand-muted py-20">
            해당 카테고리의 메뉴가 준비중입니다.
          </div>
        )}
      </div>

      {/* Detail Modal - Wood Theme */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-[100] bg-brand-coffee/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={closeModal}
        >
          {/* Navigation Buttons */}
          <button 
            onClick={showPrev}
            className="absolute left-4 md:left-8 text-brand-latte/70 hover:text-brand-gold hover:bg-brand-coffee/50 p-2 rounded-full transition-all z-[101]"
          >
            <ChevronLeft size={48} />
          </button>
          
          <button 
            onClick={showNext}
            className="absolute right-4 md:right-8 text-brand-latte/70 hover:text-brand-gold hover:bg-brand-coffee/50 p-2 rounded-full transition-all z-[101]"
          >
            <ChevronRight size={48} />
          </button>

          {/* Close Button */}
          <button 
            onClick={closeModal}
            className="absolute top-6 right-6 text-brand-latte/70 hover:text-brand-gold transition-colors z-[101]"
          >
            <X size={40} />
          </button>

          {/* Modal Content */}
          <div 
            className="relative bg-brand-cream w-full max-w-5xl rounded-lg shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] border-4 border-brand-coffee"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Section */}
            <div className="md:w-1/2 bg-gray-200 h-64 md:h-auto md:min-h-[500px]">
              <img 
                src={selectedItem.imageUrl} 
                alt={selectedItem.name} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info Section */}
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center overflow-y-auto bg-brand-cream relative">
               {/* Decorative Background Icon */}
               <Coffee className="absolute top-10 right-10 text-brand-wood/10 w-32 h-32 -z-0" />
               
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                    <span className={`text-xs font-bold uppercase tracking-widest text-white px-3 py-1 rounded-full ${getCategoryBg(selectedItem.category)}`}>
                    {categories.find(c => c.id === selectedItem.category)?.label || selectedItem.category}
                    </span>
                    {selectedItem.isSignature && (
                    <span className="text-xs font-bold uppercase tracking-widest bg-brand-gold text-white px-3 py-1 rounded-full shadow-sm">
                        Signature
                    </span>
                    )}
                </div>

                <h2 className="text-3xl md:text-4xl font-serif text-brand-text mb-2 leading-tight">
                    {selectedItem.name}
                </h2>
                <p className={`text-sm font-bold uppercase tracking-widest mb-6 ${getCategoryColor(selectedItem.category)}`}>
                    {selectedItem.nameEng}
                </p>
                
                <div className="w-12 h-1 bg-brand-wood/30 mb-6 rounded-full"></div>

                <p className="text-brand-muted leading-loose text-lg mb-8 font-light">
                    {selectedItem.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-6 border-t border-brand-wood/20">
                    <span className="text-brand-wood text-sm tracking-wider uppercase font-bold">Price</span>
                    <span className="text-3xl font-serif text-brand-text">₩ {selectedItem.price.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;