export {}; // 確保這是一個模組

declare global {
  interface Article {
    title: string;
    urlToImage?: string;
    publishedAt: string;
    author?: string;
    source: {
      name: string;
    };
    description?: string;
    content?: string;
    url: string;
  }
}
