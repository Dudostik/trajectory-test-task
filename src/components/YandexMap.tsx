import { useEffect, useRef } from "react";
import { useYmaps } from "../hooks/useYmaps";

interface YandexMapProps {
  center: [number, number];
  zoom?: number;
  markerText?: string;
}

export function YandexMap({ center, zoom = 12, markerText }: YandexMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const ymapsReady = useYmaps();

  useEffect(() => {
    if (!ymapsReady || !mapRef.current) return;

    window.ymaps.ready(() => {
      const container = mapRef.current;
      if (!container) return;
      const map = new window.ymaps.Map(container, {
        center,
        zoom,
        controls: ["zoomControl", "typeSelector"],
      });

      if (markerText) {
        new window.ymaps.Placemark(center, {
          balloonContent: markerText,
        }).addTo(map);
      }
    });
  }, [ymapsReady, center, zoom, markerText]);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "400px",
        borderRadius: "8px",
        margin: "20px 0",
      }}
    />
  );
}
