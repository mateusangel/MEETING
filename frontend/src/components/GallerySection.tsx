import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/eventData';
import { GalleryItem } from '../types';
import { Camera, X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'todos', label: 'Todas as Fotos' },
    { id: 'banquete', label: 'Jantar Romântico' },
    { id: 'louvor', label: 'Louvor & Aliança' },
    { id: 'comunhao', label: 'Comunhão & Alegria' },
    { id: 'local', label: 'Casarão Terra Santa' },
  ];

  const filteredItems =
    activeCategory === 'todos'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const handleNext = () => {
    if (!selectedImage) return;
    const currentIndex = filteredItems.findIndex((item) => item.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setSelectedImage(filteredItems[nextIndex]);
  };

  const handlePrev = () => {
    if (!selectedImage) return;
    const currentIndex = filteredItems.findIndex((item) => item.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedImage(filteredItems[prevIndex]);
  };

  return (
    <section id="galeria" className="py-20 lg:py-28 bg-[#090C12] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-semibold text-[#E5C07B] uppercase tracking-wider mb-4">
            <Camera className="w-3.5 h-3.5" />
            Galeria de Momentos Reais
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight leading-tight mb-6">
            Veja o Que Acontece Quando Deus Age no Casamento
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
            Registros fotográficos autênticos das edições do Encontro de Casais do Ministério Famílias
            Integradas. Rostos de gratidão, alianças renovadas e celebração.
          </p>
        </div>

        {/* Category filter tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all duration-200 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-[#F3E5AB] via-[#E5C07B] to-[#C59F49] text-black font-semibold shadow-md shadow-[#C59F49]/20'
                  : 'bg-[#10141D] text-slate-400 hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-[#D4AF37]/50 bg-[#0F1420] cursor-pointer shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <picture>
                  <source srcSet={item.webpSrc} type="image/webp" />
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </picture>
              </div>

              {/* Hover overlay caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <span className="text-[11px] font-semibold text-[#E5C07B] uppercase tracking-wider mb-1">
                  Encontro de Casais INVA
                </span>
                <h3 className="text-base font-bold text-white mb-1">{item.title}</h3>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
                <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-[#E5C07B] font-medium">
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>Ampliar foto</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Zoom Modal */}
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-[#0D1117] border border-white/15 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Fechar visualização"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Nav arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Próxima foto"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Expanded image */}
            <div className="max-h-[75vh] flex items-center justify-center bg-black">
              <picture>
                <source srcSet={selectedImage.webpSrc} type="image/webp" />
                <img
                  src={selectedImage.imageSrc}
                  alt={selectedImage.title}
                  className="max-h-[75vh] w-auto max-w-full object-contain"
                />
              </picture>
            </div>

            {/* Caption bar */}
            <div className="p-5 bg-[#0F1420] border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white">{selectedImage.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                  {selectedImage.description}
                </p>
              </div>
              <span className="text-xs text-[#E5C07B] font-mono shrink-0">
                72º Encontro de Casais · INVA
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
