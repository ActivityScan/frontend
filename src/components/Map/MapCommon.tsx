/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef } from 'react'
import { Map, Overlay, View } from 'ol'
import { Tile as TileLayer } from 'ol/layer'
import { OSM } from 'ol/source'
import { fromLonLat } from 'ol/proj'
import { Vector as VectorLayer } from 'ol/layer'
import VectorSource from 'ol/source/Vector'
import { useAppSelector } from '@/hooks/redux'
import { clubs } from '@/store/searchSlice'
import { Club } from '@/Types/types'
import { Feature } from 'ol'
import Point from 'ol/geom/Point'
import { Icon, Style } from 'ol/style'
import 'ol/ol.css'
import Modal from 'react-modal'
import styles from '@/components/Map/Map.module.scss'
import geoMarker from '@/assets/geo.svg'
import userMarkerIcon from '@/assets/geo-1.svg'
import { useNavigate } from 'react-router-dom'
import { FullScreen, defaults as defaultControls } from 'ol/control'

Modal.setAppElement('#root')

const ClubMapMarkers: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null)
  const popupRef = useRef<HTMLDivElement | null>(null) // Ref для popup элемента
  const clubsList = useAppSelector(clubs)
  const [map, setMap] = useState<Map | null>(null)
  const [overlay, setOverlay] = useState<Overlay | null>(null)
  //   const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  // const [popupContent, setPopupContent] = useState<string | null>(null)
  const navigate = useNavigate()
  const userLatitude = useAppSelector((state) => state.search.latitude)
  const userLongitude = useAppSelector((state) => state.search.longitude)
  //   const dispatch = useDispatch<AppDispatch>();
  console.log(userLatitude, userLongitude)
  const [isMapExpanded, setIsMapExpanded] = useState<boolean>(true)
  const clubsVisibility = useAppSelector(
    (state) => state.search.clubsVisibility,
  )

  // Определяем начальные координаты, еслиюзер не выбрал свой адрес
  const initialCoordinates: [number, number] = [30.3158, 59.9343] // Невский пр. 30
  console.log(clubsVisibility)

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.getElementById('footer') // Предположим, у футера есть id="footer"
      if (footer) {
        const footerRect = footer.getBoundingClientRect()
        // Проверяем, виден ли футер
        if (footerRect.top <= window.innerHeight) {
          setIsMapExpanded(false) // Уменьшаем высоту карты
        } else {
          setIsMapExpanded(true) // Полная высота карты
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

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
        center: fromLonLat(
          userLatitude !== '' &&
            userLatitude !== undefined &&
            userLongitude !== '' &&
            userLongitude !== undefined
            ? [userLatitude, userLongitude]
            : initialCoordinates,
        ),
        zoom: 12,
      }),
      controls: defaultControls().extend([
        new FullScreen(),
        // new Attribution({ collapsible: false }), // Добавляем контроль атрибуции
      ]),
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
  }, [])

  useEffect(() => {
    if (map && overlay) {
      const vectorLayer = map.getLayers().item(1) as VectorLayer
      const vectorSource = vectorLayer.getSource() as VectorSource
      console.log(clubsVisibility)
      // Очищаем старые маркеры перед добавлением новых
      vectorSource.clear()

      clubsList.forEach((club: Club) => {
        console.log(clubsVisibility[club.id])
        // Проверяем видимость клуба в состоянии clubsVisibility
        if (clubsVisibility[club.id]) {
          const marker = new Feature({
            geometry: new Point(fromLonLat([club.longitude, club.latitude])),
          })

          const defaultIcon = new Icon({
            src: geoMarker,
            scale: 0.4, // Стандартный размер
          })

          const hoverIcon = new Icon({
            src: geoMarker,
            scale: 0.54, // Размер при наведении
          })

          marker.setStyle(
            new Style({
              image: defaultIcon,
            }),
          )

          // Сохраняем информацию о клубе в маркере
          marker.set('club', club)
          marker.set('defaultStyle', new Style({ image: defaultIcon })) // Сохраняем стандартный стиль
          marker.set('hoverStyle', new Style({ image: hoverIcon })) // Сохраняем стиль для hover
          vectorSource.addFeature(marker)
        }
      })

      const userLayer = new VectorLayer({
        source: new VectorSource(),
      })
      map.addLayer(userLayer)

      // Добавляем маркер для пользователя, если его координаты существуют
      if (userLongitude && userLatitude) {
        const userCoordinates = [userLatitude, userLongitude]
        const userMarker = new Feature({
          geometry: new Point(fromLonLat(userCoordinates)),
        })
        const userMarkerURL = userMarkerIcon
        userMarker.setStyle(
          new Style({
            image: new Icon({
              src: userMarkerURL, // Убедитесь, что у вас есть иконка для пользователя
              scale: 0.5,
            }),
          }),
        )

        userLayer.getSource()?.addFeature(userMarker)
        // // Центрируем карту на пользователя
        map.getView()?.setCenter(fromLonLat(userCoordinates))
        // // map.getView().setZoom(15);
      }

      const mapTarget = map.getTarget()
      // Обработчик движения мыши по карте
      map.on('pointermove', (evt) => {
        const pixel = map.getEventPixel(evt.originalEvent)
        const feature = map.forEachFeatureAtPixel(pixel, (feature) => feature)

        // Устанавливаем курсор при наведении
        if (mapTarget instanceof HTMLElement) {
          mapTarget.style.cursor = feature ? 'pointer' : ''
        }
        if (feature && popupRef.current) {
          const club = feature.get('club')
          if (club) {
            ;(feature as Feature).setStyle(feature.get('hoverStyle')) // Устанавливаем стиль hover
            const coordinate = evt.coordinate

            // setPopupContent(
            //   `<div><strong>${club.name}</strong><br>${club.address}</div>`,
            // )
            overlay.setPosition(coordinate) // Устанавливаем позицию попапа
            popupRef.current.style.display = 'block' // Показываем попап
            popupRef.current.innerHTML = `<div><strong>${club.name}</strong><br>${club.address}</div>`
          }
        } else if (popupRef.current) {
          // Возвращаем стандартный стиль, если мышь ушла с маркера
          vectorSource.getFeatures().forEach((markerFeature) => {
            markerFeature.setStyle(markerFeature.get('defaultStyle'))
          })
          overlay.setPosition(undefined) // Скрываем попап
          popupRef.current.style.display = 'none' // Скрываем элемент попапа
        }
        //обработчик клика на маркер
        map.on('click', function (evt) {
          const feature = map.forEachFeatureAtPixel(
            evt.pixel,
            function (feature) {
              if (feature) {
                const club = feature.get('club')
                if (club) {
                  window.open(`/club/${club.id}`, '_blank')
                }
              }
            },
          )

          if (!feature) {
            return
          }
        })
      })
    }
  }, [
    map,
    clubsList,
    overlay,
    userLongitude,
    userLatitude,
    navigate,
    clubsVisibility,
  ])

  return (
    <>
      {/*  // тут ширина и высота компонента карты */}
      <div
        id="map"
        ref={mapRef}
        style={{
          width: '49%',
          // height: "100%",
          height: !isMapExpanded ? 'calc(100vh - 250px)' : '100vh',
          top: !isMapExpanded ? '0' : '7.5vh',
          // height: 'calc(100vh - 200px)',
          // height: "880px",
          borderRadius: '10px', // Добавляем скругление углов
          overflow: 'hidden', // Предотвращаем выход карты за границы
          // position: "fixed",
          position: 'fixed',
          // top: '10vh',
          // top: "0",
          bottom: '0',
          marginLeft: '5%',
        }}
      />
      {/* <div id="popup"></div> */}
    </>
  )
}

export default ClubMapMarkers
