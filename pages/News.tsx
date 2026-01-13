import React, { useEffect, useState } from 'react';
import { DataService } from '../services/storage';
import { Post } from '../types';
import { Calendar, Pin, Bell, X } from 'lucide-react';

const News: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState<'all' | 'notice' | 'event'>('all');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchedPosts = DataService.getPosts();
    // Sort: Pinned first, then by date descending
    const sortedPosts = fetchedPosts.sort((a, b) => {
      if (a.isPinned === b.isPinned) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return a.isPinned ? -1 : 1;
    });
    setPosts(sortedPosts);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedPost) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedPost]);

  const filteredPosts = filter === 'all' 
    ? posts 
    : posts.filter(post => post.category === filter);

  return (
    <div className="pt-24 min-h-screen bg-brand-latte text-brand-text">
      {/* Header */}
      <div className="bg-brand-mocha py-16 mb-12 shadow-wood relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="font-serif text-4xl md:text-5xl text-brand-cream mb-4">NEWS & EVENTS</h1>
          <p className="text-brand-wood">제로니모의 새로운 소식과 특별한 이벤트를 확인하세요</p>
        </div>
      </div>

      <div className="container mx-auto px-6 pb-24">
        {/* Filter Tabs */}
        <div className="flex justify-center gap-4 mb-16">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all border-2 shadow-sm ${
              filter === 'all' 
                ? 'bg-brand-coffee border-brand-coffee text-white' 
                : 'bg-brand-cream border-brand-wood/30 text-brand-muted hover:border-brand-coffee hover:text-brand-coffee'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('notice')}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all border-2 shadow-sm ${
              filter === 'notice' 
                ? 'bg-brand-catCoffee border-brand-catCoffee text-white' 
                : 'bg-brand-cream border-brand-wood/30 text-brand-muted hover:border-brand-catCoffee hover:text-brand-catCoffee'
            }`}
          >
            Notice
          </button>
          <button
            onClick={() => setFilter('event')}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all border-2 shadow-sm ${
              filter === 'event' 
                ? 'bg-brand-catBaker border-brand-catBaker text-white' 
                : 'bg-brand-cream border-brand-wood/30 text-brand-muted hover:border-brand-catBaker hover:text-brand-catBaker'
            }`}
          >
            Event
          </button>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article 
              key={post.id} 
              onClick={() => setSelectedPost(post)}
              className={`flex flex-col bg-brand-cream rounded-xl overflow-hidden group hover:transform hover:-translate-y-1 transition-all duration-300 cursor-pointer shadow-wood hover:shadow-2xl ${
                post.isPinned ? 'border-2 border-brand-gold' : 'border border-brand-wood/10'
              }`}
            >
              {/* Image Section */}
              <div className="relative h-56 overflow-hidden bg-gray-200">
                {post.imageUrl ? (
                  <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-brand-wood/30">
                    <span className="font-serif italic text-2xl opacity-50">GERONIMO</span>
                  </div>
                )}
                {/* Category Badge */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm text-white shadow-md ${
                    post.category === 'notice' ? 'bg-brand-catCoffee' : 'bg-brand-catBaker'
                  }`}>
                    {post.category}
                  </span>
                  {post.isPinned && (
                    <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm bg-brand-cream text-brand-gold flex items-center gap-1 shadow-md border border-brand-gold">
                      <Pin size={10} fill="currentColor" /> Pinned
                    </span>
                  )}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-center text-xs text-brand-wood mb-3 gap-2">
                  <Calendar size={14} />
                  <span>{post.date}</span>
                </div>
                <h3 className="text-xl font-serif text-brand-text mb-3 leading-snug group-hover:text-brand-gold transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4 flex-grow">
                  {post.content}
                </p>
                <div className="mt-auto pt-4 border-t border-brand-wood/10">
                  <span className="text-brand-coffee text-xs font-bold uppercase tracking-wider group-hover:underline cursor-pointer">
                    Read More
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
           <div className="text-center py-20 bg-brand-cream border border-brand-wood/20 rounded-lg shadow-wood">
             <Bell size={48} className="mx-auto text-brand-wood/30 mb-4" />
             <p className="text-brand-muted">등록된 게시글이 없습니다.</p>
           </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-[100] bg-brand-coffee/80 backdrop-blur-sm flex justify-center items-start overflow-y-auto p-4 md:p-8 animate-fade-in">
          <div className="relative w-full max-w-4xl bg-brand-cream border-2 border-brand-wood/20 rounded-lg shadow-2xl my-8 flex flex-col">
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedPost(null)}
              className="absolute -top-12 right-0 md:-right-12 text-white/80 hover:text-brand-gold transition-colors p-2"
            >
              <X size={32} />
            </button>

            {/* Modal Image */}
            {selectedPost.imageUrl && (
              <div className="w-full">
                <img 
                  src={selectedPost.imageUrl} 
                  alt={selectedPost.title} 
                  className="w-full h-auto rounded-t-lg"
                />
              </div>
            )}

            {/* Modal Content */}
            <div className="p-8 md:p-12">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className={`px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-sm text-white shadow-sm ${
                    selectedPost.category === 'notice' ? 'bg-brand-catCoffee' : 'bg-brand-catBaker'
                  }`}>
                    {selectedPost.category}
                </span>
                <div className="flex items-center text-sm text-brand-wood gap-2">
                  <span className="w-1 h-1 bg-brand-wood rounded-full"></span>
                  <Calendar size={14} />
                  <span>{selectedPost.date}</span>
                </div>
                {selectedPost.isPinned && (
                    <span className="text-xs text-brand-gold font-bold flex items-center gap-1 border border-brand-gold/30 px-2 py-0.5 rounded-sm bg-brand-gold/5">
                      <Pin size={10} fill="currentColor" /> Pinned
                    </span>
                )}
              </div>

              <h2 className="text-2xl md:text-4xl font-serif text-brand-text mb-8 leading-tight">
                {selectedPost.title}
              </h2>

              <div className="prose prose-lg max-w-none prose-headings:font-serif prose-p:text-gray-700 prose-a:text-brand-gold">
                <p className="whitespace-pre-wrap">
                  {selectedPost.content}
                </p>
              </div>

              <div className="mt-12 pt-8 border-t border-brand-wood/20 flex justify-center">
                <button 
                  onClick={() => setSelectedPost(null)}
                  className="px-8 py-3 border border-brand-wood/40 hover:border-brand-coffee text-brand-muted hover:text-brand-coffee transition-all duration-300 rounded-sm uppercase tracking-widest text-sm hover:bg-brand-wood/5"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default News;