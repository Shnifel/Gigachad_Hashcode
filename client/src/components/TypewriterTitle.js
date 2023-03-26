import React from 'react'
import Typewriter from 'typewriter-effect';

const TypewriterTitle = () => {
  return (
        <Typewriter
            onInit={(typewriter) => {
                typewriter.typeString('\u003C HashCode Competition/ \u003E')
                .callFunction(() => {
                })
                .pauseFor(250)
                .deleteAll()
                .callFunction(() => {
                })
                .start();
            }}
            options = {{
                loop: true,
                autoStart: true
            }}
        />
  )
}

export default TypewriterTitle