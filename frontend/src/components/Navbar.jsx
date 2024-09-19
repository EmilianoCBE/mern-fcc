import { Button, Container, Flex, HStack, Text, useColorMode } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { CiSquarePlus } from "react-icons/ci";
import { IoSunnyOutline } from "react-icons/io5";
import { LuMoon } from "react-icons/lu";


export const Navbar = () => {
  const {colorMode, toggleColorMode} = useColorMode()

  return (
    <Container maxW={'1140px'} px={4}>
      <Flex 
        h={16} 
        justify={'space-between'} 
        flexDir={
          { base: 'column', md: 'row' }
        }
      >
        <Text
          bgGradient='linear(to-r, cyan.400, blue.500)'
          bgClip='text'
          fontSize={{base: '22', md: '28'}}
          fontWeight='bold'
          textTransform={'uppercase'}
          textAlign={'center'}
        >
          <Link to='/'>Product Store</Link>
        </Text>

        <HStack spacing={2} alignItems={'center'}>
          <Link to={'/create'}>
            <Button>
              <CiSquarePlus fontSize={20}/>
            </Button>
          </Link>
          <Link to={'#'}>
            <Button onClick={toggleColorMode}>
              {
                colorMode === 'light' ? <LuMoon fontSize={20}/> : <IoSunnyOutline fontSize={20}/>
              }
            </Button>
          </Link>
        </HStack>
      </Flex>
    </Container>
  )
}
