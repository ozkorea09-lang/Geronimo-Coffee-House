import React, { useEffect, useState } from 'react';
import { Award, Coffee, MapPin, Star, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { DataService } from '../services/storage';
import { AboutPageData } from '../types';

const About: React.FC = () => {
  const [data, setData] = useState<AboutPageData | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    setData(DataService.getAboutPage());
  }, []);

  if (!data) return <div className="min-h-screen bg-brand-latte text-brand-text pt-20 flex items-center justify-center">Loading...</div>;

  // Lightbox Logic
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = 'auto';
  };

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null && data.gallery.images.length > 0) {
      setLightboxIndex((prev) => (prev !== null ? (prev + 1) % data.gallery.images.length : null));
    }
  };

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null && data.gallery.images.length > 0) {
      setLightboxIndex((prev) => (prev !== null ? (prev - 1 + data.gallery.images.length) % data.gallery.images.length : null));
    }
  };

  return (
    <div className="w-full bg-brand-latte text-brand-text pt-20">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-brand-coffee">
        <div className="absolute inset-0">
          <img 
            src={data.hero.imageUrl} 
            alt="Hero Background" 
            className="w-full h-full object-cover animate-fade-in opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-brand-coffee/80"></div>
        </div>
        <div className="relative z-10 text-center px-6">
          <span className="text-brand-gold tracking-[0.3em] text-sm font-bold uppercase mb-6 block animate-fade-in-up drop-shadow-md">
            About Brand
          </span>
          <h1 className="font-serif text-5xl md:text-7xl mb-8 leading-tight drop-shadow-2xl animate-fade-in-up delay-100 whitespace-pre-line text-brand-cream">
            {data.hero.title}
          </h1>
          <p className="text-brand-wood max-w-2xl mx-auto text-lg font-light leading-relaxed animate-fade-in-up delay-200 whitespace-pre-line drop-shadow-md">
            {data.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-24 container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
            <div className="relative">
              <img 
                src={data.story.imageMain} 
                alt="Cafe Interior" 
                className="w-full rounded-lg shadow-wood transition-all duration-700 hover:shadow-2xl border border-brand-wood/10"
              />
              <div className="absolute -bottom-10 -right-10 w-2/3 hidden md:block">
                 <img 
                  src={data.story.imageSub} 
                  alt="Coffee Detail" 
                  className="w-full rounded-lg shadow-wood border-4 border-brand-cream transition-all duration-700 hover:scale-105"
                />
              </div>
            </div>
          </div>
          <div className="md:w-1/2 md:pl-10 mt-10 md:mt-0">
            <h2 className="font-serif text-4xl mb-8 leading-snug whitespace-pre-line text-brand-text">
              {data.story.title.includes('GERONIMO') ? (
                 <>
                   <span className="text-brand-gold">GERONIMO</span><br/>
                   COFFEE HOUSE
                 </>
              ) : data.story.title}
            </h2>
            <div className="space-y-6 text-gray-700 leading-8 text-justify">
              <p>{data.story.description1}</p>
              <p>{data.story.description2}</p>
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-brand-wood/20 mt-8">
                <div>
                  <h4 className="text-brand-coffee font-serif text-3xl mb-1">200+</h4>
                  <p className="text-sm text-brand-muted uppercase tracking-wider">Parking Spaces</p>
                </div>
                <div>
                  <h4 className="text-brand-coffee font-serif text-3xl mb-1">Master</h4>
                  <p className="text-sm text-brand-muted uppercase tracking-wider">Bakery Quality</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Icons */}
      <section className="bg-brand-cream py-24 border-y border-brand-wood/20 relative overflow-hidden shadow-sm">
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl text-brand-text mb-4">{data.philosophy.title}</h2>
            <p className="text-brand-wood">{data.philosophy.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {data.philosophy.items.map((item, idx) => (
              <div key={idx} className="p-10 bg-brand-latte border border-brand-wood/10 hover:border-brand-gold/50 transition-all duration-500 rounded-lg group shadow-wood hover:shadow-2xl hover:-translate-y-2">
                <div className="w-20 h-20 bg-brand-coffee/5 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:bg-brand-gold transition-colors duration-500">
                  {idx === 0 && <Coffee className="text-brand-coffee w-10 h-10 group-hover:text-white transition-colors duration-500" />}
                  {idx === 1 && <Award className="text-brand-coffee w-10 h-10 group-hover:text-white transition-colors duration-500" />}
                  {idx === 2 && <Star className="text-brand-coffee w-10 h-10 group-hover:text-white transition-colors duration-500" />}
                </div>
                <h3 className="text-2xl font-serif text-brand-text mb-4 group-hover:text-brand-coffee transition-colors">{item.title}</h3>
                <p className="text-brand-muted leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interior & Exterior Showcase (Dynamic Grid) */}
      <section className="py-24">
        <div className="container mx-auto px-6 mb-12 flex flex-col md:flex-row justify-between items-end">
          <div>
            <span className="text-brand-gold text-xs font-bold tracking-widest uppercase mb-2 block">Gallery</span>
            <h2 className="font-serif text-3xl md:text-4xl text-brand-text">{data.gallery.title}</h2>
          </div>
          <p className="text-brand-muted mt-4 md:mt-0 max-w-md text-right md:text-left">
            {data.gallery.description}
          </p>
        </div>
        
        {/* Full Width Grid - 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-fr bg-brand-coffee p-2 gap-2">
          {data.gallery.images.map((img, index) => (
            <div 
              key={img.id} 
              className="group relative h-96 overflow-hidden cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <img 
                src={img.url} 
                alt={img.caption} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100" 
              />
              <div className="absolute inset-0 bg-brand-coffee/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-[2px]">
                <span className="text-brand-cream font-serif text-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75 border-b-2 border-brand-gold pb-1">
                  {img.caption}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Location */}
      <section className="bg-brand-mocha/10 py-24 border-t border-brand-wood/20">
        <div className="container mx-auto px-6 flex flex-col items-center text-center">
           <div className="w-16 h-16 bg-brand-cream rounded-full flex items-center justify-center mb-6 border border-brand-wood/20 shadow-md">
              <MapPin size={24} className="text-brand-coffee" />
           </div>
           <h2 className="font-serif text-3xl text-brand-text mb-6">Come Visit Us</h2>
           <p className="text-brand-text text-lg font-medium mb-2">{data.location.address}</p>
           <p className="text-brand-muted mb-10 text-sm">{data.location.subAddress}</p>
           
           <div className="w-full max-w-5xl h-[450px] bg-white rounded-lg overflow-hidden relative group border-4 border-brand-cream shadow-wood">
             <iframe 
               src={`https://maps.google.com/maps?q=${encodeURIComponent("제로니모 커피하우스 " + data.location.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
               className="w-full h-full filter grayscale group-hover:grayscale-0 transition-all duration-500"
               allowFullScreen
               loading="lazy"
               referrerPolicy="no-referrer-when-downgrade"
               title="Google Map"
             ></iframe>
           </div>
        </div>
      </section>

       {/* Lightbox Modal */}
       {lightboxIndex !== null && data.gallery.images[lightboxIndex] && (
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
              src={data.gallery.images[lightboxIndex].url} 
              alt={data.gallery.images[lightboxIndex].caption} 
              className="max-w-full max-h-[80vh] object-contain shadow-2xl rounded-sm border-4 border-brand-wood/50"
            />
            <div className="mt-6 text-center bg-brand-coffee/50 px-6 py-2 rounded-full border border-brand-gold/30">
              <h3 className="text-brand-gold font-serif text-2xl">{data.gallery.images[lightboxIndex].caption}</h3>
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

export default About;