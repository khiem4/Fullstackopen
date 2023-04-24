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
  const [date, setDate] = useState('')
  const [diaries, setDiaries] = useState<Diary[]>([])

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

    diaryService.create(newDiary)
    setDiaries(diaries.concat(newDiary))
  }

  return (
    <>
      <div>
        <h2>add new entry</h2>
        <form
          onSubmit={submit}
          style={{ display: "grid", width: "30%", }} >
          <label htmlFor="weather">weather</label>
          <input
            type="text"
            name='weather'
            onChange={(e) => setWeather(e.target.value)}
            value={weather}
          />
          <label htmlFor="comment">comment</label>
          <input
            type="text"
            name='comment'
            onChange={(e) => setComment(e.target.value)}
            value={comment}

          />
          <label htmlFor="visibility">visibility</label>
          <input
            type="text"
            name='visibility'
            onChange={(e) => setVisibility(e.target.value)}
            value={visibility}
          />
          <label htmlFor="date">date</label>
          <input
            type="text"
            name='date'
            onChange={(e) => setDate(e.target.value.toString())}
            value={date}
          />
          <button>add</button>
        </form>
      </div >
      <div>
        <h3>diary entries</h3>
        {diaries.map((diary, index) =>
          <div key={index}>
            <p>{diary.date}</p>
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
