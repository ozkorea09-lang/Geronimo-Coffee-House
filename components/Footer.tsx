import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, MapPin, Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-coffee text-brand-latte pt-16 pb-8 border-t-4 border-brand-gold">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-1">
            <h3 className="font-serif text-2xl text-brand-gold mb-6">Geronimo Coffee House</h3>
            <p className="text-brand-wood text-sm leading-relaxed mb-6">
              일상의 휴식과 예술적 영감을 제공하는<br/>
              프리미엄 복합 문화 공간.<br/>
              최고의 커피와 빵, 브런치로 당신의 하루를 완성합니다.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-brand-wood hover:text-brand-gold transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-brand-wood hover:text-brand-gold transition-colors"><Facebook size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-brand-cream mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm text-brand-wood">
              <li><Link to="/menu" className="hover:text-brand-gold transition-colors">Menu</Link></li>
              <li><Link to="/gallery" className="hover:text-brand-gold transition-colors">Gallery</Link></li>
              <li><Link to="/news" className="hover:text-brand-gold transition-colors">Notice</Link></li>
              <li><Link to="/about" className="hover:text-brand-gold transition-colors">Brand Story</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-brand-cream mb-6">Contact Us</h4>
            <ul className="space-y-3 text-sm text-brand-wood">
              <li className="flex items-start">
                <MapPin size={16} className="mt-1 mr-2 text-brand-gold" />
                <span>경기도 양주시 화합로 1597번길 3<br/>(주차 200대 가능)</span>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2 text-brand-gold" />
                <span>031-858-3434</span>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-2 text-brand-gold" />
                <span>geronimo2291@naver.com</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-serif text-brand-cream mb-6">Opening Hours</h4>
            <ul className="space-y-3 text-sm text-brand-wood">
              <li className="flex justify-between border-b border-brand-mocha pb-2">
                <span>Mon - Fri</span>
                <span>09:00 - 24:00</span>
              </li>
              <li className="flex justify-between border-b border-brand-mocha pb-2">
                <span>Weekend</span>
                <span>09:00 - 24:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-mocha pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-brand-wood">
          <p>&copy; 2026 GERONIMO COFFEE HOUSE. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-brand-cream">Privacy Policy</a>
            <a href="#" className="hover:text-brand-cream">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;