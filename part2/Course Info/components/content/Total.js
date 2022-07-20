import React from 'react'

const Total = (props) => {
    const { total } = props

    return (
        <p>
            Total of {total.reduce((first, last) => first + last.exercises, 0)} exercises
        </p>
    )
}

export default Total