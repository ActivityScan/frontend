import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetFilters } from "@/store/searchSlice"; 
import { useForm } from "react-hook-form";


const Logo: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { reset } = useForm();

  const handleLogoClick = () => {
    if (location.pathname === '/searchresults' || location.pathname.includes('/club/')) {
        // Сброс всех значений формы с помощью react-hook-form
        reset(); 

        // Сброс фильтров в Redux
        dispatch(resetFilters());

        // Перенаправление на главную страницу
        navigate("/");
    };  
  };

  return (
    <img
      src="/svg/Logo2.svg"
      alt="logo" 
      width={197} 
      height={49} 
      style={{ cursor: "pointer" }}
      onClick={handleLogoClick} // Обработчик клика
    />
  );
};

export default Logo;
