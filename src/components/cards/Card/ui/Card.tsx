import { type ComponentPropsWithoutRef, type FC, memo } from 'react';
import classNames from 'classnames';
import css from './Card.module.css';


export type CardSize =
    'small'
    | 'medium'
    | 'large';

export type CardProps =
    {
        size?: CardSize,
    }
    & ComponentPropsWithoutRef<'article'>;

export const Card: FC<CardProps> = memo(function Card (props) {
    const { size = 'medium', className, ...other } = props;

    return (
        <article { ...other }
                 className={ classNames(css.container, { [css[size]]: true }, [ className ]) }/>
    );
});