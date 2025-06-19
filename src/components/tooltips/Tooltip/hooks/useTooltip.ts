import { type RefObject, useMemo, useRef } from 'react';
import {
    IUseTooltipController,
    useHandlerOnClickOutside,
    useHandlerOnKeyboardClose,
    useHandlerOnScroll,
    useTooltipController,
    Horizontal, Offset, Vertical,
} from 'index';


export type IUseTooltipControls = {
    onHover: {
        onMouseEnter: () => void;
        onMouseLeave: () => void;
    },
    onClick: {
        onClick: () => void;
    },
}

export type IUseTooltipRefs<TriggerType extends HTMLElement> = [
    trigger: RefObject<TriggerType | null>,
    tooltip: RefObject<HTMLDivElement | null>,
    controller: IUseTooltipController,
    controls: IUseTooltipControls,
]

export const useTooltip = function <TriggerType extends HTMLElement> (
    vertical: Vertical,
    horizontal: Horizontal,
    offset: Offset = {
        x: 0,
        y: 0,
    },
    additionalParents?: Array<RefObject<HTMLElement | null>>,
    scrollParent?: RefObject<HTMLElement | null>,
): IUseTooltipRefs<TriggerType> {
    const trigger    = useRef<TriggerType | null>(null);
    const tooltip    = useRef<HTMLDivElement | null>(null);
    const controller = useTooltipController(trigger, tooltip, vertical, horizontal, offset);

    useHandlerOnScroll(controller.opened, controller.close, scrollParent);
    useHandlerOnKeyboardClose(controller.opened, controller.close);
    useHandlerOnClickOutside(controller.opened, controller.close, [ tooltip, trigger, ...(additionalParents ?? []) ]);

    const controls = useMemo<IUseTooltipControls>(() => ({
        onHover: {
            onMouseEnter: () => controller.open(),
            onMouseLeave: () => controller.close(),
        },
        onClick: {
            onClick: () => controller.toggle(),
        },
    }), []);

    return [
        trigger,
        tooltip,
        controller,
        controls,
    ];
};