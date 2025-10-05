import { Link } from 'react-router-dom';
import css from './App.module.css';

import { useFetch } from './useFetch';

function App() {

  const {answers: [answers], error: [error], loading: [loading]} = useFetch('/api/v1/answers');

  if (loading) {
    return (
      <div className={css.loading}>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className={css.error}>
        <h1>Error: {error}</h1>
      </div>
    );
  }

  return (
    <div className={css.App}>
      <header className="App-header">
        <h1>Варианты решений к практическим заданиям</h1>
        <p>
          Книга "Разработка фронтенд-приложений"
        </p>
        <p>Издательство "Питер", ISBN: 978-5-4461-4272-9</p>
        <p>
          <a href='https://www.piter.com/product_by_id/1515624649'>Книга на сайте издательства</a>
        </p>
      </header>
      <main>
        {
          JSON.parse(answers).map((answer) => {
            const { chapter, title } = answer;

            return (
              <section key={chapter} className={css.chapteranswer}><h4>{chapter}</h4> : <Link to={`${chapter}`}>{title}</Link></section>
            );
          })
        }
      </main>
    </div>
  );
}

export default App;
