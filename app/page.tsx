// app/page.tsx
import React, { useState } from 'react';
import { useFetchImages } from '../hooks/useFetchImages';
import ImageCard from '../components/ImageCard';
import ModalSlider from '../components/ModalSlider';

export default function Page() {
  const { images, loading, error } = useFetchImages(36);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  function openAt(i: number) {
    setIndex(i);
    setOpen(true);
  }

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-semibold mb-4">Image Gallery</h1>

      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-40 rounded bg-gray-200 animate-pulse" />
          ))}
        </div>
      )}

      {error && <div className="text-red-600">Error: {error}</div>}

      {!loading && !error && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {images.map((img, i) => (
            <ImageCard key={img.id} img={img} onClick={() => openAt(i)} />
          ))}
        </div>
      )}

      <ModalSlider
        images={images}
        index={index}
        open={open}
        onClose={() => setOpen(false)}
        setIndex={setIndex}
      />
    </main>
  );
}

