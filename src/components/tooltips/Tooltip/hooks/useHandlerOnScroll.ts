import { type RefObject, useEffect } from 'react';


export const useHandlerOnScroll = function (addHandler: boolean, handler: () => void, parentScroll?: RefObject<HTMLElement | null>) {
    useEffect(() => {
        if (addHandler) {
            if (parentScroll && parentScroll.current) {
                const parent = parentScroll.current;
                parent.addEventListener('scroll', handler);
                document.addEventListener('scroll', handler);
                return () => {
                    parent.removeEventListener('scroll', handler);
                    document.removeEventListener('scroll', handler);
                };
            } else {
                document.addEventListener('scroll', handler);
                return () => {
                    document.removeEventListener('scroll', handler);
                };
            }
        }
    }, [ addHandler, handler, parentScroll, parentScroll?.current ]);
};