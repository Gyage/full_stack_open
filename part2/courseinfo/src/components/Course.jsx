import Header from "./Header"
import Part from "./Part";
import Total from "./Total";

const Course = ({ course }) => {

  const partElements = course.parts.map(part => (
    <Part key={part.id} name={part.name} exercises={part.exercises} />
  ));

  return (
    <>
      <Header name={course.name} />
      {partElements}
      <Total parts={course.parts} />
    </>
  )
}

export default Course