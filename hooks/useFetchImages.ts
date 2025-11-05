'use client';
import { useEffect, useState } from 'react';
import { fetchFromPicsum, ImageItem } from '../utils/api';

export function useFetchImages(count = 30) {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        // showcases a forEach example to do extra processing if needed
        const data = await fetchFromPicsum(1, count);
        // preprocess: add alt text if missing (for accessibility)
        data.forEach((img) => {
          if (!img.title) img.title = `Image ${img.id}`;
        });
        if (!cancelled) {
          setImages(data);
        }
      } catch (err: any) {
        if (!cancelled) setError(err.message || 'Failed to load images');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [count]);

  return { images, loading, error };
}

