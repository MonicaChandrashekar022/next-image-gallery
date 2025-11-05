'use client';
import React, { useEffect } from 'react';
import { ImageItem } from '../utils/api';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
  images: ImageItem[];
  index: number;
  open: boolean;
  onClose: () => void;
  setIndex: (i: number) => void;
};

export default function ModalSlider({ images, index, open, onClose, setIndex }: Props) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!open) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setIndex((index + 1) % images.length);
      if (e.key === 'ArrowLeft') setIndex((index - 1 + images.length) % images.length);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, index, images.length, onClose, setIndex]);

  if (!images.length) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative max-w-[90vw] max-h-[90vh] p-4"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
          >
            <img
              src={images[index].url}
              alt={images[index].title}
              className="max-w-full max-h-[80vh] object-contain rounded-md shadow-lg"
            />
            <button
              aria-label="Close"
              onClick={onClose}
              className="absolute top-4 right-4 rounded bg-white/80 px-3 py-1"
            >Close</button>

            <button
              aria-label="Previous"
              onClick={() => setIndex((index - 1 + images.length) % images.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2"
            >‹</button>

            <button
              aria-label="Next"
              onClick={() => setIndex((index + 1) % images.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2"
            >›</button>

            <div className="mt-2 text-center text-sm text-white">{images[index].title}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

