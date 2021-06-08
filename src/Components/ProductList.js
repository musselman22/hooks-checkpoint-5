import { useEffect, useState } from 'react'
import ProductDetails from './ProductDetail'
import Card from 'react-bootstrap/Card'
import { Button, Col, Row, Container } from 'react-bootstrap'
import ProductContext from '../Contexts/ProductContext'
import { isConstructorDeclaration } from 'typescript'

//const mockProducts = [{ "id": 1, "name": "Camo Onesie", "slogan": "Blend in to your crowd", "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.", "category": "Jackets", "default_price": "140" }, { "id": 2, "name": "Bright Future Sunglasses", "slogan": "You've got to wear shades", "description": "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.", "category": "Accessories", "default_price": "69" }, { "id": 3, "name": "Morning Joggers", "slogan": "Make yourself a morning person", "description": "Whether you're a morning person or not.  Whether you're gym bound or not.  Everyone looks good in joggers.", "category": "Pants", "default_price": "40" }, { "id": 4, "name": "Slacker's Slacks", "slogan": "Comfortable for everything, or nothing", "description": "I'll tell you how great they are after I nap for a bit.", "category": "Pants", "default_price": "65" }, { "id": 5, "name": "Heir Force Ones", "slogan": "A sneaker dynasty", "description": "Now where da boxes where I keep mine? You should peep mine, maybe once or twice but never three times. I'm just a sneaker pro, I love Pumas and shell toes, but can't nothin compare to a fresh crispy white pearl", "category": "Kicks", "default_price": "99" }]


function ProductList() {
  const [products, setProducts] = useState([])
  const [productId, setProductId] = useState('')

  async function getProducts() {
    // const data = await fetch("http://3.21.164.220/products")
    const data = await fetch("http://18.224.200.47/products/list")
    const response = await data.json()
    setProducts(response)
  }

  useEffect(() => {
    getProducts()
  }, [])

  const onClickCard = (e) => {
    if (productId === e.target.classList[0]) {
      setProductId('')
    } else {
      setProductId(e.target.classList[0])
    }
  }

  return (
    <ProductContext.Provider value={{ productId }}>
      <Container>
        {/* change back to products once API is back */}
        <Row>
          <Col>
            {products.map(product => {
              return <Card key={product.id} style={{ width: '18rem' }} onClick={(e) => onClickCard(e)}>
                <Card.Body>
                  <Card.Title className={product.id}>{product.name}</Card.Title>
                  <Card.Text className={product.id}>{product.description}</Card.Text>
                  {/* <Button variant="primary">View Product Image</Button> */}
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