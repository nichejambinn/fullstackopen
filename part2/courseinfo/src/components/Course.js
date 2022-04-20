import React from 'react'

const Header = ({ course }) => <h2>{course}</h2>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ id, parts }) => parts.map(part => 
  <Part key={part.id} part={part} />)

const Total = ({ total }) => 
  <p>
    <strong>Total of {total} exercises</strong>
  </p>

const Course = ({ course }) => {
  const total = course.parts.reduce((sum, part) => sum + part.exercises, 0)
  
  return (
    <div>
      <Header course={course.name} />
      <Content id={course.id} parts={course.parts} />
      <Total total={total} />
    </div>
  )
}

export default Course