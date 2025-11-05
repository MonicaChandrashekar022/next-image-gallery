// components/ImageCard.tsx
import Image from 'next/image';
import React from 'react';
import { ImageItem } from '../utils/api';

type Props = {
  img: ImageItem;
  onClick: () => void;
};

export default function ImageCard({ img, onClick }: Props) {
  return (
    <button className="group w-full" onClick={onClick} aria-label={img.title}>
      <div className="w-full aspect-[4/3] overflow-hidden rounded-md bg-gray-100">
        {/* Next/Image automatically optimizes images */}
        <img
          src={img.thumbnailUrl}
          alt={img.title ?? 'Image'}
          className="h-full w-full object-cover transform group-hover:scale-105 transition duration-300"
          loading="lazy"
        />
      </div>
      <div className="mt-2 text-sm text-gray-600">{img.author}</div>
    </button>
  );
}

