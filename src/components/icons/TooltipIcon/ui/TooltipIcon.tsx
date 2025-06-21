import {
    type FC,
    memo,
    type ReactNode,
    type RefObject,
} from 'react';
import classNames from 'classnames';
import css from './TooltipIcon.module.css';
import {
    Horizontal,
    Icon,
    IconProps,
    Tooltip,
    useTooltip,
    Vertical,
} from '@root';


export type TooltipIconProps =
    {
        content: ReactNode;
        parent?: RefObject<HTMLElement | null>;
        horizontal?: Horizontal;
        vertical?: Vertical;
    }
    & Omit<IconProps, 'content'>;

export const TooltipIcon: FC<TooltipIconProps> = memo(function TooltipIcon (props) {
    const {
              className,
              content,
              parent,
              horizontal = 'center',
              vertical   = 'top',
              children,
              variant    = 'default',
              ...other
          } = props;

    const [ trigger, tooltip, controller, controls ] = useTooltip<HTMLSpanElement>({
        position: {
            horizontal,
            vertical,
            offset: {
                x: 0,
                y: 5,
            },
        },
        parents : {
            parent,
        },
    });

    return (
        <Icon
            { ...other }
            { ...controls.onHover }
            ref={ trigger }
            variant={ variant }
            className={ classNames(css.container, {}, [ className ]) }
        >
            { children }
            <Tooltip controller={ controller } ref={ tooltip }
                     className={ classNames(css.container, { [css[variant]]: true }) }>
                { content }
            </Tooltip>
        </Icon>
    );
});