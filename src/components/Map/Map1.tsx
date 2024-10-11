// // src/components/ClubMarkers.tsx

// import React, { useState, useEffect, useRef } from 'react';
// import { Map, Overlay, View } from 'ol';
// import { Tile as TileLayer } from 'ol/layer';
// import { OSM } from 'ol/source';
// import { fromLonLat } from 'ol/proj';
// import { Vector as VectorLayer } from 'ol/layer';
// import VectorSource from 'ol/source/Vector';
// import { useAppSelector } from '@/hooks/redux';
// import { clubs } from '@/store/searchSlice';
// import { Club } from '@/Types/types';
// import { Feature } from 'ol';
// import Point from 'ol/geom/Point';
// import { Icon, Style } from 'ol/style';
// import 'ol/ol.css';
// import Modal from 'react-modal';
// import geoMarker from '@/assets/geo.svg'

// Modal.setAppElement('#root');
// const ClubMapMarkers: React.FC = () => {

//   const mapRef = useRef<HTMLDivElement>(null);
//   const clubsList = useAppSelector(clubs);
//   const [map, setMap] = useState<Map | null>(null);
//   const [overlay, setOverlay] = useState<Overlay | null>(null); // Для всплывающего окна
//   const [modalIsOpen, setModalIsOpen] = useState(false); // Для управления модальным окном
//   const [selectedClub, setSelectedClub] = useState<Club | null>(null); // Хранит выбранный клуб
//   const [popupContent, setPopupContent] = useState<string | null>(null); // Для хранения содержимого попапа
//   const [popupCoordinate, setPopupCoordinate] = useState<number[]>([]); // Для хранения координат попапа
//   console.log(clubsList);
//   // Инициализация карты при первом рендере
//   useEffect(() => {
//     const initialMap = new Map({
//       target: mapRef.current,
//       layers: [
//         new TileLayer({
//           source: new OSM(),
//         }),
//         new VectorLayer({
//             source: new VectorSource(),
//           }),
//       ],
      
//       view: new View({
//         center: fromLonLat([30.31413, 59.93863]), // Центр Санкт-Петербурга
//         zoom: 10,
//       }),
//     });

//     // Создаем и настраиваем всплывающее окно
//     const popupElement = document.createElement('div');
//     popupElement.className = 'ol-popup';
//     document.body.appendChild(popupElement);

//     const popup = new Overlay({
//     element: popupElement!,
//     autoPan: true,
//     positioning: 'bottom-center',
//     stopEvent: true,
//     });
//     initialMap.addOverlay(popup);
//     setOverlay(popup);

//     setMap(initialMap);
//     return () => initialMap.setTarget(undefined);
//   }, []);

//   useEffect(() => {
//     // Добавляем клубы на карту
//     if (map) {
//       const vectorLayer = map.getLayers().item(1) as VectorLayer;
//       const vectorSource = vectorLayer.getSource() as VectorSource;

//       clubsList.forEach((club: Club) => {
//         const marker = new Feature({
//           geometry: new Point(fromLonLat([club.longitude, club.latitude])),
//         });

//         marker.setStyle(
//           new Style({
//             image: new Icon({
//             //   src: 'https://openlayers.org/en/latest/examples/data/icon.png',
//               src: geoMarker,
//               scale: 0.4,
//             //   color:'orange',
              
//             }),
//           })
          
//         );
        

//      // Обработчик клика на маркер
//      marker.set('club', club); // Сохраняем информацию о клубе в маркере
//      console.log(marker)
//      marker.on('click', () => {
//        setSelectedClub(club); // Устанавливаем выбранный клуб
//        setModalIsOpen(true); // Открываем модальное окно
//        console.log(modalIsOpen)
//      });

     
//           // Добавляем обработчики событий для отображения всплывающего окна
//         //   marker.on('pointermove', () => {
//         //     if (overlay) { // Проверяем, что overlay существует
//         //       const coordinate = fromLonLat([club.longitude, club.latitude]);
//         //       overlay.setPosition(coordinate);
//         //       const popupContent = `<div><strong>${club.name}</strong><br>${club.address}</div>`;
//         //       document.getElementById('popup-content')!.innerHTML = popupContent;
//         //       document.getElementById('popup')!.style.display = 'block'; // Показываем всплывающее окно
//         //     }
//         //   });
  
//           marker.on('pointerout', () => {
//             if (overlay) { // Проверяем, что overlay существует
//               overlay.setPosition(undefined); // Скрываем всплывающее окно
//               document.getElementById('popup')!.style.display = 'none'; // Скрываем элемент всплывающего окна
//               closeModal();
//             }
//           });
  
//           (map?.getLayers().item(1) as VectorLayer | undefined)?.getSource()?.addFeature(marker);
//         });
//       }
//     }, [map, clubsList]);
//     console.log(modalIsOpen)
//     useEffect(() => {
//         if (overlay && map) {
//           let popover: { dispose: () => void; show: () => void; } | undefined;
//         //   const element = document.getElementById('popup');
    
//           function disposePopover() {
//             if (popover) {
//               popover.dispose();
//               popover = undefined;
//             }
//           }
    
//           // Отображение всплывающего окна при клике
//           // Обработчик клика на карте
//     //   map.on('singleclick', (evt) => {
//     //     // Проверяем, есть ли маркер под курсором
//     //     const feature = map.forEachFeatureAtPixel(evt.pixel, (feature) => feature);
//     //     if (feature) {
//     //       const club = feature.get('club'); // Получаем информацию о клубе из маркера
//     //       setSelectedClub(club);
//     //       setModalIsOpen(true); // Открываем модальное окно
//     //     }
//     //   });
      
//     map.on('pointermove', (evt) => {
//         const pixel = map.getEventPixel(evt.originalEvent);
//         const feature = map.forEachFeatureAtPixel(pixel, (feature) => feature);

//         if (feature) {
//           const club = feature.get('club');
//           if (club) {
//             const coordinate = fromLonLat([club.longitude, club.latitude]);
//             setPopupContent(`<div><strong>${club.name}</strong><br>${club.address}</div>`);
//             setPopupCoordinate(coordinate);
//             overlay.setPosition(coordinate); // Устанавливаем позицию попапа
//             popupElement!.style.display = 'block'; // Показываем попап
//           }
//         } else {
//           overlay.setPosition(undefined); // Скрываем попап
//           popupElement!.style.display = 'none'; // Скрываем элемент попапа
//           closeModal(); // Закрываем модальное окно
//         }
//       });
//           // Изменение курсора мыши при наведении на маркер
//         //   map.on('pointermove', function (e) {
//         //     const pixel = map.getEventPixel(e.originalEvent);
//         //     const hit = map.hasFeatureAtPixel(pixel);
//         //     // setModalIsOpen(true)
//         //     const target = map.getTargetElement(); // Получаем целевой элемент карты
//         //     if (target instanceof HTMLElement) {
//         //       target.style.cursor = hit ? 'pointer' : '';
              
//         //     }
//         //     const feature = map.forEachFeatureAtPixel(e.pixel, (feature) => feature);
//         // if (feature) {
//         //   const club = feature.get('club'); // Получаем информацию о клубе из маркера
//         //   setSelectedClub(club);
//         //   setModalIsOpen(true); // Открываем модальное окно
//         //  }
//         // });
          
//           // Закрытие всплывающего окна при перемещении карты
//           map.on('movestart',
//              disposePopover
//             )
//              ;
//         }
//       }, [overlay, map, clubsList]);

      
// //     const element = document.getElementById('popup');
// // if (overlay && map) {
// // const popup = new Overlay({
// //   element: element,
// //   positioning: 'bottom-center',
// //   stopEvent: false,
// // });
// // map.addOverlay(popup);

// // let popover;
// // function disposePopover() {
// //   if (popover) {
// //     popover.dispose();
// //     popover = undefined;
// //   }
// // }
// // // display popup on click
// // map.on('click', function (evt) {
// //   const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
// //     return feature;
// //   });
// //   disposePopover();
// //   if (!feature) {
// //     return;
// //   }
// //   popup.setPosition(evt.coordinate);
// //   popover = new bootstrap.Popover(element, {
// //     placement: 'top',
// //     html: true,
// //     content: feature.get('name'),
// //   });
// //   popover.show();
// // });

// // // change mouse cursor when over marker
// // map.on('pointermove', function (e) {
// //   const pixel = map.getEventPixel(e.originalEvent);
// //   const hit = map.hasFeatureAtPixel(pixel);
// //   const target = map.getTargetElement(); // используем getTargetElement()
// //   if (target instanceof HTMLElement) {
// //     target.style.cursor = hit ? 'pointer' : '';
// //   }
// // });
// // // Close the popup when the map is moved
// // map.on('movestart', disposePopover);
// // }
// // Закрытие модального окна
// const closeModal = () => {
//     setModalIsOpen(false);
//     setSelectedClub(null); // Сбрасываем выбранный клуб
//   };
//   return (
//     <>
//       <div id="popup" className="ol-popup" style={{ display: 'none' }}>
//         <div id="popup-content" dangerouslySetInnerHTML={{ __html: popupContent || '' }} />
//       </div>
//       <div id="map" ref={mapRef} style={{ width: '630px', height: '1260px', textAlign: 'initial' }} />
//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         contentLabel="Club Information"
//         style={{
//           overlay: {
//             backgroundColor: 'rgba(0, 0, 0, 0.75)',
//           },
//           content: {
//             top: '50%',
//             left: '50%',
//             right: 'auto',
//             bottom: 'auto',
//             transform: 'translate(-50%, -50%)',
//           },
//         }}
//       >
//         {selectedClub && (
//           <div>
//             <h2>{selectedClub.name}</h2>
//             <p>{selectedClub.address}</p>
//             <button onClick={closeModal}>Close</button>
//           </div>
//         )}
//       </Modal>
//     </>
//   );

// //   return (
// //     <>
// //      <div id="map" ref={mapRef} style={{ width: '630px', height: '1260px', textAlign: 'initial' }} />
// //     <Modal
// //         isOpen={modalIsOpen}
// //         onRequestClose={closeModal}
// //         contentLabel="Club Information"
// //         style={{
// //           overlay: {
// //             backgroundColor: 'rgba(0, 0, 0, 0.75)',
// //           },
// //           content: {
// //             top: '50%',
// //             left: '50%',
// //             right: 'auto',
// //             bottom: 'auto',
// //             transform: 'translate(-50%, -50%)',
// //           },
// //         }}
// //       >
// //         {selectedClub && (
// //           <div>
// //             <h2>{selectedClub.name}</h2>
// //             <p>{selectedClub.address}</p>
// //             <button onClick={closeModal}>Close</button>
// //           </div>
// //         )}
// //       </Modal>
// //       {/* <div id="popup" className="ol-popup" style={{ display: 'none' }}>
// //         <div id="popup-content"></div>
// //       </div> */}
// //       {/* <div id="map" ref={mapRef} style={{ width: '630px', height: '1260px', textAlign: 'initial' }} /> */}
// //     </>
// //   );
// };

// export default ClubMapMarkers;
