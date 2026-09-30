import Part from "./Part"

const Content = (parts) => {
  return (
    <div>
      <Part content={parts.parts[0]} />
      <Part content={parts.parts[1]} />
      <Part content={parts.parts[2]} />
    </div>
  )
}

export default Content