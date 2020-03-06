import { useEffect, useState } from "react";
import { LoginTransitionTypes } from "../components/templates/LoginTransition";

/**
 * 
 * @param { HTMLElement } ref  
 * @param { () => void } onExit 
 * @returns { { hide: () => void, show: () => void, setRef: (ref: HTMLElement) => void, ref: HTMLElement }}
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

    function hide() {
        if (htmlRef && htmlRef.current) {
            htmlRef.current.style.transform = "translateX(100%)";
        }
    }

    function show() {
        if (htmlRef && htmlRef.current) {
            htmlRef.current.style.transform = "translateX(0)";
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