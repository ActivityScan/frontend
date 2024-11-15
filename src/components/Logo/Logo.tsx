import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { resetFilters } from '@/store/searchSlice'
import { useForm } from 'react-hook-form'
import { fetchSportTypes } from '@/utils/api'
import { AnyAction } from '@reduxjs/toolkit'

const Logo: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const { reset } = useForm()

  const handleLogoClick = async () => {
    if (
      location.pathname === '/searchresults' ||
      location.pathname.includes('/club/') ||
      location.pathname === '/info' ||
      location.pathname === '/aboutUs' ||
      location.pathname === '/support'
    ) {
      dispatch(fetchSportTypes() as unknown as AnyAction)
      // Сброс фильтров в Redux
      dispatch(resetFilters())
      // Сброс всех значений формы с помощью react-hook-form
      reset()
      navigate('/')
      // dispatch(fetchSportTypes() as unknown as AnyAction);
    }
  }

  return (
    <img
      src="/svg/Logo2.svg"
      alt="logo"
      width={197}
      height={49}
      style={{ cursor: 'pointer' }}
      onClick={handleLogoClick} // Обработчик клика
    />
  )
}

export default Logo
