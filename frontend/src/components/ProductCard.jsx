import { Box, Button, Heading, HStack, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast, VStack } from "@chakra-ui/react"
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { useProductStore } from "../store/product"
import { useState } from "react"


export const ProductCard = ({product}) => {

  const [updateProductState, setUpdateProduct] = useState(product)
  const textColor = useColorModeValue("gray.800", "gray.200")
  const bg = useColorModeValue("white", "gray.800")

  const { deleteProduct, updateProduct} = useProductStore()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()


  const handleDeleteProduct = async (id) => {
    const {success, message} = await deleteProduct(id)
    if(!success) {
      toast({
        title: 'Error',
        description: message,
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    } else {
      toast({
        title: 'Success',
        description: message,
        status: 'success',
        duration: 3000,
        isClosable: true
      })
    }
  }

  const handleUpdateProduct = async (id, updatedProduct) => {
    const {success, message} = await updateProduct(id, updatedProduct)
    onClose()
    if(!success) {
      toast({
        title: 'Error',
        description: message,
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    } else {
      toast({
        title: 'Success',
        description: 'Product updated successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true
      })
    }
  }

  return (
    <Box
      shadow={'lg'}
      rounded={'lg'}
      overflow={'hidden'}
      transition={'all .3s ease'}
      _hover={{
        transform: 'translateY(-5px)',
        shadow: 'xl'
      }}
      bg={bg}
    >
      <Image src={product.image} alt={product.name} h={48} w={'full'} objectFit={'cover'}/>

      <Box p={4}>
        <Heading as={'h3'} size={'md'} mb={2}>
          {product.name}
        </Heading>
        <Text fontSize={'xl'} fontWeight={'bold'} color={textColor} mb={4}>
          ${product.price}
        </Text>

        <HStack spacing={2}>
          <IconButton icon={<EditIcon />} colorScheme="blue" onClick={onOpen}/>
          <IconButton icon={<DeleteIcon />} onClick={()=> handleDeleteProduct(product._id)} colorScheme="red"/>
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} product={product}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>Edit Product</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            <VStack spacing={4}>
              <Input 
                placeholder="Product Name"
                value={updateProductState.name}
                onChange={(e) => setUpdateProduct({...updateProductState, name: e.target.value})}
              />
              <Input 
                placeholder="Price"
                value={updateProductState.price}
                onChange={(e) => setUpdateProduct({...updateProductState, price: e.target.value})}
              />
              <Input 
                placeholder="Img URL"
                value={updateProductState.image}
                onChange={(e) => setUpdateProduct({...updateProductState, image: e.target.value})}
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={()=>handleUpdateProduct(product._id, updateProductState)}>
              Update
            </Button>
            <Button onClick={onClose} variant={'ghost'}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}
