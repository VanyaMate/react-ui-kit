import {
    type ComponentPropsWithRef,
    type FC,
    memo, ReactNode,
} from 'react';
import classNames from 'classnames';
import css from './Input.module.css';
import { Ref } from '@/types';


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
              ...other
          } = props;

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
                className={ classNames(css.input, {}, [ inputClassName ]) }
            />
            { extraPostfix }
        </label>
    );
});