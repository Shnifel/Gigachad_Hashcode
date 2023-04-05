import { fontFamily } from '@mui/system';
import React from 'react'
import Typewriter from 'typewriter-effect';
import "../pages/login.scss";
import "../assets/BlocTekRegular-gxEZ4.ttf";
const TypewriterTitle = () => {
  return (
        <Typewriter
            onInit={(typewriter) => {
                typewriter.typeString('\u003C HASHCODE COMPETITION / \u003E')
                .callFunction(() => {
                })
                .pauseFor(250)
                .callFunction(() => {
                })
                .start();
            }}
            options = {{
                loop: false,
                autoStart: true,
            }}
            
        />
  )
}

export default TypewriterTitle