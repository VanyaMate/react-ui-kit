import {
    type ComponentPropsWithRef,
    type FC,
    memo,
} from 'react';
import classNames from 'classnames';
import css from './P.module.css';


export type PVariant =
    'primary'
    | 'danger'
    | 'success'
    | 'default'
    | 'ghost';

export type PProps =
    {
        variant: PVariant;
    }
    & ComponentPropsWithRef<'p'>;

export const P: FC<PProps> = memo(function P (props) {
    const {
              variant = 'default',
              className,
              ...other
          } = props;

    return (
        <p { ...other }
           className={ classNames(css.container, { [css[variant]]: true }, [ className ]) }/>
    );
});