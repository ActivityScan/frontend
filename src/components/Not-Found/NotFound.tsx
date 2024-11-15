import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div>
      {/* <h1 >404</h1> */}
      <h1>Страница не найдена</h1>
      {/* <p >
                К сожалению, мы не смогли найти страницу, которую вы ищете.
            </p> */}
      <div>
        <p style={{ margin: '20px', fontSize: '20px' }}>
          Попробуйте перезагрузить страницу или
        </p>
        <Link
          style={{
            fontSize: '20px',
            textDecoration: 'none',
            color: 'darkblue',
          }}
          to="/"
        >
          <p>вернуться на домашнюю страницу</p>
        </Link>
      </div>
    </div>
  )
}
