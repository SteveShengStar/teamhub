import { useEffect, useState } from "react";

export default function(ref, onExit) {
    const [ state, setState ] = useState("pre-transition");

    useEffect(() => {
        const handleEventEnd = () => {
            if (state == "post-transition") {
                onExit && onExit()
            }
        }
        if (ref && ref.current) ref.current.addEventListener("transitionend", handleEventEnd);
        return () => {
            if (ref && ref.current) {
                return ref.current.removeEventListener("transitionend"< handleEventEnd);
            }
        }
    });

    useEffect(() => {
        setState("show");
    }, [])

    function hide() {
        setState("post-transition")
    }

    return {
        state, hide,
    }
}