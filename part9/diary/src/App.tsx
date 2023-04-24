import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Diary {
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
    axios.get<Diary[]>('http://localhost:3001/api/diaries')
      .then(res => setDiaries(res.data))
  }, [])

  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault()
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
            onChange={(e) => setDate(e.target.value)}
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
