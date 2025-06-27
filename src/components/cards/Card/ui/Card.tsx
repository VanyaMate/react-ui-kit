import { type ComponentPropsWithoutRef, type FC, memo } from 'react';
import classNames from 'classnames';
import css from './Card.module.css';


export type CardSize =
    'small'
    | 'medium'
    | 'large';

export type CardVariant =
    'default'
    | 'main'
    | 'primary'
    | 'danger'
    | 'gold'
    | 'success';

export type CardProps =
    {
        size?: CardSize,
        variant?: CardVariant,
    }
    & ComponentPropsWithoutRef<'article'>;

export const Card: FC<CardProps> = memo(function Card (props) {
    const {
              size    = 'medium',
              variant = 'default',
              className,
              ...other
          } = props;

    return (
        <article { ...other }
                 className={ classNames(css.container, {
                     [css[size]]   : true,
                     [css[variant]]: true,
                 }, [ className ]) }
        />
    );
});