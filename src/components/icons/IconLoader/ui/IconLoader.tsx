import { type ComponentPropsWithoutRef, type FC, memo } from 'react';
import classNames from 'classnames';
import css from './IconLoader.module.css';


export type IconLoaderProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const IconLoader: FC<IconLoaderProps> = memo(function IconLoader (props) {
    const { className, ...other } = props;

    return (
        <span { ...other }
              className={ classNames(css.container, {}, [ className ]) }/>
    );
});