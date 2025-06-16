import { type ComponentPropsWithoutRef, type FC, memo } from 'react';


export type PreviewListProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const PreviewList: FC<PreviewListProps> = memo(function PreviewList (props) {
    const { ...other } = props;

    return (
        <div { ...other }
             style={ {
                 display      : 'flex',
                 flexDirection: 'column',
                 gap          : 10,
                 borderBlock  : '1px solid var(--border-color)',
                 padding      : 10,
             } }
        />
    );
});