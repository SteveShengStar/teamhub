import { useEffect, useState } from "react";
import anime from "animejs"

/**
 * 
 * @param { HTMLElement } ref  
 * @param { () => void } onExit 
 * @returns { { hide: (onFinish: () => void) => void, show: () => void, setRef: (ref: HTMLElement) => void, ref: HTMLElement }}
 */
export default function(onExit) {
    const [ htmlRef, setHTMLRef ] = useState(null);

    useEffect(() => {
        const handleEventEnd = () => {
            
        }
        if (htmlRef && htmlRef.current) htmlRef.current.addEventListener("transitionend", handleEventEnd);
        return () => {
            if (htmlRef && htmlRef.current) {
                return htmlRef.current.removeEventListener("transitionend", handleEventEnd);
            }
        }
    });

    function hide(onFinish) {
        if (htmlRef && htmlRef.current) {
            anime({
                targets: htmlRef.current,
                translateX: "-100%",
                duration: 0.5
            }).finished.then(() => {
                onFinish && onFinish()
            })
        }
    }

    function show() {
        if (htmlRef && htmlRef.current) {
            anime({
                targets: htmlRef.current,
                keyframes: [
                    {translateX: "100%"},
                    {translateX: 0}
                ],
                duration: 0.5
            });
        }
    }

    /**
     * @param { HTMLElement } ref
     */
    function setRef(ref) {
        setHTMLRef(ref);
    }

    return {
        hide, show, setRef, ref: htmlRef
    }
}