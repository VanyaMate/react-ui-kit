import {
    ComponentPropsWithRef,
    type FC,
    memo,
} from 'react';
import classNames from 'classnames';
import css from './Button.module.css';


export type ButtonVariant =
    'primary'
    | 'danger'
    | 'success'
    | 'default'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'link';

export type ButtonSize =
    | 'large'
    | 'medium'
    | 'small';

export type ButtonKind =
    'icon'
    | 'button';

export type ButtonProps =
    {
        variant?: ButtonVariant;
        size?: ButtonSize;
        kind?: ButtonKind;
    }
    & ComponentPropsWithRef<'button'>;

export const Button: FC<ButtonProps> = memo(function Button (props) {
    const {
              variant = 'default',
              size    = 'medium',
              kind    = 'button',
              className,
              ...other
          } = props;

    return (
        <button
            { ...other }
            className={ classNames(css.container, {
                [css[variant]]: true,
                [css[size]]   : true,
                [css[kind]]   : true,
            }, [ className ]) }
        />
    );
});