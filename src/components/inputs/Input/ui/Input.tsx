import {
    type ComponentPropsWithoutRef,
    type FC, FocusEventHandler,
    memo, ReactNode, useCallback, useState,
} from 'react';
import classNames from 'classnames';
import css from './Input.module.css';


export type InputSize =
    'small'
    | 'medium'
    | 'large';

export type InputVariant =
    'noborder'
    | 'outline';

export type InputProps =
    {
        error?: true;
        success?: true;
        extraPostfix?: ReactNode;
        extraPrefix?: ReactNode;
        size?: InputSize;
        variant?: InputVariant;
        inputClassName?: string;
    }
    & Omit<ComponentPropsWithoutRef<'input'>, 'size'>;

export const Input: FC<InputProps> = memo(function Input (props) {
    const {
              size    = 'medium',
              variant = 'outline',
              error,
              success,
              extraPostfix,
              extraPrefix,
              className,
              inputClassName,
              onFocus,
              onBlur,
              ...other
          } = props;

    const [ active, setActive ] = useState(false);

    const onFocusHandler: FocusEventHandler<HTMLInputElement> = useCallback((event) => {
        setActive(true);
        onFocus && onFocus(event);
    }, [ onFocus ]);
    const onBlurHandler: FocusEventHandler<HTMLInputElement>  = useCallback((event) => {
        setActive(false);
        onBlur && onBlur(event);
    }, [ onBlur ]);

    return (
        <label className={ classNames(css.container, {
            [css[size]]   : true,
            [css[variant]]: true,
            [css.active]  : active,
        }, [ className ]) }>
            { extraPrefix }
            <input
                { ...other }
                className={ classNames(css.input, {}, [ inputClassName ]) }
                onFocus={ onFocusHandler }
                onBlur={ onBlurHandler }
            />
            { extraPostfix }
        </label>
    );
});