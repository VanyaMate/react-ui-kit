import { RefObject, useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import {
    Horizontal, Offset, Vertical,
} from '@/lib/getComponentAbsolutePosition/getComponentAbsolutePosition';
import { IUseTooltipController, useTooltipController } from '@/components';
import {
    useHandlerOnScroll,
} from '@/components/tooltips/Tooltip/hooks/useHandlerOnScroll';
import {
    useHandlerOnKeyboardClose,
} from '@/components/tooltips/Tooltip/hooks/useHandlerOnKeyboardClose';
import {
    useHandlerOnClickOutside,
} from '@/components/tooltips/Tooltip/hooks/useHandlerOnClickOutside';


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
    const trigger    = useRef<TriggerType>(null);
    const tooltip    = useRef<HTMLDivElement>(null);
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