import React from 'react'
import Video from '../Assets/tunnel-65495.mp4'

const Main = () => {
    return(
        <div ClassName='main'>
            <video src={Video} autoPlay loop muted/>
        </div>
    )
}
export default Main