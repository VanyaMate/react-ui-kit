import { RefObject, useRef } from 'react';
import {
    Horizontal, Offset, Vertical,
} from '@/lib/getComponentAbsolutePosition/getComponentAbsolutePosition';
import { IUseTooltipController, useTooltipController } from '@/components';


export type IUseTooltipRefs<TriggerType extends HTMLElement> = [
    trigger: RefObject<TriggerType | null>,
    tooltip: RefObject<HTMLDivElement | null>,
    controller: IUseTooltipController,
]

export const useTooltip = function <TriggerType extends HTMLElement> (
    vertical: Vertical,
    horizontal: Horizontal,
    offset: Offset = {
        x: 0,
        y: 0,
    },
): IUseTooltipRefs<TriggerType> {
    const trigger    = useRef<TriggerType>(null);
    const tooltip    = useRef<HTMLDivElement>(null);
    const controller = useTooltipController(trigger, tooltip, vertical, horizontal, offset);

    return [
        trigger,
        tooltip,
        controller,
    ];
};