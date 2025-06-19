import {
    type ComponentPropsWithoutRef,
    type FC,
    memo, RefCallback, RefObject,
} from 'react';
import classNames from 'classnames';
import css from './Checkbox.module.css';
import { Ref } from '@/types';


export type CheckboxSize =
    'small'
    | 'medium'
    | 'large';

export type CheckboxProps =
    {
        size?: CheckboxSize;
        inputClassName?: string;
        labelRef?: Ref<HTMLLabelElement>;
    }
    & Omit<ComponentPropsWithoutRef<'input'>, 'type' | 'size'>;

export const Checkbox: FC<CheckboxProps> = memo(function Checkbox (props) {
    const {
              size = 'medium',
              className,
              inputClassName,
              children,
              ...other
          } = props;

    return (
        <label
            className={
                classNames(css.container, { [css[size]]: true }, [ className ])
            }
        >
            <input
                { ...other }
                className={ classNames(css.input, {}, [ inputClassName ]) }
                type={ 'checkbox' }
            />
        </label>
    );
});