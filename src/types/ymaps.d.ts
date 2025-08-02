declare namespace ymaps {
  function ready(callback: () => void): void;
  
  class Map {
    constructor(element: HTMLElement | string, options: MapOptions);
  }
  
  interface MapOptions {
    center: [number, number];
    zoom: number;
    controls?: string[];
  }

  class Placemark {
    constructor(geometry: [number, number], properties?: PlacemarkProperties);
    addTo(map: Map): void;
  }

  interface PlacemarkProperties {
    balloonContent?: string;
    hintContent?: string;
    iconContent?: string;
  }
}