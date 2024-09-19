import { Container, Text, VStack, SimpleGrid } from "@chakra-ui/react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useProductStore } from "../store/product"
import { ProductCard } from "../components/ProductCard"

export const HomePage = () => {
  const { fetchProducts, products } = useProductStore()

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return (
    <Container maxW={'container-xl'} py={12}>
      <VStack spacing={8}>
        <Text
          bgGradient='linear(to-r, cyan.400, blue.500)'
          bgClip='text'
          fontSize={{base: '22', md: '28'}}
          fontWeight='bold'
          textTransform={'uppercase'}
          textAlign={'center'}
        >
          Current Products
        </Text>

        <SimpleGrid columns={{base: 1, md: 2, lg: 3}} w={'full'} spacing={8}>
          { 
            products.map((product) => (
              <ProductCard key={product._id} product={product}/>
            ))
          }
        </SimpleGrid> 

        {
          products.length === 0 && (
            <Text fontSize={'xl'} textAlign={'center'} fontWeight={'bold'} color={'gray.500'}>
              No products available. 
              <Link to={'/create'}>
                <Text as={'span'} color={'blue.500'} _hover={{ textDecoration: 'underline'}}>
                  Create one now!
                </Text>
              </Link>
            </Text>
          )
        }
      </VStack>
    </Container>
  )
}
