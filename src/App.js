import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import { Ladder } from './ladder';
import { Badge,Stack ,HStack ,Avatar} from '@chakra-ui/react'
import {
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton,
} from '@chakra-ui/react'
const board = [
  [
    {variant:'solid',boardNumber:100},
    {variant:'subtle',boardNumber:99},
    {variant:'solid',boardNumber:98},
    {variant:'subtle',boardNumber:97},
    {variant:'solid',boardNumber:96},
    {variant:'subtle',boardNumber:95},
    {variant:'solid',boardNumber:94},
    {variant:'subtle',boardNumber:93},
    {variant:'solid',boardNumber:92},
    {variant:'subtle',boardNumber:91},
  ],
  [
    {variant:'subtle',boardNumber:81},
    {variant:'solid',boardNumber:82},
    {variant:'subtle',boardNumber:83},
    {variant:'solid',boardNumber:84},
    {variant:'subtle',boardNumber:85},
    {variant:'solid',boardNumber:86},
    {variant:'subtle',boardNumber:87},
    {variant:'solid',boardNumber:88},
    {variant:'subtle',boardNumber:89},
    {variant:'solid',boardNumber:90},
  ],
  [
    {variant:'solid',boardNumber:80},
    {variant:'subtle',boardNumber:79},
    {variant:'solid',boardNumber:78},
    {variant:'subtle',boardNumber:77},
    {variant:'solid',boardNumber:76},
    {variant:'subtle',boardNumber:75},
    {variant:'solid',boardNumber:74},
    {variant:'subtle',boardNumber:73},
    {variant:'solid',boardNumber:72},
    {variant:'subtle',boardNumber:71},
  ],
  [
    {variant:'subtle',boardNumber:61},
    {variant:'solid',boardNumber:62},
    {variant:'subtle',boardNumber:63},
    {variant:'solid',boardNumber:64},
    {variant:'subtle',boardNumber:65},
    {variant:'solid',boardNumber:66},
    {variant:'subtle',boardNumber:67},
    {variant:'solid',boardNumber:68},
    {variant:'subtle',boardNumber:69},
    {variant:'solid',boardNumber:70},
  ],
  [
    {variant:'solid',boardNumber:60},
    {variant:'subtle',boardNumber:59},
    {variant:'solid',boardNumber:58},
    {variant:'subtle',boardNumber:57},
    {variant:'solid',boardNumber:56},
    {variant:'subtle',boardNumber:55},
    {variant:'solid',boardNumber:54},
    {variant:'subtle',boardNumber:53},
    {variant:'solid',boardNumber:52},
    {variant:'subtle',boardNumber:51},
  ],
  [
    {variant:'subtle',boardNumber:41},
    {variant:'solid',boardNumber:42},
    {variant:'subtle',boardNumber:43},
    {variant:'solid',boardNumber:44},
    {variant:'subtle',boardNumber:45},
    {variant:'solid',boardNumber:46},
    {variant:'subtle',boardNumber:47},
    {variant:'solid',boardNumber:48},
    {variant:'subtle',boardNumber:49},
    {variant:'solid',boardNumber:50},
  ],
  [
    {variant:'solid',boardNumber:40},
    {variant:'subtle',boardNumber:39},
    {variant:'solid',boardNumber:38},
    {variant:'subtle',boardNumber:37},
    {variant:'solid',boardNumber:36},
    {variant:'subtle',boardNumber:35},
    {variant:'solid',boardNumber:34},
    {variant:'subtle',boardNumber:33},
    {variant:'solid',boardNumber:32},
    {variant:'subtle',boardNumber:31},
  ],
  [
    {variant:'subtle',boardNumber:21},
    {variant:'solid',boardNumber:22},
    {variant:'subtle',boardNumber:23},
    {variant:'solid',boardNumber:24},
    {variant:'subtle',boardNumber:25},
    {variant:'solid',boardNumber:26},
    {variant:'subtle',boardNumber:27},
    {variant:'solid',boardNumber:28},
    {variant:'subtle',boardNumber:29},
    {variant:'solid',boardNumber:30},
  ],
  [
    {variant:'solid',boardNumber:20},
    {variant:'subtle',boardNumber:19},
    {variant:'solid',boardNumber:18},
    {variant:'subtle',boardNumber:17},
    {variant:'solid',boardNumber:16},
    {variant:'subtle',boardNumber:15},
    {variant:'solid',boardNumber:14},
    {variant:'subtle',boardNumber:13},
    {variant:'solid',boardNumber:12},
    {variant:'subtle',boardNumber:11},
  ],
  [
    {variant:'subtle',boardNumber:1},
    {variant:'solid',boardNumber:2},
    {variant:'subtle',boardNumber:3},
    {variant:'solid',boardNumber:4},
    {variant:'subtle',boardNumber:5},
    {variant:'solid',boardNumber:6},
    {variant:'subtle',boardNumber:7},
    {variant:'solid',boardNumber:8},
    {variant:'subtle',boardNumber:9},
    {variant:'solid',boardNumber:10},
  ],
]
const player = [
  {pic:'data:image/png;base64,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',
  name:"1player"},
{pic:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHkTJJTptl-fUm6HF2hNAMZj3STmqNyllw4Q&usqp=CAU',
name:"2player"}
]
var playersTurn = 0

function App() {
  const [position,setPosition] = useState([1,1])
  const randomNumberGeneration=()=>{
    return Math.floor((Math.random() * 6) + 1);
  }
  const win=(player)=>{
    console.log(player,"wins")
  }
  const handleOnClickDice=async()=>{

    const random = randomNumberGeneration()
    console.log(random,"random",playersTurn)
    const newPosition = [...position] 
    if(position[playersTurn]+random<=100){ //dont incriment the position above 100 as there is only 100 columns
      newPosition[playersTurn] = position[playersTurn]+random
      await setPosition(newPosition)
    }
    if (random!=6){ //player who got 6 has another chance to roll the dice
      playersTurn++
    }
    if (playersTurn==player.length){
      playersTurn=0
    }
  }
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <button onClick={handleOnClickDice}>dice</button>
            <Logo h="40px"  pointerEvents="none" />
            <Ladder h="150px" w="30px" style={{position:'absolute',bottom:'150px',left:'80px'}} pointerEvents="none" />
           123 {/* <Text>
              Edit <Code fontSize="xl">src/App.js</Code> and save to reload.
            </Text> */}
            {/* <Link
              color="teal.500"
              href="https://chakra-ui.com"
              fontSize="2xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn Chakra
            </Link> */}
</VStack>
<VStack spacing={8}>
{board.map(e=>{return <Stack direction='row' style={{marginTop:0}}>
  {e.map(el=>{return <Badge variant={el['variant']} style={{width:50,height:50,margin:0}} colorScheme='green'>
    <Text style={{display:'flex'}}>{el['boardNumber']}</Text>
    {
      position.includes(el['boardNumber']) &&
        position.map((i,index)=>{
          return el['boardNumber']==i && <Avatar
          // src={player[index].pic}
          size='xs'
          name={player[index].name}
          ml={-1}
          mr={2}
        />
        })
  
    }
  </Badge>
})}
  </Stack>})}
</VStack>
<HStack spacing={4}>
  {['sm', 'md', 'lg'].map((size) => (
    <Tag
      size={size}
      key={size}
      borderRadius='full'
      variant='solid'
      colorScheme='green'
    >
      <TagLabel>Green</TagLabel>
      <TagCloseButton />
    </Tag>
  ))}
</HStack>
<Tag size='lg' colorScheme='red' borderRadius='full'>
  <Avatar
    src='https://bit.ly/sage-adebayo'
    size='xs'
    name='Segun Adebayo'
    ml={-1}
    mr={2}
  />
  <TagLabel>Segun</TagLabel>
</Tag>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
