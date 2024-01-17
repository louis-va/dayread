import Logo from "./logo"
import { render } from "@testing-library/react"



describe('<Logo />', () => {
 it('mounts the component', () => {
  const {getByRole} = render(<Logo size={32} />)
  expect(getByRole('logo')).toBeInTheDocument()
 })
})


// function sum(a, b) { return a + b}

// describe('sum', () => {
//  it("sums stuff", () => {
//   expect(sum(2, 1)).toEqual(3)
//  })
// })