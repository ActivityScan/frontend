import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop: React.FC = () => {
  const location = useLocation()

  useEffect(() => {
    // Прокручиваем страницу наверх при каждом изменении маршрута
    window.scrollTo(0, 0)
  }, [location])

  return null
}

export default ScrollToTop
