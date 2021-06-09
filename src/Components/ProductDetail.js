import { useContext, useEffect, useState } from 'react'
import ProductContext from '../Contexts/ProductContext'
import { Image, Row, Col } from 'react-bootstrap'


function ProductDetails() {
  const { productId, products, productSlogan, productPrice } = useContext(ProductContext)
  const [productDetails, setProductDetails] = useState('')
  const [image, setImage] = useState(false)


  useEffect(() => {
    async function getProductDetails() {
      if (productId !== '') {
        try {
          const data = await fetch(`http://18.224.200.47/products/${productId}/styles`)
          if (data.status === 200) {
            const response = await data.json()
            if (response.results[0].photos[0].url === null) {
              setImage(true)
              setProductDetails({ results: [{ photos: [{ url: 'https://images.unsplash.com/photo-1577803645773-f96470509666?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' }] }] })
            } else {
              setImage(true)
              setProductDetails(response)
            }
          } else {
            throw new Error(data.status)
          }
        }
        catch (error) {
          alert(error)
        }
      } else {
        setProductDetails('')
      }
    }
    getProductDetails()
  }, [productId])

  return (
    <>
      {productDetails && image ? <Row><Col><Image src={productDetails.results[0].photos[0].url} fluid /></Col><Col><div>{productSlogan}</div><div></div><div>SALE PRICE: ${productPrice}</div></Col></Row> : <></>
      }
    </>
  )

}

export default ProductDetails