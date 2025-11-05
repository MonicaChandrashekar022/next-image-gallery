// utils/api.ts
import axios from 'axios';

export type ImageItem = {
  id: string | number;
  author?: string;
  title?: string;
  thumbnailUrl?: string;
  url: string; // full-size image
};

export async function fetchFromPicsum(page = 1, limit = 30) {
  // Picsum endpoint example
  const res = await axios.get(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`);
  // transform to common ImageItem shape
  return res.data.map((i: any) => ({
    id: i.id,
    author: i.author,
    url: `https://picsum.photos/id/${i.id}/1200/800`,         // high-res
    thumbnailUrl: `https://picsum.photos/id/${i.id}/400/300`, // thumbnail
    title: `Photo by ${i.author}`,
  })) as ImageItem[];
}

// Optional: JSONPlaceholder
export async function fetchFromJSONPlaceholder(limit = 30) {
  const res = await axios.get(`https://jsonplaceholder.typicode.com/photos?_limit=${limit}`);
  return res.data.map((i: any) => ({
    id: i.id,
    author: undefined,
    url: i.url,
    thumbnailUrl: i.thumbnailUrl,
    title: i.title
  })) as ImageItem[];
}

