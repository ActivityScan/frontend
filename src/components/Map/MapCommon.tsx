import React, { useState, useEffect, useRef } from 'react';
import { Map, Overlay, View } from 'ol';
import { Tile as TileLayer } from 'ol/layer';
import { OSM } from 'ol/source';
import { fromLonLat } from 'ol/proj';
import { Vector as VectorLayer } from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import { useAppSelector } from '@/hooks/redux';
import { clubs } from '@/store/searchSlice';
import { Club } from '@/Types/types';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import { Icon, Style } from 'ol/style';
import 'ol/ol.css';
import Modal from 'react-modal';
import styles from '@/components/Map/MapResults.module.scss';
import geoMarker from '@/assets/geo.svg'
import { useNavigate } from 'react-router-dom';
import { FullScreen, defaults as defaultControls } from 'ol/control';
// import { fetchClubInfoById } from '@/utils/api';
// import { useDispatch } from 'react-redux';
// import { AppDispatch } from '@/store';

Modal.setAppElement('#root');

const ClubMapMarkers: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement | null>(null); // Ref для popup элемента
  const clubsList = useAppSelector(clubs);
  const [map, setMap] = useState<Map | null>(null);
  const [overlay, setOverlay] = useState<Overlay | null>(null);
//   const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const [popupContent, setPopupContent] = useState<string | null>(null);
  const navigate = useNavigate(); 
//   const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const initialMap = new Map({
      target: mapRef.current || undefined,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: new VectorSource(),
        }),
      ],
      view: new View({
        center: fromLonLat([30.31413, 59.93863]),
        zoom: 10,
      }),
      controls: defaultControls().extend([
        new FullScreen(),
        // new Attribution({ collapsible: false }), // Добавляем контроль атрибуции
      ]),
    });

    // Создаем и настраиваем всплывающее окно
    const popupElement = document.createElement('div');
    popupElement.className = styles.ol__popup;
    document.body.appendChild(popupElement);
    popupRef.current = popupElement; // Сохраняем popup элемент в ref

    const popup = new Overlay({
      element: popupElement,
      autoPan: true,
      positioning: 'bottom-center',
      stopEvent: true,
    });
    initialMap.addOverlay(popup);
    setOverlay(popup);

    setMap(initialMap);
    return () => {
      initialMap.setTarget(undefined);
      if (popupRef.current) {
        popupRef.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (map && overlay) {
      const vectorLayer = map.getLayers().item(1) as VectorLayer;
      const vectorSource = vectorLayer.getSource() as VectorSource;

      clubsList.forEach((club: Club) => {
        const marker = new Feature({
          geometry: new Point(fromLonLat([club.longitude, club.latitude])),
        });

        marker.setStyle(
          new Style({
            image: new Icon({
              src: geoMarker,
              scale: 0.4,
            //   anchor: [1, 1],
            }),
          })
        );

        // Сохраняем информацию о клубе в маркере
        marker.set('club', club);
        vectorSource.addFeature(marker);
      });
      const mapTarget = map.getTarget();
      // Обработчик движения мыши по карте
      map.on('pointermove', (evt) => {
        const pixel = map.getEventPixel(evt.originalEvent);
        const feature = map.forEachFeatureAtPixel(pixel, (feature) => feature);

        // Устанавливаем курсор при наведении
        if (mapTarget instanceof HTMLElement) {
          mapTarget.style.cursor = feature ? 'pointer' : '';
        }
        if (feature && popupRef.current) {
            
          const club = feature.get('club');
          if (club) {
            const coordinate = evt.coordinate;
            
            setPopupContent(`<div><strong>${club.name}</strong><br>${club.address}</div>`);
            overlay.setPosition(coordinate); // Устанавливаем позицию попапа
            popupRef.current.style.display = 'block'; // Показываем попап
            popupRef.current.innerHTML = `<div><strong>${club.name}</strong><br>${club.address}</div>`;
          }
        } else if (popupRef.current) {
          overlay.setPosition(undefined); // Скрываем попап
          popupRef.current.style.display = 'none'; // Скрываем элемент попапа
        }
        //обработчик клика на маркер
        map.on('click', function (evt) {
            const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
                if (feature) {
                    const club = feature.get('club');
                    if (club) {
                    //  dispatch(fetchClubInfoById(club.id));  
                      navigate(`/club/${club.id}`); // Переход на компонент карточки клуба по id
                    }
                  }
            });
            
            if (!feature) {
              return;
            }
        })
      }
    );
     
    }
  }, [map, clubsList, overlay]);

//   // Закрытие модального окна
//   const closeModal = () => {
//     setModalIsOpen(false);
//     setSelectedClub(null);
//   };

  return (
    <>
      <div id="map" ref={mapRef} style={{ width: '100%', height: '1260px', textAlign: 'initial' }} />// тут ширина и высота компонента карты
      {/* <div id="popup"></div> */}
    </>
  );
};

export default ClubMapMarkers;
