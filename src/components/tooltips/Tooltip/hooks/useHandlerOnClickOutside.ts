import { type RefObject, useEffect } from 'react';
import { isChildOf } from '@root';


export const useHandlerOnClickOutside = function (addHandler: boolean, handler: () => void, targets: Array<RefObject<HTMLElement | null>>) {
    useEffect(() => {
        if (addHandler) {
            const callback = function (event: Event) {
                if (!targets.some((target) => {
                    if (target.current instanceof HTMLElement && event.target instanceof HTMLElement) {
                        return isChildOf(event.target, target.current);
                    }
                    return false;
                })) {
                    requestAnimationFrame(handler);
                }
            };
            document.addEventListener('click', callback);
            return () => {
                document.removeEventListener('click', callback);
            };
        }
    }, [ addHandler, handler, targets ]);
};