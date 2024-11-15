/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef } from 'react'
import { Map, Overlay, View } from 'ol'
import { Tile as TileLayer } from 'ol/layer'
import { OSM } from 'ol/source'
import { fromLonLat } from 'ol/proj'
import { Vector as VectorLayer } from 'ol/layer'
import VectorSource from 'ol/source/Vector'
import { useAppSelector } from '@/hooks/redux'
import { Feature } from 'ol'
import Point from 'ol/geom/Point'
import { Icon, Style } from 'ol/style'
import 'ol/ol.css'
import styles from '@/components/Map/Map.module.scss'
import geoMarker from '@/assets/geo.svg'
import { FullScreen, defaults as defaultControls } from 'ol/control'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MapForCard: React.FC<{ club: any }> = ({ club }) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const popupRef = useRef<HTMLDivElement | null>(null) // Ref для popup элемента
  const [map, setMap] = useState<Map | null>(null)
  const [overlay, setOverlay] = useState<Overlay | null>(null)
  // const [popupContent, setPopupContent] = useState<string | null>(null)
  //   const userLatitude = useAppSelector((state) => state.search.latitude);
  //   const userLongitude = useAppSelector((state) => state.search.longitude);
  const chosenClubLatitude = useAppSelector(
    (state) => state.club.chosenClubLatitude,
  )
  const chosenClubLongitude = useAppSelector(
    (state) => state.club.chosenClubLongitude,
  )
  console.log(chosenClubLatitude, chosenClubLongitude)

  // Определяем начальные координаты, еслиюзер не выбрал свой адрес
  const initialCoordinates: [number, number] = [30.3158, 59.9343] // Невский пр. 30

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
        center: fromLonLat([
          chosenClubLongitude || initialCoordinates[0],
          chosenClubLatitude || initialCoordinates[1],
        ]),
        zoom: 12,
      }),
      controls: defaultControls().extend([new FullScreen()]),
    })

    // Создаем и настраиваем всплывающее окно
    const popupElement = document.createElement('div')
    popupElement.className = styles.ol__popup
    document.body.appendChild(popupElement)
    popupRef.current = popupElement // Сохраняем popup элемент в ref

    const popup = new Overlay({
      element: popupElement,
      autoPan: false,
      positioning: 'bottom-center',
      stopEvent: true,
    })
    initialMap.addOverlay(popup)
    setOverlay(popup)

    setMap(initialMap)
    return () => {
      initialMap.setTarget(undefined)
      if (popupRef.current) {
        popupRef.current.remove()
      }
    }
  }, [chosenClubLatitude, chosenClubLongitude])

  useEffect(() => {
    if (map && overlay) {
      const vectorLayer = map.getLayers().item(1) as VectorLayer<VectorSource>
      const vectorSource = vectorLayer.getSource() as VectorSource

      const marker = new Feature({
        geometry: new Point(
          fromLonLat([chosenClubLongitude, chosenClubLatitude]),
        ),
      })

      marker.setStyle(
        new Style({
          image: new Icon({
            src: geoMarker,
            scale: 0.4,
          }),
        }),
      )
      marker.set('club', club)
      vectorSource.addFeature(marker)

      // Обработчик движения мыши по карте
      map.on('pointermove', (evt) => {
        const pixel = map.getEventPixel(evt.originalEvent)
        const feature = map.forEachFeatureAtPixel(pixel, (feature) => feature)

        const mapTarget = map.getTargetElement()
        if (mapTarget) {
          mapTarget.style.cursor = feature ? 'pointer' : ''
        }

        if (feature && popupRef.current) {
          const club = feature.get('club')
          if (club) {
            const coordinate = evt.coordinate

            // setPopupContent(
            //   `<div><strong>${club.name}</strong><br>${club.address}</div>`,
            // )
            overlay.setPosition(coordinate) // Устанавливаем позицию попапа
            popupRef.current.style.display = 'block' // Показываем попап
            popupRef.current.innerHTML = `<div><strong>${club.name}</strong><br>${club.address}</div>`
          }
        } else if (popupRef.current) {
          overlay.setPosition(undefined) // Скрываем попап
          popupRef.current.style.display = 'none' // Скрываем элемент попапа
        }
      })
    }
  }, [map, overlay, chosenClubLatitude, chosenClubLongitude])

  return (
    <>
      {/*  // тут ширина и высота компонента карты */}
      <div
        id="map"
        ref={mapRef}
        style={{
          width: '58%',
          // height: '100vh',
          height: '610px',
          borderRadius: '10px', // Добавляем скругление углов
          overflow: 'hidden', // Предотвращаем выход карты за границы
          marginBottom: '118px',
          // borderRadius: '25px',
          /*  textAlign: 'initial', 
         position:"relative",
         left:"900px" ,
         top:"0px", */
        }}
      />
      {/* <div id="popup"></div> */}
    </>
  )
}

export default MapForCard
