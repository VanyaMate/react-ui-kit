import { type RefObject, useMemo, useRef } from 'react';
import {
    IUseTooltipController,
    useHandlerOnClickOutside,
    useHandlerOnKeyboardClose,
    useHandlerOnScroll,
    useTooltipController,
    Horizontal, Offset, Vertical,
} from '@root';


export type UseTooltipControls = {
    onHover: {
        onMouseEnter: () => void;
        onMouseLeave: () => void;
    },
    onClick: {
        onClick: () => void;
    },
}

export type UseTooltipRefs<TriggerType extends HTMLElement> = [
    trigger: RefObject<TriggerType | null>,
    tooltip: RefObject<HTMLDivElement | null>,
    controller: IUseTooltipController,
    controls: UseTooltipControls,
]

export type UseTooltipPosition = {
    vertical?: Vertical;
    horizontal?: Horizontal;
    offset?: Offset;
};

export type UseTooltipParents<ParentType extends HTMLElement> = {
    parent?: RefObject<ParentType | null>;
    additional?: Array<RefObject<HTMLElement | null>>,
    scrolls?: Array<RefObject<HTMLElement | null>>,
}

export type UseTooltipProps<ParentType extends HTMLElement> = {
    position?: UseTooltipPosition;
    parents?: UseTooltipParents<ParentType>;
}

export const useTooltip = function <TriggerType extends HTMLElement> (props: UseTooltipProps<TriggerType> = {}): UseTooltipRefs<TriggerType> {
    const { position = {}, parents = {} } = props;
    const {
              vertical   = 'top',
              offset     = { x: 0, y: 0 },
              horizontal = 'center',
          }                               = position;
    const { parent, additional, scrolls } = parents;

    const controllerParent = useRef<TriggerType | null>(null);
    const tooltipParent    = useMemo(() => parent ?? controllerParent, []);
    const tooltip          = useRef<HTMLDivElement | null>(null);
    const controller       = useTooltipController(tooltipParent, tooltip, vertical, horizontal, offset);

    useHandlerOnScroll(controller.opened, controller.close, scrolls);
    useHandlerOnKeyboardClose(controller.opened, controller.close);
    useHandlerOnClickOutside(controller.opened, controller.close, [ tooltip, tooltipParent, ...(additional ?? []) ]);

    const controls = useMemo<UseTooltipControls>(() => ({
        onHover: {
            onMouseEnter: () => controller.open(),
            onMouseLeave: () => controller.close(),
        },
        onClick: {
            onClick: () => controller.toggle(),
        },
    }), []);

    return [
        controllerParent,
        tooltip,
        controller,
        controls,
    ];
};