import { type ComponentPropsWithoutRef, type FC, memo } from 'react';
import { PreviewList } from '../PreviewList';
import { Checkbox } from 'index';


export type CheckboxPreviewProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const CheckboxPreview: FC<CheckboxPreviewProps> = memo(function CheckboxPreview (props) {
    const { ...other } = props;

    return (
        <PreviewList { ...other }>
            <h2>Checkbox</h2>
            <Checkbox/>
            <Checkbox checked size={ 'small' }/>
            <Checkbox disabled size={ 'medium' }/>
            <Checkbox checked disabled size={ 'large' }/>
        </PreviewList>
    );
});