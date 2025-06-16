import {
    type ComponentPropsWithRef,
    type FC,
    memo,
} from 'react';
import classNames from 'classnames';
import css from './Tooltip.module.css';
import {
    IUseTooltipController,
} from '@/components/tooltips/Tooltip/hooks/useTooltipController';
import { createPortal } from 'react-dom';


export type TooltipVerticalPrefer =
    'top'
    | 'bottom'
    | 'center';
export type TooltipHorizontalPrefer =
    'left'
    | 'right'
    | 'center';

export type TooltipProps =
    {
        controller: IUseTooltipController;
        verticalPrefer?: TooltipVerticalPrefer;
        horizontalPrefer?: TooltipHorizontalPrefer;
    }
    & ComponentPropsWithRef<'div'>;

export const Tooltip: FC<TooltipProps> = memo(function Tooltip (props) {
    const {
              controller,
              className,
              style,
              ...other
          } = props;

    const { opened, visible, position } = controller;

    if (opened) {
        return createPortal(
            <div
                { ...other }
                className={ classNames(css.container, {
                    [css.opened] : opened,
                    [css.visible]: visible,
                }, [ className ])
                }
                style={ { ...style, ...position } }
            />,
            document.body,
        );
    }

    return null;
});