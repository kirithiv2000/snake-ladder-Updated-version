import React from 'react';
import { Image, keyframes, usePrefersReducedMotion } from '@chakra-ui/react';
// import logo from './ladder_clip_art_23441/Ladder_clip_art_hight.png';
import logo from './Ladder.svg.png';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const Ladder = props => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const animation = prefersReducedMotion
    ? undefined
    : `${spin} infinite 20s linear`;

  return <Image
//    animation={animation} 
   src={logo} 
   {...props} 
   />;
};
