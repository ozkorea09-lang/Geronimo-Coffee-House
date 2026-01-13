import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { DataService } from '../services/storage';
import { MenuItem } from '../types';

const Home: React.FC = () => {
  const [featuredItems, setFeaturedItems] = useState<MenuItem[]>([]);
  const config = DataService.getConfig();

  useEffect(() => {
    // Get signatures items
    const allItems = DataService.getMenu();
    setFeaturedItems(allItems.filter(item => item.isSignature).slice(0, 3));
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-brand-coffee">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/id/431/1920/1080" 
            alt="Coffee House Interior" 
            className="w-full h-full object-cover opacity-80"
          />
          {/* Warm Coffee Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-coffee/60 via-brand-coffee/30 to-brand-coffee/90"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h2 className="text-brand-gold tracking-[0.3em] text-sm md:text-base font-bold mb-4 animate-pulse uppercase drop-shadow-md">
            Since 2021
          </h2>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-brand-cream mb-6 leading-tight tracking-tight drop-shadow-2xl">
            {config.heroTitle.split('&').map((part, i) => (
                <span key={i} className="block">{part} {i === 0 && <span className="text-brand-gold">&</span>}</span>
            ))}
          </h1>
          <p className="text-brand-latte text-lg md:text-xl font-light mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            {config.heroSubtitle}
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <Link 
              to="/menu" 
              className="px-8 py-4 bg-brand-gold hover:bg-white hover:text-brand-coffee text-brand-coffee font-bold transition-all duration-300 min-w-[180px] flex items-center justify-center group rounded-sm shadow-xl"
            >
              <span className="mr-2">메뉴 보기</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/about" 
              className="px-8 py-4 bg-brand-coffee/50 backdrop-blur-sm border border-brand-latte hover:bg-brand-latte hover:text-brand-coffee text-brand-latte transition-all duration-300 min-w-[180px] rounded-sm shadow-lg font-medium"
            >
              공간 소개
            </Link>
          </div>
        </div>
      </section>

      {/* Signature Menu Preview - Wood Theme */}
      <section className="py-24 bg-brand-latte">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-brand-wood text-xs tracking-widest uppercase font-bold">Signature Collection</span>
            <h2 className="font-serif text-3xl md:text-4xl text-brand-text mt-4 mb-4">제로니모의 시그니처</h2>
            <div className="w-24 h-1 bg-brand-gold mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredItems.map((item) => (
              <div key={item.id} className="group relative overflow-hidden bg-brand-cream rounded-xl shadow-wood hover:shadow-2xl transition-all duration-500 border border-brand-wood/10 hover:-translate-y-2">
                <div className="aspect-[4/3] overflow-hidden rounded-t-xl">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-8 relative">
                  <div className="absolute -top-6 right-6 bg-brand-gold text-brand-coffee p-2 rounded-full shadow-lg border-2 border-white">
                    <Star size={18} fill="currentColor" />
                  </div>
                  <h3 className="font-serif text-xl text-brand-text mb-2 group-hover:text-brand-coffee transition-colors">{item.name}</h3>
                  <p className="text-brand-wood text-sm font-medium mb-3 uppercase tracking-wide">{item.nameEng}</p>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4 h-10">{item.description}</p>
                  <p className="text-lg font-bold text-brand-coffee">₩ {item.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/menu" className="inline-block border-b-2 border-brand-gold text-brand-coffee pb-1 hover:text-brand-gold transition-colors font-medium tracking-wide">
              전체 메뉴 보기
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy Section - Wood Theme */}
      <section className="py-24 relative bg-brand-mocha border-t border-brand-coffee/20">
        <div 
            className="absolute inset-0 bg-fixed bg-cover bg-center opacity-10 mix-blend-overlay" 
            style={{ backgroundImage: `url(${config.philosophyBackgroundImage})` }}
        ></div>
        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
            <h2 className="font-serif text-4xl md:text-5xl text-brand-cream mb-8 leading-tight">
              커피 한 잔에 담긴<br/>
              <span className="text-brand-gold">장인의 철학</span>
            </h2>
            <p className="text-brand-latte/80 leading-8 mb-6 font-light">
              제로니모 커피하우스는 단순한 카페가 아닙니다. 
              세계 각지의 최상급 스페셜티 원두를 엄선하고, 
              매일 아침 구워내는 베이커리와 신선한 샐러드를 곁들인 브런치가 있는 미식의 공간입니다.
            </p>
            <p className="text-brand-latte/80 leading-8 font-light">
              높은 층고와 개방감 있는 인테리어는 도심 속 여유를 선사하며,
              곳곳에 배치된 식물들은 자연 속에 있는 듯한 편안함을 제공합니다.
              당신의 일상에 특별한 영감을 더해보세요.
            </p>
          </div>
          <div className="md:w-1/2 grid grid-cols-2 gap-4">
            <img src="https://picsum.photos/id/425/400/500" className="rounded-lg shadow-2xl border-2 border-brand-wood/30 mt-8" alt="Roasting" />
            <img src="https://picsum.photos/id/225/400/500" className="rounded-lg shadow-2xl border-2 border-brand-wood/30" alt="Pour over" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;