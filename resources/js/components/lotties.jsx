import React from "react";
import Lottie from 'react-lottie'


export default function Lotties({source, height=400, width=400}){
    return(
        <Lottie
            options={
                {
                    loop: true,
                    autoplay: true,
                    animationData: source,
                    rendererSettings: {
                        preserveAspectRatio: "xMidYMid slice"
                    }
                }
            }
            height={height}
            width={width}
        />
    )
}
