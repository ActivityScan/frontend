// // src/components/AddressAutosuggest.tsx

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Autosuggest from 'react-autosuggest';
// import { Feature, Map, View } from 'ol';
// import { Tile as TileLayer } from 'ol/layer';
// import { OSM } from 'ol/source';
// import { fromLonLat } from 'ol/proj';
// import { Point } from 'ol/geom';
// import { Icon, Style } from 'ol/style';
// import { FullScreen, defaults as defaultControls } from 'ol/control';
// import { Vector as VectorSource } from 'ol/source';
// import VectorLayer from 'ol/layer/Vector';
// // import { SuggestProps } from '@/Types/types';
// // import { AutosuggestProps } from '@/Types/types';

// interface Suggestion {
//   fullAddress: string;
//   lat: number;
//   lon: number;
// }

// const AddressAutosuggest: React.FC = () => {
//   const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
//   const [value, setValue] = useState<string>('');
//   const [map, setMap] = useState<Map | null>(null);
// //   const [coordinates, setCoordinates] = useState<[number, number]>
//   const [vectorSource, setVectorSource] = useState<VectorSource | null>(null);

//   // Инициализация карты при первом рендере
//   useEffect(() => {
//     const source = new VectorSource(); // Источник для маркеров
//     const initMap = new Map({
//       target: 'map',
//       layers: [
//         new TileLayer({
//           source: new OSM(),
//         }),
//         new VectorLayer({
//             source: source,
//           }),
//       ],
      
//       view: new View({
//         center: fromLonLat([30.31413, 59.93863]), // Центр Санкт-Петербурга
//         zoom: 12,
//       }),
//       controls: defaultControls().extend([
//         new FullScreen(),
//         // new Attribution({ collapsible: false }), // Добавляем контроль атрибуции
//     ]),
//     });
//     setMap(initMap);
//     setVectorSource(source);
//   }, []);

//   // Функция для запроса предложений к Photon API
//   const fetchSuggestions = async (query: string) => {
//     try {
//       const response = await axios.get(
//         `http://62.113.111.95:2322/api/?q=${query}&limit=5&lang=ru`
//       );
//       const data = response.data.features.map((feature: any) => ({
//         fullAddress: formatFullAddress(feature.properties),
//         lat: feature.geometry.coordinates[1],
//         lon: feature.geometry.coordinates[0],
//         // setCoordinates(lon, lat);
//         // const lonLat: [number, number] = suggestion.coordinates;
//       })
//     );
//       setSuggestions(data);
//     //   setCoordinates(lon, lat);
//     } catch (error) {
//       console.error('Error fetching suggestions:', error);
//     }
//   };

//   // Обработчик обновления предложений
//   const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
//     if (value.length > 2) {
//       fetchSuggestions(value);
//     } else {
//       setSuggestions([]);
//     }
//   };

//   // Обработчик очистки предложений
//   const onSuggestionsClearRequested = () => {
//     setSuggestions([]);
//   };

//   // Обработчик изменения ввода
//   const onChange = (
//     event: React.FormEvent<HTMLElement>,
//     { newValue }: { newValue: string }
//   ) => {
//     setValue(newValue);
//   };

//   // Получение текста для отображения в предложении
//   const getSuggestionValue = (suggestion: Suggestion) => suggestion.fullAddress;

//   // Рендеринг каждого предложения
//   const renderSuggestion = (suggestion: Suggestion) => (
//     <div style={{ cursor: 'pointer' }}>{suggestion.fullAddress}</div>
//   );

//   // Обработчик выбора предложения
//   const onSuggestionSelected = (
//     event: React.FormEvent<any>,
//     { suggestion }: { suggestion: Suggestion }
//   ) => {
//     //  const lonLat: [number, number] = suggestion.coordinates;
//     if (map) {
//       const view = map.getView();
//       view.setCenter(fromLonLat([suggestion.lon, suggestion.lat]));
//       view.setZoom(13);
//       addMarker(suggestion.lon, suggestion.lat);
//     }
//   };
   
//   const addMarker = (lon: number, lat: number) => {
//     if (vectorSource) {
//       vectorSource.clear(); // Удаляем предыдущие маркеры

//       const marker = new Feature({
//         geometry: new Point(fromLonLat([lon, lat])),
//       });

//       marker.setStyle(
//         new Style({
//           image: new Icon({
//             src: 'https://openlayers.org/en/latest/examples/data/icon.png',
//             scale: 0.7,
//           }),
//         })
//       );

//       vectorSource.addFeature(marker); // Добавляем новый маркер
//     }
//   };
//   // Настройки для Autosuggest
//   const inputProps = {
//     placeholder: 'Введите адрес',
//     value,
//     onChange,
//   };

//   const formatFullAddress = (properties: any) => {
//     const { city,name, street,state, housenumber, district } = properties;
//     let fullAddress = ` `;
//     if (city) fullAddress += ` ${city},`;
//     if (state) fullAddress += ` ${state}`;
//     if (street) fullAddress += `, ${street}`;
//     if (district) fullAddress += `, ${district}`;
//     if (name) fullAddress += `, ${name}`;
//     if (housenumber) fullAddress += `, ${housenumber}`;
//     // if (postcode) fullAddress += `, ${postcode}`;
//     return fullAddress;
//   };


//   return (
//     <div>
//       <Autosuggest
//         suggestions={suggestions}
//         onSuggestionsFetchRequested={onSuggestionsFetchRequested}
//         onSuggestionsClearRequested={onSuggestionsClearRequested}
//         getSuggestionValue={getSuggestionValue}
//         renderSuggestion={renderSuggestion}
//         onSuggestionSelected={onSuggestionSelected}
//         inputProps={inputProps}
//       />
//       <div id="map" style={{ width: '100%', height: '400px' }}></div>
//     </div>
//   );
// };

// export default AddressAutosuggest;
