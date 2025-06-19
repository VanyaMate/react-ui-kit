import { IUseTooltipController } from 'index';
import classNames from 'classnames';
import { ComponentPropsWithRef, FC, memo } from 'react';
import { createPortal } from 'react-dom';
import css from './Tooltip.module.css';


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
                role={ 'tooltip' }
                tabIndex={ -1 }
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