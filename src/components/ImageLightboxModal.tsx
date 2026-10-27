import React, { useEffect } from 'react';
import { X, ZoomIn } from 'lucide-react';

interface ImageLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  title: string;
}

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({
  isOpen,
  onClose,
  imageSrc,
  title
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !imageSrc) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 no-print"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-4xl w-full p-4 sm:p-5 relative shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <ZoomIn className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-slate-900 text-sm sm:text-base truncate max-w-lg">
              {title || 'Evidência Fotográfica da Auditoria'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition"
            title="Fechar (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Image Display */}
        <div className="bg-slate-950 rounded-xl overflow-hidden flex items-center justify-center max-h-[75vh] p-2">
          <img
            src={imageSrc}
            alt={title}
            className="max-h-[70vh] w-auto max-w-full object-contain rounded-lg"
          />
        </div>

        {/* Footer info */}
        <div className="mt-3 pt-2 text-xs text-slate-500 flex justify-between items-center">
          <span>Registro de conformidade e auditoria de campo</span>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-slate-900 text-white rounded-lg text-xs font-medium hover:bg-slate-800 transition"
          >
            Fechar Visualização
          </button>
        </div>
      </div>
    </div>
  );
};
