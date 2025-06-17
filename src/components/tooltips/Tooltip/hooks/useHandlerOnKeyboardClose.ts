import { useLayoutEffect } from 'react';


export const useHandlerOnKeyboardClose = function (addHandler: boolean, handler: () => void) {
    useLayoutEffect(() => {
        if (addHandler) {
            const callback = (ev: KeyboardEvent) => ev.key === 'Escape' && handler();
            document.addEventListener('keydown', callback);
            return () => {
                document.removeEventListener('keydown', callback);
            };
        }
    }, [ addHandler, handler ]);
};