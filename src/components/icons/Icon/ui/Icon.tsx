import {
    type ComponentPropsWithRef,
    type FC,
    memo,
} from 'react';
import classNames from 'classnames';
import css from './Icon.module.css';


export type IconSize =
    'small'
    | 'medium'
    | 'large';

export type IconVariant =
    'primary'
    | 'danger'
    | 'success'
    | 'default'
    | 'secondary'
    | 'ghost';

export type IconProps =
    {
        size?: IconSize;
        variant?: IconVariant;
    }
    & ComponentPropsWithRef<'span'>;

export const Icon: FC<IconProps> = memo(function Icon (props) {
    const {
              size    = 'medium',
              variant = 'default',
              className,
              ...other
          } = props;

    return (
        <span { ...other }
              className={ classNames(css.container, {
                  [css[size]]   : true,
                  [css[variant]]: true,
              }, [ className ]) }/>
    );
});