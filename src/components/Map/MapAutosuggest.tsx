import { useRef, useState } from "react";
import "ol/ol.css";
import axios from "axios";
import Autosuggest, {
  SuggestionsFetchRequestedParams,
  SuggestionSelectedEventData,
} from "react-autosuggest";
import styles from "./AutoSuggest.module.scss";
import { useDispatch } from "react-redux";
import { setAddressError,  setAutosuggestOpen,  setCoordinates, setUserAddress } from "@/store/searchSlice";
import { InputFieldProps, Suggestion } from "@/Types/types";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { on } from "events";

// Определяем начальные координаты
const initialCoordinates: [number, number] = [30.3158, 59.9343]; // Невский пр. 30

const MapAutosuggest: React.FC<InputFieldProps> = ({ control, ...props }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  // const [addressError, setAddressError] = useState<boolean | null>(false);
  const [userCoordinates, setUserCoordinates] =
    useState<[number, number]>(initialCoordinates);
  const dispatch = useAppDispatch();
  const address = useAppSelector((state) => state.search.address);
  const addressError = useAppSelector((state) => state.search.addressError);  
  const isAutosuggestOpen = useAppSelector((state) => state.search.isAutosuggestOpen);

  const handleAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    { newValue }: { newValue: string }
  ) => {

    if (newValue.length <= 255) {
      dispatch(setUserAddress(newValue));
      dispatch(setAddressError(false));//обнуляем ошибку адреса при очищении поля
    }
    // dispatch(setUserAddress(newValue));
  };
  const handleSuggestionsFetchRequested = async ({
    value,
  }: SuggestionsFetchRequestedParams) => {
  
    if (value.length > 1) {
      // dispatch(setAutosuggestOpen({ isAutosuggestOpen: !isAutosuggestOpen }));
      try {
        console.log(value);
        
        console.log(addressError)
        const response = await axios.get<{ features: any[] }>(
          `http://62.113.111.95:2322/api/?q=${value}&limit=5`
        );
        console.log(response.data);

        const features = response.data.features;
        if (features.length === 0 || features.length > 1) {
          console.log("Адрес не найден.");
          // setSuggestions([]);
         dispatch(setAddressError(true));  
        }  

        const formattedSuggestions = features.map((feature) => {
          const city = feature.properties.city || "";
          const district = feature.properties.state || "";

          // Проверка: если город и район совпадают, оставляем только город
          const displayLocation =
            city === district ? city : `${city} ${district}`;

          return {
            name: feature.properties.label || "",
            organization: feature.properties.name || "",
            city: displayLocation,
            street: feature.properties.street || "",
            housenumber: feature.properties.housenumber || "",
            // district: district,
            coordinates: feature.geometry.coordinates, // Координаты
          };
        });

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
    // if (!suggestion.coordinates || suggestion.name === "") {
    //   console.log("Адрес не найден.");
    //   return;
    // }
    const newAddress =
      suggestion.city +
      " " +
      suggestion.organization +
      " " +
      suggestion.street +
      " " +
      suggestion.housenumber;

    console.log(suggestion);

    // setAddress(newAddress);
    dispatch(setUserAddress(newAddress));
    const lonLat: [number, number] = suggestion.coordinates.map(
      (coord: number) => parseFloat(coord.toFixed(4))
    );
    console.log(lonLat);
    dispatch(setAutosuggestOpen({ isAutosuggestOpen: !isAutosuggestOpen }));
    setUserCoordinates(lonLat);
    dispatch(setCoordinates({ longitude: lonLat[1], latitude: lonLat[0] }));
    // Установка центра карты
    // map?.getView().setCenter(fromLonLat(lonLat));
    // map?.getView().setZoom(15);
  };

  const getSuggestionValue = (suggestion: Suggestion) => suggestion.housenumber; // Используем название объекта

  const renderSuggestion = (suggestion: Suggestion) => (
    <div>
      {suggestion.city} {suggestion.housenumber} {suggestion.street}{" "}
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
    placeholder: "Ваш адрес",
    value: address || "",
    onChange: handleAddressChange,
    // // className: 'inputAutoSuggest'
    className: styles.inputAutosuggest,
    onFocus: () => dispatch(setAutosuggestOpen({ isAutosuggestOpen: !isAutosuggestOpen })),
  };
  //   const updatedInputProps = {
  //     ...inputProps,
  //     className: styles.inputAutosuggest, // Здесь задаем ваш класс
  // };

  return (
    <>
      <div className={styles.autosuggest}>
  
        <Autosuggest
          // className={styles.autosuggest_container}
          control={control}
          suggestions={suggestions}
          onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
          // onSuggestionsFetchRequested={() => {}}
          onSuggestionsClearRequested={() => setSuggestions([])}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          // value={address}
          // inputProps={updatedInputProps}
          onSuggestionSelected={handleSuggestionSelected}
          // placeholder={placeholder}
          theme={{
            container: styles.container,
            suggestionsContainer: styles.suggestionsContainer,
            suggestionsList: styles.suggestionsList,
            suggestion: styles.suggestion,
            suggestionHighlighted: styles.suggestionHighlighted,
          }}
          {...props}
        />
        {addressError && (
          <div className={styles.error}>
            Данный адрес не найден  
          </div>
        )}
      </div>
      <div
        id="map"
        ref={mapRef}
        style={{
          // width: "4px",
          display: "none",
          backgroundColor: "transparent",
          // height: '600px',
          // textAlign: 'initial',
        }}
      />
    </>
  );
};

export default MapAutosuggest;
