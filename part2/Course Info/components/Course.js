import Header from './content/Header'
import Content from './content/Content'
import Total from './content/Total'

const Course = (props) => {
    const { header, parts, total } = props

    return (
        <div>
            <Header header={header} />
            <Content parts={parts} />
            <Total total={total} />
        </div>
    )
}

export default Course