import { Button } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import ProductContext from '../Contexts/ProductContext'
import { useContext } from 'react'

function NavBar() {
  const { setProductId } = useContext(ProductContext)

  function handleSubmit(e) {
    setProductId('')
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Button onClick={(e) => handleSubmit(e)}>Close Photo</Button>
    </Navbar>)
}

export default NavBar