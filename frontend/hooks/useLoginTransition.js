import { useEffect, useState, useRef } from 'react';
import anime from 'animejs';

/**
 * Logic to interface with Login Transition component
 * @param { HTMLElement } ref
 * @param { () => void } onExit
 * @returns { { visible: boolean, setVisible: (visible: boolean) => void, hide: (onFinish: () => void) => void, show: () => void, ref: HTMLElement }}
 */
const useLoginTransition = () => {
    const htmlRef = useRef(null);

    const [anim, setAnim] = useState(false);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (!visible && anim) hide();
    }, [visible]);

    useEffect(() => {
        if (anim && htmlRef && htmlRef.current) {
            anime({
                targets: htmlRef.current,
                translateX: [{ value: '100vw' }, { value: 0 }],
                duration: 500,
                easing: 'easeInOutQuad',
            });
        }
    }, [anim]);

    function hide(onFinish) {
        if (htmlRef && htmlRef.current) {
            anime({
                targets: htmlRef.current,
                translateX: '-110vw',
                duration: 0,
            }).finished.then(() => {
                onFinish && onFinish();
            });
        }
    }

    const show = () => {
        if (!anim) setAnim(true);
    };

    return {
        visible,
        setVisible,
        hide,
        show,
        ref: htmlRef,
    };
};
export default useLoginTransition;
