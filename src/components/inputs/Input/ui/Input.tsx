import {
    type ComponentPropsWithRef,
    type FC, FocusEventHandler,
    memo, ReactNode, RefCallback, RefObject, useCallback, useState,
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
        error?: boolean;
        success?: boolean;
        extraPostfix?: ReactNode;
        extraPrefix?: ReactNode;
        size?: InputSize;
        variant?: InputVariant;
        inputClassName?: string;
        ref?: RefCallback<HTMLInputElement | null> | RefObject<HTMLInputElement | null>;
        labelRef?: RefCallback<HTMLLabelElement | null> | RefObject<HTMLLabelElement | null>;
    }
    & Omit<ComponentPropsWithRef<'input'>, 'size' | 'ref'>;

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
              ref,
              labelRef,
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
        <label
            ref={ labelRef }
            className={ classNames(css.container, {
                [css[size]]   : true,
                [css[variant]]: true,
                [css.active]  : active,
                [css.error]   : error,
                [css.success] : success,
            }, [ className ]) }
        >
            { extraPrefix }
            <input
                { ...other }
                ref={ ref }
                className={ classNames(css.input, {}, [ inputClassName ]) }
                onFocus={ onFocusHandler }
                onBlur={ onBlurHandler }
            />
            { extraPostfix }
        </label>
    );
});