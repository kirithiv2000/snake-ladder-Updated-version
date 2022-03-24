import React, { useState,useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Container,
  VStack,
  Code,
  Grid,
  Heading,
  Divider,
  Button,
  useBreakpointValue,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Ladder } from './ladder';
import { Badge,Stack ,HStack ,Avatar} from '@chakra-ui/react'
import {
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton,
} from '@chakra-ui/react'
import {board} from './board';
import { motion,AnimatePresence  } from "framer-motion"
import Dise from './dise'
import OneMoveSound from "./479818-Toppling_The_King_09.mp3"
import TwoMoveSound from "./2.mpeg"
import ThreeMoveSound from "./3.mpeg"
import FourMoveSound from "./4.mpeg"
import FiveMoveSound from "./5.mpeg"
import SixMoveSound from "./6.mpeg"
function App() {
  const [player, setPlayer] = useState([
    {name:"1player"},
    {name:"2player"}
  ])
  var audio = new Audio(OneMoveSound);
  const OneMoveSoundAudio = new Audio(OneMoveSound);
  const TwoMoveSoundAudio = new Audio(TwoMoveSound);
  const ThreeMoveSoundAudio = new Audio(ThreeMoveSound);
  const FourMoveSoundAudio = new Audio(FourMoveSound);
  const FiveMoveSoundAudio = new Audio(FiveMoveSound);
  const SixMoveSoundAudio = new Audio(SixMoveSound);

  const [playerMotion,setPlayerMotion] = useState([[[0,-180],-30,1],[[22,-180],-30,1]])
  const [playersTurn,setPlayersTurn] = useState(0)
  const [position,setPosition] = useState([1,1])
  const [movingPiecs,setMovingPiecs] = useState(false)
  const handleChangeNumberOfPlayers=()=>{
    setPlayer(
      player.length===2?[
          {name:"1player"},
        {name:"2player"},
        {name:"3player"},
        {name:"4player"},
      ]:[
        {name:"1player"},
      {name:"2player"}
      ]
    )
    setPlayerMotion(
      player.length===2?[
        [[0,-180],-30,1],
        [[22,-180],-30,1],
        [[44,-180],-30,1],
        [[66,-180],-30,1]]
        :[
          [[0,-180],-30,1],
          [[22,-180],-30,1]
        ]
    )
    setPosition(
      player.length===2?[1,1,1,1]:[1,1]
    )
    setPlayersTurn(0)
  }

  const win=(player)=>{
    console.log(player,"wins")
  }
  const formula=e=>{
    if(e%10===0){
        if(parseInt(e/10)%2===0){
        return -180
    }
    if(parseInt(e/10)%2!==0){
        return 180
    }}  
    if(parseInt(e/10)%2===0){
        return -180+(40*(e%10))
    }
    if(parseInt(e/10)%2!==0){
        return 180-(40*(e%10))
    }
}
  const formulaY=e=>{
    return -30-(50*parseInt(e/10))
  }
  const playAudio=(random)=>{
   
  }
  const handlePlayerMotion=async(random)=>{
    var currentMove = 1
    const newplayerMotion = [...playerMotion]
    newplayerMotion[playersTurn] = [[],[],1]
    const newPosition = [...position] 
    // console.log(xPossition,yPossition,newPosition)
    // playAudio(random)
    if(random>1){
      
      while(currentMove<=random){
        // console.log(parseInt(newPosition[playersTurn]/10)%2===0,newPosition[playersTurn]/10);
        // await audio.play()
        newplayerMotion[playersTurn][0].push(formula(newPosition[playersTurn]))
        newplayerMotion[playersTurn][1].push(formulaY(newPosition[playersTurn]))
        
        newPosition[playersTurn] = newPosition[playersTurn]+1
        currentMove++
      }
      await setPosition(newPosition)
    }else{
      newplayerMotion[playersTurn][0] = formula(newPosition[playersTurn])
      newplayerMotion[playersTurn][1] = formulaY(newPosition[playersTurn])
    }
    if (random===1){
      OneMoveSoundAudio.play() 
      newplayerMotion[playersTurn][2] = 0.3
      
    }else if(random===2){
      TwoMoveSoundAudio.play() 
      newplayerMotion[playersTurn][2] = 0.6
      
    }else if(random===3){
      
      ThreeMoveSoundAudio.play()
      newplayerMotion[playersTurn][2] = 0.9

    }else if(random===4){
      FourMoveSoundAudio.play() 
      newplayerMotion[playersTurn][2] = 1
      
    }else if(random===5){
      FiveMoveSoundAudio.play() 
      newplayerMotion[playersTurn][2] = 1.2

    }else if(random===6){
      newplayerMotion[playersTurn][2] = 1.5

      SixMoveSoundAudio.play() 
    }
    await setPlayerMotion(newplayerMotion)
   
    return 1
  }
  const handleOnClickDice=async(random)=>{
    if(position[playersTurn]+random<=100){ //dont incriment the position above 100 as there is only 100 columns
      await handlePlayerMotion(random)
      // console.log(random)
      await setMovingPiecs(!movingPiecs)
      // newPosition[playersTurn] = position[playersTurn]+random
    }
    if (random!=6){ //player who got 6 has another chance to roll the dice
      // console.log(random,"is not equal 6 so change player")
      // playersTurn+1
      if (playersTurn+1==player.length){
        // setPlayersTurn(newChange)
        setPlayersTurn(0)
  
      }else{
        setPlayersTurn(playersTurn+1)
      }
    }else{
      // console.log(random,"is  equal 6 dont so change player")
    }
    
  }
  const sizeOfPices = 22

  return (<ChakraProvider theme={theme}>
    <button onClick={()=>audio.play()}>
      click to hear sound
    </button>
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }} style={{paddingTop:0}}>
      <Box textAlign="center" fontSize="xl" 
          // py={{ base: '0', sm: '8' }}
          // px={{ base: '0', sm: '10' }}
          >
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
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
        <Stack spacing="6">
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
           {/* <Text>
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
</VStack><VStack spacing={8}>
  <div style={{position:'relative',width:100,height:0}}>
<Ladder h="150px" w="30px" style={{position:'absolute',top:'150px',left:'80px',transform: 'rotate(20deg)'}} />
<Ladder h="130px" w="30px" style={{position:'absolute',top:'85px',left:'-100px',transform: 'rotate(50deg)'}} />
<Ladder h="150px" w="30px" style={{position:'absolute',top:'360px',left:'70px',transform: 'rotate(300deg)'}} />

  </div>

{board.map(e=>{return <Stack direction='row' style={{marginTop:0}}>
  {e.map(el=>{return <Badge variant={el['variant']} style={{width:40,height:50,margin:0}} colorScheme='green'>
    <Text style={{display:'flex'}}>{el['boardNumber']}</Text>
    {
      position.includes(el['boardNumber']) &&
        position.map((i,index)=>{
          // console.log(position.filter(e=>i===e).length,"position.filter(e=>i===e).length")
          return el['boardNumber']==i
          &&false 
          && <AnimatePresence><motion.div 
          
          animate={{  scale: [1.2,1,1.5,1],rotate: 0,x: 0 }}
    // transition={{ duration: 1 }}
    exit={{y:-100,transition:{delay:2}}}
          style={{position:'relative'}}><Avatar
          // src={player[index].pic}
          style={{width:sizeOfPices,height:sizeOfPices,position:'absolute',
          left:position.filter(e=>i===e).length===1
          ?10:
          position.filter(e=>i===e).length===2
          ?index*5:
          position.filter(e=>i===e).length===3
          ?index*1
          :index*5}}
          size='xs'
          name={player[index].name}
          ml={-1}
          mr={2}
        /></motion.div></AnimatePresence>
        })
  
    }
  </Badge>
})}
  </Stack>})}
  <AnimatePresence>


  {player.length==2? <div 
          style={{marginTop:0,height:0}}><motion.div 
          key={"1"}
          animate={{  scale: [1.2,1],
            x: playerMotion[0][0],
            // x: [0,-180],
            y:playerMotion[0][1],
            transition:{duration:playerMotion[0][2]},
           }}
          // transition={{ duration: 1 }}
          exit={{y:-100}}
          style={{marginTop:0,height:0}}
          >
            <Avatar
            name={"1player"}
          style={{
            width:22,
            height:22,
            }}
          ml={-1}
          mr={2}
          size='xs'
          /></motion.div>
          <motion.div 
          key={"2"}
          animate={{  scale: [1.2,1],
            x: playerMotion[1][0],
            y:playerMotion[1][1],
            transition:{duration:playerMotion[1][2]},
           }}
          // transition={{ duration: 1 }}
          exit={{y:-100}}
          style={{marginTop:0,height:0}}
          >
            <Avatar
            name={"2player"}
          style={{
            width:22,
            height:22,
            }}
          ml={-1}
          mr={2}
          size='xs'
          /></motion.div></div>:
          <div 
          style={{marginTop:0,height:0}}>
            <motion.div 
          key={"1"}
          animate={{  scale: [1.2,1],
            x: playerMotion[0][0],
            y:playerMotion[0][1],
            transition:{duration:playerMotion[0][2]},
           }}
          // transition={{ duration: 1 }}
          exit={{y:-100}}
          style={{marginTop:0,height:0}}
          >
            <Avatar
            name={"1player"}
          style={{
            width:22,
            height:22,
            }}
          ml={-1}
          mr={2}
          size='xs'
          /></motion.div>
          <motion.div 
          key={"2"}
          animate={{  scale: [1.2,1],
            x: playerMotion[1][0],
            y:playerMotion[1][1],
            transition:{duration:playerMotion[1][2]},
           }}
          // transition={{ duration: 1 }}
          exit={{y:-100}}
          style={{marginTop:0,height:0}}
          >
            <Avatar
            name={"2player"}
          style={{
            width:22,
            height:22,
            }}
          ml={-1}
          mr={2}
          size='xs'
          /></motion.div>

<motion.div 
          key={"3"}
          animate={{  scale: [1.2,1],
            x: playerMotion[2][0],
            y:playerMotion[2][1],
            transition:{duration:playerMotion[2][2]},
           }}
          // transition={{ duration: 1 }}
          exit={{y:-100}}
          style={{marginTop:0,height:0}}
          >
            <Avatar
            name={"3player"}
          style={{
            width:22,
            height:22,
            }}
          ml={-1}
          mr={2}
          size='xs'
          /></motion.div>
          <motion.div 
          key={"4"}
          animate={{  scale: [1.2,1],
            x: playerMotion[3][0],
            y:playerMotion[3][1],
            transition:{duration:playerMotion[3][2]},
           }}
          // transition={{ duration: 1 }}
          exit={{y:-100}}
          style={{marginTop:0,height:0}}
          >
            <Avatar
            name={"4player"}
          style={{
            width:22,
            height:22,
            }}
          ml={-1}
          mr={2}
          size='xs'
          /></motion.div>
            </div>}
          </AnimatePresence>
</VStack>
{/* <HStack spacing={4}>
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
</Tag> */}
        </Grid>
        <HStack justify="space-between">
                {/* <Button  colorScheme="blue" size="md">
                Switch to 2 player
              </Button>
              <Button  colorScheme="blue" size="md">
                Switch to 4 player
              </Button> */}
      
      {player.map((e,i)=>{
        return <div style={{background:i===playersTurn?'yellow':'red'}}>
          <Dise  onClick={handleOnClickDice} disable={!(i===playersTurn)}/>
          <Tag size='md' colorScheme='red' borderRadius='full'>
  <Avatar
    // src='https://bit.ly/sage-adebayo'
    size='xs'
    name={player[i].name}
    ml={-1}
    mr={2}
  />
  <TagLabel>{player[i].name}</TagLabel>
</Tag> 
        </div>
      })}
            </HStack>
      </Box>
      <HStack justify="center">
      <Button 
              size={'sm'}
              onClick={handleChangeNumberOfPlayers}
            //   variant="outline" 
              colorScheme="blue">{player.length===2?"Switch to 4 Players":"Switch to 2 players"}</Button>
              </HStack>
</Container>

    </ChakraProvider>
  );
}

export default App;
