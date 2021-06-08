import { useContext, useEffect, useState } from 'react'
import ProductContext from '../Contexts/ProductContext'
import { Image } from 'react-bootstrap'


function ProductDetails() {
  const { productId } = useContext(ProductContext)
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
              setImage(false)
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
      {productDetails && image ? <Image src={productDetails.results[0].photos[0].url} fluid /> : <></>}
    </>
  )

}

export default ProductDetails


