import {
    Box,
    Button,
    Checkbox,
    Container,
    Divider,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Stack,
    Text,
    useBreakpointValue,
    useColorModeValue,
  } from '@chakra-ui/react'
  import * as React from 'react'
  import { Logo } from './Logo'
//   import { OAuthButtonGroup } from './OAuthButtonGroup'
//   import { PasswordField } from './PasswordField'
  
  export const Login = () => (
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
      <Stack spacing="8">
        <Stack spacing="6">
          {/* <Logo /> */}
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading size={useBreakpointValue({ base: 'xs', md: 'sm' })}>
            Snakes and Ladders
            </Heading>
            {/* <HStack spacing="1" justify="center">
              <Text color="muted">Haven't played before? Lets try it</Text>
            </HStack> */}
          </Stack>
        </Stack>
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={useBreakpointValue({ base: 'transparent', sm: 'bg-surface' })}
          boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <Stack spacing="6">
            <Stack spacing="5">
              {/* <FormControl>
                <FormLabel htmlFor="playerFirstName">PlayerFirstName</FormLabel>
                <Input id="playerFirstName" type="playerFirstName" />
                
                <FormLabel htmlFor="playerSecondName">PlayerSecondName</FormLabel>
                <Input id="playerSecondName" type="playerSecondName" />
              </FormControl> */}
              {/* <PasswordField /> */}
            </Stack>
            <HStack justify="space-between">
                {/* <Button  colorScheme="blue" size="md">
                Switch to 2 player
              </Button>
              <Button  colorScheme="blue" size="md">
                Switch to 4 player
              </Button> */}
            </HStack>
            <Stack spacing="6">
              <Button 
            //   variant="outline" 
              colorScheme="blue">Switch to 4 Players</Button>

              {/* <Button variant="outline">Start Game</Button> */}
              <HStack>
                <Divider />
                <Text fontSize="sm" whiteSpace="nowrap" 
                color="muted"
                >
                  play and have fun
                </Text>
                <Divider />
              </HStack>
              {/* <OAuthButtonGroup /> */}
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  )