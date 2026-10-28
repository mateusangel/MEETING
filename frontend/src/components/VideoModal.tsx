import React from 'react';
import { EVENT_DETAILS } from '../data/eventData';
import { X, ExternalLink } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full bg-[#0D1117] border border-white/20 rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#0F1420]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <h3 className="text-sm font-bold text-white">
              Aftermovie Oficial — Encontro de Casais INVA
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Fechar vídeo"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Player */}
        <div className="aspect-video w-full bg-black">
          <iframe
            src={EVENT_DETAILS.videoPreviewUrl}
            width="100%"
            height="100%"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
            title="Aftermovie Encontro de Casais"
          />
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0F1420] border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
          <span>Um vislumbre das bênçãos que Deus opera em cada edição.</span>
          <a
            href={EVENT_DETAILS.videoPreviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#E5C07B] hover:underline flex items-center gap-1 font-medium"
          >
            <span>Abrir no Google Drive</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
