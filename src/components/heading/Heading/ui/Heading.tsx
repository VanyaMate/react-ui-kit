import {
    type ComponentPropsWithoutRef,
    type FC,
    type ReactNode,
    createContext,
    memo,
    use,
    useMemo,
} from 'react';
import classNames from 'classnames';
import css from './Heading.module.css';


export type HeadingProps =
    {
        level?: number;
        content?: ReactNode;
    }
    & Omit<ComponentPropsWithoutRef<'hgroup'>, 'content'>;

export type HeadingLevels =
    1
    | 2
    | 3
    | 4
    | 5
    | 6;
export type HeadingTag = `h${ HeadingLevels }`;

export const HeadingContext = createContext(1);

export const Heading: FC<HeadingProps> = memo(function Heading (props) {
    const {
              className,
              level,
              content,
              ...other
          } = props;

    const parentHeading = use(HeadingContext);
    const currentLevel  = useMemo<HeadingLevels>(() => {
        if (typeof level === 'number') {
            let currentLevel: number = level > 6
                                       ? 6 : level < 1
                                             ? 1 : level;
            return Math.round(currentLevel) as HeadingLevels;
        }

        if (parentHeading) {
            if (parentHeading >= 6) {
                return 6;
            }
            if (parentHeading <= 1) {
                return 2;
            }

            return (parentHeading + 1) as HeadingLevels;
        }

        return 2;
    }, [ level, parentHeading ]);
    const Tag           = useMemo<HeadingTag>(() => `h${ currentLevel }`, [ level ]);

    return (
        <HeadingContext value={ currentLevel }>
            <Tag
                { ...other }
                className={ classNames(css.container, {}, [ className ]) }
            />
            { content }
        </HeadingContext>
    );
});