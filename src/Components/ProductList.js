import { useEffect, useState } from 'react'
import ProductDetails from './ProductDetail'
import NavBar from './NavBar';
import Card from 'react-bootstrap/Card'
import { Col, Row, Container } from 'react-bootstrap'
import ProductContext from '../Contexts/ProductContext'


function ProductList() {
  const [products, setProducts] = useState([])
  const [productId, setProductId] = useState('')
  const [productSlogan, setProductSlogan] = useState('')
  const [productPrice, setProductPrice] = useState('')

  async function getProducts() {
    // const data = await fetch("http://3.21.164.220/products")
    const data = await fetch("http://18.224.200.47/products/list")
    const response = await data.json()
    setProducts(response)
  }

  useEffect(() => {
    getProducts()
  }, [])

  const onClickCard = (e, slogan, price) => {
    if (productId === e.target.classList[0]) {
      setProductId('')
      setProductSlogan('')
      setProductPrice('')
    } else {
      setProductId(e.target.classList[0])
      setProductSlogan(slogan)
      setProductPrice(price)
    }
  }

  return (
    <ProductContext.Provider value={{ productId, setProductId, products, productSlogan, productPrice }}>
      <Container>
        <NavBar />
        <Row>
          <Col>
            {products.map(product => {
              return <Card key={product.id} style={{ width: '18rem' }} onClick={(e) => onClickCard(e, product.slogan, product.default_price)}>
                <Card.Body>
                  <Card.Title className={product.id}>{product.name}</Card.Title>
                  <Card.Text className={product.id}>{product.description}</Card.Text>
                </Card.Body>
              </Card>
            })
            }
          </Col>
          <Col>
            <ProductDetails />
          </Col>

        </Row>



      </ Container>

    </ProductContext.Provider>

  )
}

export default ProductList