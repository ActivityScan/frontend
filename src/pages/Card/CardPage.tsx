import { Key, useEffect, useState } from 'react'
import styles from './CardPage.module.scss'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchClubInfoById } from '@/utils/api'
import Spinner from '@/components/Spinner/Spinner'
import { AppDispatch, RootState } from '@/store'
import { UnknownAction } from '@reduxjs/toolkit'
import { setChosenClubCoordinates } from '@/store/clubSlice'
import MapForCard from '@/components/Map/MapForCard'
import SocialListItem from './components/SocialListItem'
import getWordForm from '@/utils/getAllClubCountWordForm'
import NotFound from '@/components/Not-Found/NotFound'

const Card = () => {
  const [isOpenPhone, setIsOpenPhone] = useState(false)
  const [isBackButtonVisible, setIsBackButtonVisible] = useState(false)
  const [isOpenSeasonTicket, setIsOpenSeasonTicket] = useState(false)
  const [isOpenMap, setIsOpenMap] = useState(false)

  // const clubsList = useAppSelector(clubs);
  // const { clubId } = useParams();
  const dispatch = useDispatch<AppDispatch>()
  const club = useSelector((state: RootState) => state.club.data) //поля о клубе берем тут!
  console.log(club)
  const loading = useSelector((state: RootState) => state.club.loading)
  const error = useSelector((state: RootState) => state.club.error)
  const latitude = useSelector((state: RootState) => state.search.latitude)
  const longitude = useSelector((state: RootState) => state.search.longitude)
  // const [userDistance, setUserDistance] = useState<number | null>(null);
  const { clubId: clubIdFromUrl } = useParams()

  console.log(latitude, longitude)
  // Проверяем, есть ли clubId в хранилище и, если нет, берем его из URL
  const clubId = club?.id || clubIdFromUrl

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.scrollY || document.documentElement.scrollTop
      if (scrollPosition >= 300) {
        setIsBackButtonVisible(true)
      } else {
        setIsBackButtonVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (clubId && !club) {
      dispatch(fetchClubInfoById(Number(clubId)) as unknown as UnknownAction) // запрашиваем данные о клубе по ID
    }
    dispatch(
      setChosenClubCoordinates({
        longitude: club?.longitude,
        latitude: club?.latitude,
      }),
    ) // сохраняем полученные координаты клуба для карты
  }, [clubId, dispatch, club])

  // useEffect(() => {
  //   if (club && latitude !== null && longitude !== null) {
  //     const foundClub = clubsList.find((club: { id: string | undefined; }) => club.id == clubId);
  //     if (foundClub) {
  //       setUserDistance(foundClub.distance);
  //       // dispatch(setChosenClubCoordinates({ longitude: club.longitude, latitude: club.latitude }));
  //     } else {
  //       console.error('Club not found or coordinates are not set');
  //     } return
  //   }
  // }, [club, clubsList, clubId, latitude, longitude]);

  if (loading)
    return (
      <div>
        <Spinner />
      </div>
    ) // Показываем спиннер
  // if (error) return <div>Error: {error}</div>;
  if (error)
    return (
      <div>
        <NotFound />
      </div>
    )

  return (
    <div className={styles.container}>
      <section className={styles.card} id="home">
        <button
          className={`${styles.card__back_button} ${
            isBackButtonVisible ? styles.visible : ''
          }`}
          type="button"
          onClick={() => window.scrollTo(0, 0)}
        >
          Наверх
        </button>
        <div className={styles.card__header}>
          <div className={styles.card__header_socials}>
            <img
              className={styles.card__header_socials_image}
              src="/images/test.jpg"
              alt="Card-image"
              width={305}
              height={260}
            />
          </div>
          <div className={styles.card__header_info}>
            <div className={styles.card__header_info_name}>
              <h1 className={styles.card__header_info_name_title}>
                {club?.name.baseName}
              </h1>
              <a href="#">
                <img
                  src="/svg/Share.svg"
                  alt="Share"
                  width={24}
                  height={24}
                  style={{ marginTop: '20px' }}
                />
              </a>
            </div>

            {club?.address && (
              <div className={styles.card__header_info_address}>
                <p className={styles.card__header_info_address_text}>
                  {club?.address}
                </p>
              </div>
            )}

            {club?.distance && (
              <div className={styles.card__header_info_transit}>
                <p className={styles.card__header_info_transit_distance}>
                  {club?.distance ? `${club?.distance} ` : '5.2'} км от вашего
                  адреса
                  {/* {userDistance !== null
                 ? `${(userDistance / 1000).toFixed(1)} км от вашего адреса`
                 : ""} */}
                </p>
                <div className={styles.card__header_info_transit_metro}>
                  <img src="/svg/M.svg" alt="Metro" width={20} height={24} />
                  <p className={styles.card__header_info_transit_metro_name}>
                    Петроградская
                  </p>
                </div>
              </div>
            )}

            {club?.businessHours.formattedSchedule && (
              <div className={styles.card__header_info_time}>
                <p className={styles.card__header_info_time_title}>
                  Время работы:
                </p>
                <div className={styles.card__header_info_time_items}>
                  <p className={styles.card__header_info_time_items_text}>
                    {club?.businessHours.formattedSchedule}
                  </p>
                </div>
              </div>
            )}

            <button
              className={
                isOpenPhone
                  ? `${styles.card__header_info_btn_active}`
                  : `${styles.card__header_info_btn}`
              }
              onClick={() => setIsOpenPhone(!isOpenPhone)}
            >
              {isOpenPhone ? (
                `${
                  club?.phoneNumbers.find(
                    (phoneNumber: { priority: number }) =>
                      phoneNumber.priority === 10,
                  )?.phoneNumber
                }`
              ) : (
                <>
                  <img
                    src="/svg/Phone.svg"
                    alt="Phone"
                    width={24}
                    height={24}
                  />
                  Телефоны
                </>
              )}
            </button>

            <a className={styles.card__header_info_link} href="#">
              Сообщить о несоответствии данных
            </a>
          </div>
        </div>
        <ul className={styles.card__list}>
          {club?.socials.map((social: { type: string; url: string }) =>
            social.type.toLowerCase().includes('google') ||
            social.type.toLowerCase().includes('website') ||
            social.type.toLowerCase().includes('vk') ||
            social.type.toLowerCase().includes('youtube') ||
            social.type.toLowerCase().includes('whatsapp') ||
            social.type.toLowerCase().includes('telegram') ? (
              <SocialListItem social={social} club={club} key={social.type} />
            ) : null,
          )}
        </ul>

        {club?.basicInfo && (
          <p className={styles.card__description}>{club?.basicInfo}</p>
        )}

        <div className={styles.card__buttons}>
          <a href="#schedule" className={styles.card__buttons_btn}>
            Расписание
          </a>
          <a href="#price" className={styles.card__buttons_btn}>
            Цены
          </a>
          <a href="#info" className={styles.card__buttons_btn}>
            Информация
          </a>
          <a href="#contacts" className={styles.card__buttons_btn}>
            Контакты
          </a>
        </div>

        <article className={styles.card__block} id="schedule">
          <p className={styles.card__block_title}>Расписание</p>
          <div className={styles.card__block_items}>
            <p className={styles.card__block_items_item}>
              Расписание занятий уточняйте по телефону
            </p>
            {club?.businessHours.formattedSchedule && (
              <div className={styles.card__block_items_item_listStart}>
                <>
                  <p className={styles.card__block_items_item_title}>
                    Часы работы
                  </p>
                  <div>
                    <p className={styles.card__block_items_item_text}>
                      {club?.businessHours.formattedSchedule
                        .split(';')
                        .map((item: string, index: Key) => (
                          <p
                            key={index}
                            className={styles.card__block_items_item_text}
                          >
                            {item}
                          </p>
                        ))}
                    </p>
                  </div>
                </>
              </div>
            )}
            <div className={styles.card__block_items_item_listCenter}>
              <img src="/svg/365.svg" alt="365" width={24} height={24} />
              <p className={styles.card__block_items_item_text_bold}>
                Занятия проводятся круглый год
              </p>
            </div>

            {club?.primaryActivity.summerCamp && (
              <div className={styles.card__block_items_item_listCenter}>
                <img src="/svg/check.svg" alt="check" width={24} height={24} />
                <p className={styles.card__block_items_item_text_bold}>
                  Организация досуга летом
                </p>
                <p className={styles.card__block_items_item_text_small}>
                  {club?.primaryActivity.summerCampDescription}
                  {/* Сборы проводятся в Лен. области и на море */}
                </p>
              </div>
            )}
          </div>
        </article>

        <article className={styles.card__block} id="price">
          <h3 className={styles.card__block_title}>Цены</h3>
          <div className={styles.card__block_items}>
            <h3 className={styles.card__block_subtitle} style={{ margin: 0 }}>
              Разовые занятия
            </h3>
            <div className={styles.card__block_items_item}>
              <div className={styles.card__block_items_item_listCenter}>
                <p className={styles.card__block_items_item_title}>
                  {club?.payment.oneTimeLessonDuration} мин
                </p>
                <p className={styles.card__block_items_item_text_bold}>
                  {club?.payment.oneTimeLessonPrice} ₽
                </p>
              </div>
              {club?.payment.freeTrialLesson && (
                <div className={styles.card__block_items_item_listCenter}>
                  <p className={styles.card__block_items_item_title}>
                    Бесплатное пробное занятие
                  </p>
                </div>
              )}
              {club?.payment.trialLessonPrice && (
                <div className={styles.card__block_items_item_listCenter}>
                  <p className={styles.card__block_items_item_title}>
                    Пробное занятие
                  </p>
                  <p className={styles.card__block_items_item_text_bold}>
                    {club?.payment.trialLessonPrice} ₽
                  </p>
                </div>
              )}
            </div>
            {club?.membershipPlans && (
              <>
                <h3
                  className={styles.card__block_subtitle}
                  style={{ margin: 0 }}
                >
                  Абонементы
                </h3>
                <div className={styles.card__block_items_item}>
                  {club?.membershipPlans.map(
                    (membershipPlan: {
                      id: number
                      sessionsPerWeek: number
                      sessionDurationMin: number
                      sessionsPerMonth: number
                      subscriptionCostRub: number
                    }) => (
                      <div
                        className={styles.card__block_items_item_listCenter}
                        key={membershipPlan.id}
                      >
                        {membershipPlan.sessionsPerWeek > 0 && (
                          <p className={styles.card__block_items_item_title}>
                            {getWordForm(membershipPlan.sessionsPerWeek, 'раз')}{' '}
                            в неделю ({membershipPlan.sessionDurationMin} мин)
                          </p>
                        )}
                        {membershipPlan.sessionsPerMonth > 0 && (
                          <p className={styles.card__block_items_item_title}>
                            {getWordForm(
                              membershipPlan.sessionsPerMonth,
                              'раз',
                            )}{' '}
                            в месяц
                          </p>
                        )}

                        <p className={styles.card__block_items_item_text_bold}>
                          {membershipPlan.subscriptionCostRub} ₽
                        </p>
                      </div>
                    ),
                  )}

                  <div className={styles.card__block_items_item_listCenter}>
                    <button
                      className={styles.card__block_items_item_button}
                      onClick={() => setIsOpenSeasonTicket(!isOpenSeasonTicket)}
                    >
                      Дополнительные варианты абонементов
                      <img
                        className={
                          isOpenSeasonTicket
                            ? `${styles.card__block_items_item_button_img}`
                            : ''
                        }
                        src="/svg/button-down.svg"
                        alt="down"
                        width={12}
                        height={6}
                      />
                    </button>
                  </div>
                  {isOpenSeasonTicket && (
                    <div className={styles.card__block_items_item}>
                      <p>месячный абонемент</p>
                      <p>квартальный абонемент</p>
                      <p>годовой абонемента</p>
                    </div>
                  )}
                  <div className={styles.card__block_items_item_listCenter}>
                    <img
                      src="/svg/check.svg"
                      alt="check"
                      width={24}
                      height={24}
                    />
                    <p className={styles.card__block_items_item_text_bold}>
                      Отработка занятий
                    </p>
                    <p className={styles.card__block_items_item_text_small}>
                      добавляют 7 дней
                    </p>
                  </div>
                  <div className={styles.card__block_items_item_listCenter}>
                    <p className={styles.card__block_items_item_title}>
                      Способ оплаты:
                    </p>
                    <p className={styles.card__block_items_item_text}>
                      {club?.payment.paymentOption}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </article>

        <article className={styles.card__block} id="info">
          <div className={styles.card__block_items}>
            <h3 className={styles.card__block_title} style={{ margin: 0 }}>
              Общая информация
            </h3>
            <div className={styles.card__block_items_item}>
              <div className={styles.card__block_items_item_listCenter}>
                <p className={styles.card__block_items_item_title}>
                  {/* Занятия для детей от 3 до 17 лет */}
                  Занятия для детей от {club?.primaryActivity.ageMin} до{' '}
                  {club?.primaryActivity.ageMax} лет
                </p>
              </div>

              {club?.primaryActivity.adultGroups && (
                <div className={styles.card__block_items_item_listCenter}>
                  <img
                    src="/svg/check.svg"
                    alt="check"
                    width={24}
                    height={24}
                  />
                  <p className={styles.card__block_items_item_text_bold}>
                    Взрослые группы
                  </p>
                </div>
              )}

              <div className={styles.card__block_items_item_listCenter}>
                <img src="/svg/check.svg" alt="check" width={24} height={24} />
                <p className={styles.card__block_items_item_text_bold}>
                  Совместные занятия для взрослых и детей
                </p>
              </div>

              {club?.primaryActivity.oneGroupCapacity && (
                <div className={styles.card__block_items_item_listStart}>
                  <p className={styles.card__block_items_item_title}>
                    Численность группы:
                  </p>
                  <p className={styles.card__block_items_item_text}>
                    {club?.primaryActivity.oneGroupCapacity}
                  </p>
                </div>
              )}

              {club?.primaryActivity.beginner && (
                <div className={styles.card__block_items_item_listCenter}>
                  <img
                    src="/svg/check.svg"
                    alt="check"
                    width={24}
                    height={24}
                  />
                  <p className={styles.card__block_items_item_text_bold}>
                    Новички
                  </p>
                  <p className={styles.card__block_items_item_text_small}>
                    {club?.primaryActivity.beginnerDescription}
                    {/* Совсем не умеют плавать. Обучение способом плавания "кроль
                    на спине" и "кроль на груди" */}
                  </p>
                </div>
              )}

              {club?.primaryActivity.intermediate && (
                <div className={styles.card__block_items_item_listCenter}>
                  <img
                    src="/svg/check.svg"
                    alt="check"
                    width={24}
                    height={24}
                  />
                  <p className={styles.card__block_items_item_text_bold}>
                    Продолжающие
                  </p>
                  <p className={styles.card__block_items_item_text_small}>
                    {club?.primaryActivity.intermediateDescription}
                    {/* Плавать умеют, но хотят совершенствоваться . Обучение
                    способу плавания "брасс" и "баттерфляй" */}
                  </p>
                </div>
              )}

              {club?.primaryActivity.coachQualification && (
                <div className={styles.card__block_items_item_listCenter}>
                  <p className={styles.card__block_items_item_title}>
                    Квалификация тренеров:
                  </p>
                  <p className={styles.card__block_items_item_text}>
                    {club?.primaryActivity.coachQualification}
                    {/* КМС по плаванию, МС по плаванию, МС по синхронному плаванию */}
                  </p>
                </div>
              )}

              {club?.primaryActivity.competitionParticipation && (
                <div className={styles.card__block_items_item_listCenter}>
                  <img
                    src="/svg/check.svg"
                    alt="check"
                    width={24}
                    height={24}
                  />
                  <p className={styles.card__block_items_item_text_bold}>
                    Соревнования
                  </p>
                  <p className={styles.card__block_items_item_text_small}>
                    {club?.primaryActivity.competitionDescription}
                    {/* Соревнования внутренние. Пловцы сдают аттестационный экзамен
                    по нормативам */}
                  </p>
                </div>
              )}

              <div className={styles.card__block_items_item_listCenter}>
                <p className={styles.card__block_items_item_title}>
                  Специальные приспособения для занятий:
                </p>
                <p className={styles.card__block_items_item_text}>
                  доска, колбаски
                </p>
              </div>
              <div className={styles.card__block_items_item_listStart}>
                <p className={styles.card__block_items_item_title}>
                  В этом же бассейне:
                </p>
                <p className={styles.card__block_items_item_text}>
                  {club?.infrastructure.otherClubs}
                  {/* Водное поло (для детей 9-14 лет, продолжительность 90 минут),
                  Раннее плавание, Берслайт (обучение контролю дыхания, основным
                  навыкам плавания, ныряния), Аквафитнес */}
                </p>
              </div>
            </div>

            <div className={styles.card__block_end}>
              <h3 className={styles.card__block_subtitle}>О бассейне</h3>
              <div className={styles.card__block_items_item}>
                <div className={styles.card__block_items_item_listCenter}>
                  <p className={styles.card__block_items_item_title}>
                    Тип бассейна:
                  </p>
                  <p className={styles.card__block_items_item_text}>закрытый</p>
                </div>
                <div className={styles.card__block_items_item_listStart}>
                  <p className={styles.card__block_items_item_title}>
                    Способ очистки воды:
                  </p>
                  <p className={styles.card__block_items_item_text}>
                    уровень хлора контролируется компьютером, используется
                    гидрохлорид натрия, + пылесос, пробу с воды берут несколько
                    раз в день
                  </p>
                </div>
                <div className={styles.card__block_items_item_listCenter}>
                  <p className={styles.card__block_items_item_title}>
                    Температура воды:
                  </p>
                  <p className={styles.card__block_items_item_text}>+29°C</p>
                </div>
                <div className={styles.card__block_items_item_listCenter}>
                  <p className={styles.card__block_items_item_title}>
                    Глубина:
                  </p>
                  <p className={styles.card__block_items_item_text}>1 - 2м</p>
                </div>
                <div className={styles.card__block_items_item_listCenter}>
                  <p className={styles.card__block_items_item_title}>
                    Длина дорожки:
                  </p>
                  <p className={styles.card__block_items_item_text}>25 м</p>
                </div>
                <div className={styles.card__block_items_item_listCenter}>
                  <p className={styles.card__block_items_item_title}>
                    Количество дорожек:
                  </p>
                  <p className={styles.card__block_items_item_text}>6</p>
                </div>
                <div className={styles.card__block_items_item_listCenter}>
                  <p className={styles.card__block_items_item_title}>
                    Количество занимающихся на одной дорожке:
                  </p>
                  <p className={styles.card__block_items_item_text}>
                    максимум 12
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.card__block_end}>
              <h3 className={styles.card__block_subtitle}>О раздевалках</h3>
              <div className={styles.card__block_items_item}>
                <div className={styles.card__block_items_item_listCenter}>
                  <p className={styles.card__block_items_item_title}>
                    Хранение одежды:
                  </p>
                </div>
                <div className={styles.card__block_items_item_listCenter}>
                  {club?.participantComfort.locker ? (
                    <div className={styles.card__block_items_item_listCenter}>
                      <img
                        src="/svg/check.svg"
                        alt="check"
                        width={24}
                        height={24}
                      />
                      <p className={styles.card__block_items_item_text_bold}>
                        Шкафчики
                      </p>
                      <p className={styles.card__block_items_item_text}>
                        {club?.participantComfort.lockerDescription}
                      </p>
                    </div>
                  ) : (
                    <p className={styles.card__block_items_item_text}>
                      {club?.participantComfort.lockerDescription}
                    </p>
                  )}
                </div>

                {club?.participantComfort.safeLocker && (
                  <div className={styles.card__block_items_item_listCenter}>
                    <img
                      src="/svg/check.svg"
                      alt="check"
                      width={24}
                      height={24}
                    />
                    <p className={styles.card__block_items_item_text_bold}>
                      Сейф
                    </p>
                    <p className={styles.card__block_items_item_text_small}>
                      {club?.participantComfort.safeLockerDescription}
                    </p>
                  </div>
                )}

                {club?.participantComfort.hairDryer && (
                  <div className={styles.card__block_items_item_listCenter}>
                    <img
                      src="/svg/check.svg"
                      alt="check"
                      width={24}
                      height={24}
                    />
                    <p className={styles.card__block_items_item_text_bold}>
                      Фен
                    </p>
                    <p className={styles.card__block_items_item_text_small}>
                      {club?.participantComfort.hairDryerDescription}
                    </p>
                  </div>
                )}

                <div className={styles.card__block_items_item_listCenter}>
                  <p className={styles.card__block_items_item_title}>
                    Покрытие пола от раздевалки до бассейна:
                  </p>
                  <p className={styles.card__block_items_item_text}>
                    коврик с сеткой
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.card__block_end}>
              <h3 className={styles.card__block_subtitle}>О безопасности</h3>
              <div className={styles.card__block_items_item}>
                {club?.safety.medicalProfessional && (
                  <div className={styles.card__block_items_item_listCenter}>
                    <img
                      src="/svg/Med.svg"
                      alt="check"
                      width={24}
                      height={24}
                    />
                    <p className={styles.card__block_items_item_text_bold}>
                      Медработник в центре
                    </p>
                  </div>
                )}
                {club?.safety.requiredDocuments && (
                  <div className={styles.card__block_items_item_listCenter}>
                    <p className={styles.card__block_items_item_text}>
                      {club?.safety.requiredDocuments}
                      {/* На каждой дорожке свой тренер, и помимо тренеров в бассейне
                    находится врач. */}
                    </p>
                  </div>
                )}
                {club?.safety.safety && (
                  <div className={styles.card__block_items_item_listCenter}>
                    <p className={styles.card__block_items_item_text}>
                      {club?.safety.safety}
                      {/* На каждой дорожке свой тренер, и помимо тренеров в бассейне
                    находится врач. */}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <h3 className={styles.card__block_subtitle} style={{ margin: 0 }}>
              О зоне ожидания
            </h3>
            <div className={styles.card__block_items_item}>
              {club?.companionComfort.waitingArea && (
                <div className={styles.card__block_items_item_listCenter}>
                  <img
                    src="/svg/check.svg"
                    alt="check"
                    width={24}
                    height={24}
                  />
                  <p className={styles.card__block_items_item_text_bold}>
                    Место ожидания для родителей
                  </p>
                </div>
              )}
              {club?.companionComfort.foodInBuilding && (
                <div className={styles.card__block_items_item_listCenter}>
                  <p className={styles.card__block_items_item_text}>
                    {club?.companionComfort.foodInBuildingDescription}
                  </p>
                </div>
              )}
            </div>
          </div>
        </article>

        <article className={styles.card__block} id="contacts">
          <p className={styles.card__block_title}>Контакты</p>
          <div className={styles.card__block_items}>
            <div className={styles.card__block_end}>
              <div className={styles.card__block_items_item_listStart}>
                <p className={styles.card__block_items_item_title}>Адрес:</p>
                <p className={styles.card__block_items_item_text}>
                  {club?.address}
                </p>
                <button
                  className={styles.card__block_items_item_button_map}
                  onClick={() => setIsOpenMap(!isOpenMap)}
                >
                  Показать на карте
                </button>
              </div>
              <div style={{ marginTop: '20px' }}>
                {isOpenMap && <MapForCard club={club} />}
              </div>
              <button
                className={
                  isOpenPhone
                    ? `${styles.card__header_info_btn_active}`
                    : `${styles.card__header_info_btn}`
                }
                onClick={() => setIsOpenPhone(!isOpenPhone)}
              >
                {isOpenPhone ? (
                  `${
                    club?.phoneNumbers.find(
                      (phoneNumber: { priority: number }) =>
                        phoneNumber.priority === 10,
                    )?.phoneNumber
                  }`
                ) : (
                  <>
                    <img
                      src="/svg/Phone.svg"
                      alt="Phone"
                      width={24}
                      height={24}
                    />
                    Телефоны
                  </>
                )}
              </button>
              <ul className={styles.card__list}>
                {club?.socials.map((social: { type: string; url: string }) =>
                  social.type.toLowerCase().includes('google') ||
                  social.type.toLowerCase().includes('website') ||
                  social.type.toLowerCase().includes('vk') ||
                  social.type.toLowerCase().includes('youtube') ||
                  social.type.toLowerCase().includes('whatsapp') ||
                  social.type.toLowerCase().includes('telegram') ? (
                    <SocialListItem
                      social={social}
                      club={club}
                      key={social.type}
                    />
                  ) : null,
                )}
              </ul>
            </div>

            <p className={styles.card__block_subtitle}>Транспорт</p>
            <div className={styles.card__block_items_item}>
              <div className={styles.card__block_items_item_listCenter}>
                {club?.infrastructure.publicTransportAccess}
                {/* <p className={styles.card__block_items_item_title}>Метро:</p>
                <p className={styles.card__block_items_item_text}>
                  Проспект Большевиков (2,5 км), Ладожская (2,6 км)
                </p> */}
              </div>
              {/* <div className={styles.card__block_items_item_listCenter}>
                <p className={styles.card__block_items_item_title}>Автобус:</p>
                <p className={styles.card__block_items_item_text}>
                  169, 288, 153
                </p>
              </div>
              <div className={styles.card__block_items_item_listCenter}>
                <p className={styles.card__block_items_item_title}>Трамвай:</p>
                <p className={styles.card__block_items_item_text}>
                  8, 59, 63, 64
                </p>
              </div>
              <div className={styles.card__block_items_item_listCenter}>
                <p className={styles.card__block_items_item_title}>
                  Троллейбус:
                </p>
                <p className={styles.card__block_items_item_text}>43</p>
              </div>
              <div className={styles.card__block_items_item_listCenter}>
                <p className={styles.card__block_items_item_title}>
                  Маршрутка:
                </p>
                <p className={styles.card__block_items_item_text}>801А </p>
              </div>
              <div className={styles.card__block_items_item_listCenter}>
                <p className={styles.card__block_items_item_text}>
                  Вам необходимо выйти на остановке «Улица Передовиков». Далее
                  Вы проходите прямо по улице Передовиков до дома № 9, за домом
                  Вы увидите «полосатое» здание бассейна
                </p>
              </div> */}
            </div>
          </div>
        </article>
      </section>
      <aside className={styles.card__aside}>
        <div className={styles.card__aside_info}>
          <p className={styles.card__aside_owner}>Вы владелец?</p>
          Раздел для публикации акций от зарегистрированных секций. Здесь может
          быть ваша реклама.
        </div>
        <div className={styles.card__aside_block}>
          <img src="/images/aside-block-01.jpg" alt="01" width={304} />
          <img src="/images/aside-block-02.jpg" alt="02" width={304} />
          <img src="/images/aside-block-03.jpg" alt="03" width={304} />
          <img src="/images/aside-block-04.jpg" alt="04" width={304} />
          <img src="/images/aside-block-05.jpg" alt="05" width={304} />
          {/* <img src="/images/aside-block-06.jpg" alt="06" width={304} />
          <img src="/images/aside-block-07.jpg" alt="07" width={304} /> */}
        </div>
      </aside>
    </div>
  )
}

export default Card
