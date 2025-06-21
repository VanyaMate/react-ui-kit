import { type RefObject, useEffect } from 'react';


export const useHandlerOnScroll = function (addHandler: boolean, handler: () => void, parentScroll?: Array<RefObject<HTMLElement | null>>) {
    useEffect(() => {
        if (addHandler) {
            if (parentScroll && parentScroll.length) {
                const parents: Array<HTMLElement | null> = parentScroll
                    .map((parent) => parent.current);

                for (let i = 0, parent: HTMLElement | null = null; i < parents.length; i++) {
                    parent = parents[i];
                    if (parent) {
                        parent.addEventListener('scroll', handler);
                    }
                }
                document.addEventListener('scroll', handler);
                return () => {
                    for (let i = 0, parent: HTMLElement | null = null; i < parents.length; i++) {
                        parent = parents[i];
                        if (parent) {
                            parent.removeEventListener('scroll', handler);
                        }
                    }
                    document.removeEventListener('scroll', handler);
                };
            } else {
                document.addEventListener('scroll', handler);
                return () => {
                    document.removeEventListener('scroll', handler);
                };
            }
        }
    }, [ addHandler, handler, parentScroll, parentScroll?.length ]);
};