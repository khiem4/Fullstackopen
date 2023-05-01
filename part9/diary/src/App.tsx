import React, { useEffect, useState } from 'react';
import diaryService from './services/diary';

export interface Diary {
  date: string,
  visibility: string,
  weather: string,
  comment: string
}

function App() {
  const [weather, setWeather] = useState('')
  const [comment, setComment] = useState('')
  const [visibility, setVisibility] = useState('')
  const [date] = useState(new Date().toString())
  const [diaries, setDiaries] = useState<Diary[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    (async function () {
      const response = await diaryService.getAll()
      setDiaries(response)
    }())
  }, [])

  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault()

    const newDiary = {
      date,
      visibility,
      weather,
      comment,
    }

    diaryService.create(newDiary, setError)
    setTimeout(() => {
      setError('')
    }, 3000)

    setDiaries(diaries.concat(newDiary))
  }

  return (
    <>
      <div>
        <h2>add new entry</h2>
        <p style={{ color: 'red' }}>
          {error}
        </p>
        <form
          onSubmit={submit}
          style={{ display: "grid", width: "30%", }}>
          <h4>Weather</h4>
          <label htmlFor="weather">rainy</label>
          <input
            type="radio"
            name="weather"
            onChange={() => setWeather('rainy')}
          />
          <label htmlFor="weather">sunny</label>
          <input
            type="radio"
            name="weather"
            onChange={() => setWeather('sunny')}
          />
          <label htmlFor="weather">windy</label>
          <input
            type="radio"
            name="weather"
            onChange={() => setWeather('windy')}
          />
          <label htmlFor="weather">cloudy</label>
          <input
            type="radio"
            name="weather"
            onChange={() => setWeather('cloudy')}
          />

          <h4>Visibility</h4>
          <label htmlFor="good">good</label>
          <input
            type="radio"
            name="visibility"
            onChange={() => setVisibility('good')}
          />
          <label htmlFor="poor">ok</label>
          <input
            type="radio"
            name="visibility"
            onChange={() => setWeather('ok')}
          />
          <label htmlFor="poor">great</label>
          <input
            type="radio"
            name="visibility"
            onChange={() => setWeather('great')}
          />
          <label htmlFor="poor">poor</label>
          <input
            type="radio"
            name="visibility"
            onChange={() => setWeather('poor')}
          />

          <label htmlFor="date">date</label>
          <input
            type='date'
            name='date'
          />

          <label htmlFor="comment">Comment</label>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)} />
          <button style={{ margin: '10px' }}>
            add
          </button>
        </form>
      </div >
      <div>
        <h3>diary entries</h3>
        {diaries.map((diary, index) =>
          <div key={index}>
            <p>{diary.date.toString()}</p>
            <p>visibility :{diary.visibility}</p>
            <p>weather :{diary.weather}</p>
            <p>comment :{diary.comment}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
