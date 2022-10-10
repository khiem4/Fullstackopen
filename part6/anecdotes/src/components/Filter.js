import { filterAnecdote } from "../reducers/filterReducer"
import { useDispatch } from "react-redux"

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const wordsSearch = event.target.value.toLowerCase()
    dispatch(filterAnecdote(wordsSearch))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter
