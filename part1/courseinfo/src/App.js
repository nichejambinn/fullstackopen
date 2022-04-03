const Header = (props) => {
  // takes care of rendering the name of the course
  console.log(props)
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  // render the name and number of exercises of one part
  console.log(props)
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

const Content = (props) => {
  // renders the part components
  console.log(props)
  return (
    <div>
      <Part part={props.part1} exercises={props.exercises1} />
      <Part part={props.part2} exercises={props.exercises2} />
      <Part part={props.part3} exercises={props.exercises3} />
    </div>
  )
}

const Total = (props) => {
  // renders the total number of exercises
  console.log(props)
  return (
    <p>Number of exercises {props.totalexercises}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content 
        part1={part1.name} exercises1={part1.exercises}
        part2={part2.name} exercises2={part2.exercises}
        part3={part3.name} exercises3={part3.exercises}
      />
      <Total totalexercises={part1.exercises+part2.exercises+part3.exercises}/>
    </div>
  )
}

export default App