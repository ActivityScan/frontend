import { useEffect, useLayoutEffect, useRef } from 'react'
// import Filters from '@/components/Filters'
import SportSections from '@/components/SportSections'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import MapCommon from '../../components/Map/MapCommon'
import Forms from '@/components/Forms/SearchMainForm'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import Spinner from '@/components/Spinner/Spinner'
import styles from './HomePage.module.scss'
import getWordForm from '@/utils/getAllClubCountWordForm'
import { setAutosuggestOpen, setWorkModeOpen } from '@/store/searchSlice'
import { fetchSportTypes } from '@/utils/api'
import { AnyAction } from '@reduxjs/toolkit'

const SearchResultsPage: React.FC = () => {
  // const [isOpenFilters, setIsOpenFilters] = useState<boolean>(false)
  const clubsList = useAppSelector((state) => state.search.clubs)
  const loading = useSelector((state: RootState) => state.search.loading)
  const isOpen = useAppSelector((state) => state.sports.isOpen)
  const isAutosuggestOpen = useAppSelector(
    (state) => state.search.isAutosuggestOpen,
  )
  const isWorkModeOpen = useAppSelector((state) => state.search.isWorkModeOpen)
  const dispatch = useAppDispatch()
  const selectorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    dispatch(setAutosuggestOpen({ isAutosuggestOpen: false }))
    dispatch(setWorkModeOpen({ isWorkModeOpen: false }))
    dispatch(fetchSportTypes() as unknown as AnyAction)
  }, [dispatch])

  useLayoutEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectorRef.current &&
        !selectorRef.current.contains(event.target as Node)
      ) {
        dispatch(setAutosuggestOpen({ isAutosuggestOpen: false }))
        dispatch(setWorkModeOpen({ isWorkModeOpen: false }))
        // dispatch(toggleSetSportSelector({ isOpen: false }));
        // dispatch(setHoveredSport(null));
        // dispatch(setSuggestions([]));
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dispatch])

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    )
  }
  return (
    <section className={styles.inner}>
      {location.pathname === '/searchresults' && isOpen && (
        <div className={styles.overlay} />
      )}
      {location.pathname === '/searchresults' && isAutosuggestOpen && (
        <div className={styles.overlay} />
      )}
      {location.pathname === '/searchresults' && isWorkModeOpen && (
        <div className={styles.overlay} />
      )}

      <div className={styles.form} ref={selectorRef}>
        <Forms />
      </div>
      {clubsList.length === 0 && (
        <div className={styles.inner__notFound}>
          <h1>Ничего не найдено, попробуйте изменить запрос</h1>
        </div>
      )}
      <div className={styles.inner__info}>
        <div className={styles.inner__filters}>
          <div className={styles.inner__filterControls}>
            {clubsList.length > 0 && (
              <div className={styles.inner__allInfos}>
                <h1>Мы нашли {getWordForm(clubsList.length, 'секция')}</h1>
              </div>
            )}
          </div>
          {/* {isOpenFilters && <Filters />} */}
          <SportSections />
        </div>
        <div className={styles.map}>
          {clubsList.length > 0 && <MapCommon />}
        </div>
      </div>
    </section>
  )
}

export default SearchResultsPage
