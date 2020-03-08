import { useEffect, useState, useRef } from "react";
import anime from "animejs"

/**
 * Logic to interface with Login Transition component
 * @param { HTMLElement } ref  
 * @param { () => void } onExit 
 * @returns { { hide: (onFinish: () => void) => void, show: () => void, ref: HTMLElement }}
 */
export default () => {
    const htmlRef = useRef(null);

    const [ anim, setAnim ] = useState(false);

    useEffect(() => {
        if (anim && htmlRef && htmlRef.current) {
            anime({
                targets: htmlRef.current,
                translateX: [
                    { value: "110%" },
                    { value: "0%" }
                ],
                duration: 500,
                easing: "easeInOutQuad"
            })
        }
    }, [anim])
    function hide(onFinish) {
        if (htmlRef && htmlRef.current) {
            anime({
                targets: htmlRef.current,
                translateX: "-110%",
                duration: 500
            }).finished.then(() => {
                onFinish && onFinish()
            })
        }
    }

    const show = () => {
        if (!anim) setAnim(true)
    }

    

    return {
        hide, show, ref: htmlRef
    }
}