import React, { useState, useEffect } from 'react';
import { DataService } from '../services/storage';
import { GalleryItem } from '../types';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const Gallery: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    setItems(DataService.getGallery());
  }, []);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    document.body.style.overflow = 'auto'; // Restore scrolling
  };

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev !== null ? (prev + 1) % items.length : null));
    }
  };

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev !== null ? (prev - 1 + items.length) % items.length : null));
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') setSelectedIndex((prev) => (prev !== null ? (prev + 1) % items.length : null));
      if (e.key === 'ArrowLeft') setSelectedIndex((prev) => (prev !== null ? (prev - 1 + items.length) % items.length : null));
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, items.length]);

  return (
    <div className="pt-24 min-h-screen bg-brand-latte">
      <div className="bg-brand-mocha py-16 mb-12 shadow-wood relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="font-serif text-4xl md:text-5xl text-brand-cream mb-4">GALLERY</h1>
          <p className="text-brand-wood">공간의 미학, 그 이상의 감동</p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 pb-24">
        {items.length === 0 ? (
          <div className="text-center text-gray-500 py-20">등록된 갤러리 이미지가 없습니다.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((img, index) => (
              <div 
                key={img.id} 
                className="relative group overflow-hidden aspect-square cursor-pointer bg-brand-cream rounded-lg shadow-wood hover:shadow-2xl transition-all duration-300 border border-brand-wood/20"
                onClick={() => openLightbox(index)}
              >
                <img 
                  src={img.imageUrl} 
                  alt={img.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-brand-coffee/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                  <span className="text-brand-cream font-serif text-lg tracking-wider border-b-2 border-brand-gold pb-1 bg-brand-coffee/80 px-4 py-2 rounded-sm shadow-lg">
                    {img.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && items[selectedIndex] && (
        <div 
          className="fixed inset-0 z-[100] bg-brand-coffee/90 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in"
          onClick={closeLightbox}
        >
          <button 
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-brand-latte/70 hover:text-brand-gold transition-colors z-[101]"
          >
            <X size={40} />
          </button>

          <button 
            onClick={showPrev}
            className="absolute left-4 md:left-8 text-brand-latte/70 hover:text-brand-gold hover:bg-white/10 p-2 rounded-full transition-all z-[101]"
          >
            <ChevronLeft size={48} />
          </button>

          <div 
            className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center" 
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={items[selectedIndex].imageUrl} 
              alt={items[selectedIndex].title} 
              className="max-w-full max-h-[80vh] object-contain shadow-2xl rounded-sm border-4 border-brand-wood/50"
            />
            <div className="mt-6 text-center bg-brand-coffee/50 backdrop-blur-md px-8 py-3 rounded-full border border-brand-wood/30">
              <h3 className="text-brand-gold font-serif text-2xl">{items[selectedIndex].title}</h3>
              <p className="text-brand-latte/80 text-sm mt-1 uppercase tracking-widest inline-block">
                {items[selectedIndex].category}
              </p>
            </div>
          </div>

          <button 
            onClick={showNext}
            className="absolute right-4 md:right-8 text-brand-latte/70 hover:text-brand-gold hover:bg-white/10 p-2 rounded-full transition-all z-[101]"
          >
            <ChevronRight size={48} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;