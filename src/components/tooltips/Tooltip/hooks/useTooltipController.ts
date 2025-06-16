import {
    RefObject,
    useCallback,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import {
    getComponentAbsolutePosition, Horizontal, Offset, Position, Vertical,
} from '@/lib/getComponentAbsolutePosition/getComponentAbsolutePosition';


export interface IUseTooltipController {
    opened: boolean;
    visible: boolean;
    position: Position | null;

    open (): void;

    close (): void;

    toggle (): void;
}

export const useTooltipController = function (
    parentRef: RefObject<HTMLElement | null>,
    tooltipRef: RefObject<HTMLElement | null>,
    verticalPrefer: Vertical,
    horizontalPrefer: Horizontal,
    offset: Offset,
): IUseTooltipController {
    const [ opened, setOpened ]     = useState<boolean>(false);
    const [ visible, setVisible ]   = useState<boolean>(false);
    const [ position, setPosition ] = useState<Position | null>(null);
    const raf                       = useRef<number>(0);

    const close  = useCallback(() => {
        setOpened(false);
    }, []);
    const open   = useCallback(() => {
        setOpened(true);
    }, []);
    const toggle = useCallback(() => {
        setOpened((prev) => !prev);
    }, []);

    useLayoutEffect(() => {
        cancelAnimationFrame(raf.current);
        const parent  = parentRef.current;
        const tooltip = tooltipRef.current;

        if (opened && parent && tooltip) {
            raf.current = requestAnimationFrame(() => {
                const parentRect      = parent.getBoundingClientRect();
                const tooltipRect     = tooltip.getBoundingClientRect();
                const tooltipPosition = getComponentAbsolutePosition(
                    parentRect,
                    {
                        x: tooltipRect.width,
                        y: tooltipRect.height,
                    },
                    verticalPrefer,
                    horizontalPrefer,
                    offset,
                );

                setVisible(true);
                setPosition(tooltipPosition);
            });
        } else {
            setVisible(false);
            setPosition(null);
        }
    }, [ opened ]);

    return {
        opened,
        visible,
        position,
        close,
        open,
        toggle,
    };
};