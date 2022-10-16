import { filterAnecdote } from "../reducers/filterReducer"
import { connect } from "react-redux"

const Filter = (props) => {

  const handleChange = (event) => {
    const wordsSearch = event.target.value.toLowerCase()
    props.filterAnecdote(wordsSearch)
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


const mapDispatchToProps = {
  filterAnecdote
}

export default connect(null, mapDispatchToProps)(Filter)
