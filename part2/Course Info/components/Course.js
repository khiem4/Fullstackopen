import Header from './content/Header'
import Content from './content/Content'

const Course = (props) => {
    const { header, parts } = props
    console.log(parts)

    return (
        <div>
            <Header header={header} />
            <Content parts={parts} />
        </div>
    )
}

export default Course