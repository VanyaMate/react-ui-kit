import {
    type ComponentPropsWithoutRef,
    type FC, FocusEventHandler,
    memo,
    useCallback, useState,
} from 'react';
import classNames from 'classnames';
import css from './Checkbox.module.css';


export type CheckboxSize =
    'small'
    | 'medium'
    | 'large';

export type CheckboxProps =
    {
        size?: CheckboxSize;
        inputClassName?: string;
    }
    & Omit<ComponentPropsWithoutRef<'input'>, 'type' | 'size'>;

export const Checkbox: FC<CheckboxProps> = memo(function Checkbox (props) {
    const {
              size = 'medium',
              className,
              inputClassName,
              children,
              checked: defaultChecked,
              onChange,
              onBlur,
              onFocus,
              disabled,
              ...other
          } = props;

    const [ focused, setFocused ] = useState<boolean>(false);
    const [ checked, setChecked ] = useState<boolean>(defaultChecked ?? false);

    const onFocusHandler: FocusEventHandler<HTMLInputElement>  = useCallback((event) => {
        setFocused(true);
        onFocus && onFocus(event);
    }, []);
    const onBlurHandler: FocusEventHandler<HTMLInputElement>   = useCallback((event) => {
        setFocused(false);
        onBlur && onBlur(event);
    }, []);
    const onChangeHandler: FocusEventHandler<HTMLInputElement> = useCallback((event) => {
        setChecked((prev) => !prev);
        onChange && onChange(event);
    }, []);

    return (
        <label
            className={
                classNames(css.container, {
                    [css.focused] : focused,
                    [css.checked] : checked,
                    [css.disabled]: disabled,
                    [css[size]]   : true,
                }, [ className ])
            }
        >
            { checked ? '✔' : '⨉' }
            <input
                { ...other }
                className={ classNames(css.input, {}, [ inputClassName ]) }
                type={ 'checkbox' }
                onFocus={ onFocusHandler }
                onBlur={ onBlurHandler }
                checked={ checked }
                onChange={ onChangeHandler }
                disabled={ disabled }
            />
        </label>
    );
});