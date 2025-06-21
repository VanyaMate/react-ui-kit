import {
    type ComponentPropsWithRef,
    type FC,
    type ReactNode,
    memo, useMemo, useState, HTMLInputTypeAttribute, useCallback,
} from 'react';
import classNames from 'classnames';
import css from './Input.module.css';
import { Button, Icon, type Ref } from '@root';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';


export type InputSize =
    'small'
    | 'medium'
    | 'large';

export type InputVariant =
    'noborder'
    | 'outline';

export type InputProps =
    {
        error?: string | boolean;
        success?: string | boolean;
        extraPostfix?: ReactNode;
        extraPrefix?: ReactNode;
        size?: InputSize;
        variant?: InputVariant;
        inputClassName?: string;
        ref?: Ref<HTMLInputElement>;
        labelRef?: Ref<HTMLLabelElement>;
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
              ref,
              labelRef,
              type    = 'text',
              ...other
          } = props;

    const [ passwordOpened, setPasswordOpened ] = useState(false);
    const [ currentType, setCurrentType ]       = useState<HTMLInputTypeAttribute>(type);
    const isPasswordType                        = useMemo(() => type === 'password', [ type ]);
    const togglePasswordVisible                 = useCallback(() => {
        setPasswordOpened((prev) => !prev);
        setCurrentType((prev) => prev === 'password' ? 'text' : 'password');
    }, []);
    const passwordOpenIcon                      = useMemo(() => (
        isPasswordType
        ? (
            <Button
                kind={ 'icon' }
                size={ 'small' }
                variant={ passwordOpened ? 'default' : 'ghost' }
                onClick={ togglePasswordVisible }
                aria-label={
                    passwordOpened ? 'Скрыть пароль'
                                   : `Показать пароль`
                }
            >
                <Icon>
                    {
                        passwordOpened
                        ? <IoMdEyeOff/>
                        : <IoMdEye/>
                    }
                </Icon>
            </Button>
        )
        : null
    ), [ isPasswordType, passwordOpened ]);

    return (
        <label
            ref={ labelRef }
            className={ classNames(css.container, {
                [css[size]]   : true,
                [css[variant]]: true,
                [css.error]   : error,
                [css.success] : success,
            }, [ className ]) }
        >
            { extraPrefix }
            <input
                { ...other }
                ref={ ref }
                type={ currentType }
                className={ classNames(css.input, {}, [ inputClassName ]) }
            />
            { passwordOpenIcon }
            { extraPostfix }
        </label>
    );
});