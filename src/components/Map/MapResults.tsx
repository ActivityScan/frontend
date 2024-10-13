import { useEffect, useRef, useState } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import { Feature } from "ol";
import "ol/ol.css";
import Point from "ol/geom/Point";
import { Vector as VectorLayer } from "ol/layer";
import VectorSource from "ol/source/Vector";
import { Icon, Style } from "ol/style";
import axios from "axios";
import Autosuggest, {
  SuggestionsFetchRequestedParams,
  SuggestionSelectedEventData,
  InputProps,
} from "react-autosuggest";
import { FullScreen, defaults as defaultControls } from "ol/control";
import Attribution from "ol/control/Attribution";
import "./AutoSuggest.module.scss";

// Определяем начальные координаты
const initialCoordinates: [number, number] = [30.3158, 59.9343]; // Невский пр. 30

const MapResults = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map | null>(null);
  const [address, setAddress] = useState<string>("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [coordinates, setCoordinates] =
    useState<[number, number]>(initialCoordinates);

  useEffect(() => {
    if (mapRef.current) {
      // Ensure mapRef.current is not null
      const initialMap = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          new VectorLayer({
            source: new VectorSource(),
          }),
        ],
        view: new View({
          center: fromLonLat(coordinates),
          zoom: 13,
        }),
        controls: defaultControls().extend([
          new FullScreen(),
          // new Attribution({ collapsible: false }), // Добавляем контроль атрибуции
        ]),
      });

      setMap(initialMap);
      return () => initialMap.setTarget(undefined);
    }
  }, []);

  const handleAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    { newValue }: { newValue: string }
  ) => {
    setAddress(newValue);
  };
  const handleSuggestionsFetchRequested = async ({
    value,
  }: SuggestionsFetchRequestedParams) => {
    // setAddress(newValue);
    if (value.length > 2) {
      try {
        console.log(value);

        const response = await axios.get<{ features: any[] }>(
          `http://62.113.111.95:2322/api/?q=${value}&limit=5`
        );
        console.log(response.data);
        const features = response.data.features;

        // Формируем массив предложений на основе данных
        const formattedSuggestions = features.map((feature) => ({
          name: feature.properties.label,
          organization: feature.properties.name || "Неизвестно",
          city: feature.properties.city || "",
          street: feature.properties.street || "",
          houseNumber: feature.properties.housenumber || "",
          district: feature.properties.state || "",
          coordinates: feature.geometry.coordinates, // Координаты
        }));

        setSuggestions(formattedSuggestions);

        // onSuggestionsFetchRequested({ value: newValue });
      } catch (error) {
        console.log("Ошибка при получении вариантов адресов", error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
      // onSuggestionsFetchRequested({ value: '' });
    }
  };

  const handleSuggestionSelected = (
    event: React.SyntheticEvent,
    { suggestion }: SuggestionSelectedEventData<any>
  ) => {
    console.log(suggestion);
    const lonLat: [number, number] = suggestion.coordinates;
    setCoordinates(lonLat);
    map?.getView().setCenter(fromLonLat(lonLat));
    map?.getView().setZoom(15);

    // Добавление метки
    const marker = new Feature({
      geometry: new Point(fromLonLat(lonLat)),
    });

    marker.setStyle(
      new Style({
        image: new Icon({
          src: "https://openlayers.org/en/latest/examples/data/icon.png",
          scale: 0.7,
        }),
      })
    );

    (map?.getLayers().item(1) as VectorLayer | undefined)
      ?.getSource()
      ?.addFeature(marker);
  };

  //   const getSuggestionValue = (suggestion: any) => suggestion.properties.display_name;

  //   const renderSuggestion = (suggestion: any) => <div>{suggestion.properties.display_name}</div>;
  const getSuggestionValue = (suggestion: any) => suggestion.name; // Используем название объекта

  const renderSuggestion = (suggestion: any) => (
    <div>
      {suggestion.city} {suggestion.houseNumber} {suggestion.street}{" "}
      {suggestion.district} {suggestion.organization}{" "}
      {/* Отображаем название, город и область */}
    </div>
  );
  // interface InputProps {
  //   placeholder: string;
  //   value: string;
  //   onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // }
  const inputProps = {
    placeholder: "Введите адрес в Санкт-Петербурге",
    value: address,
    onChange: handleAddressChange,
    style: {
      placeholder: {
        color: "var(--dark-blue)",
      },
    },
  };

  return (
    <>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
        // onSuggestionsFetchRequested={() => {}}
        onSuggestionsClearRequested={() => setSuggestions([])}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        onSuggestionSelected={handleSuggestionSelected}
      />
      <div
        id="map"
        ref={mapRef}
        style={{ width: "100%", height: "600px", textAlign: "initial" }}
      />
    </>
  );
};

export default MapResults;
