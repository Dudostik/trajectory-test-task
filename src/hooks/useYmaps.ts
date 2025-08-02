import { useEffect, useState } from 'react';

declare global {
  interface Window {
    ymaps: typeof ymaps;
  }
}

export function useYmaps() {
  const [ymapsLoaded, setYmapsLoaded] = useState(false);

  useEffect(() => {
    if (window.ymaps) {
      setYmapsLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
    script.async = true;
    
    script.onload = () => setYmapsLoaded(true);
    script.onerror = () => console.error('Ошибка загрузки Яндекс.Карт');

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return ymapsLoaded;
}