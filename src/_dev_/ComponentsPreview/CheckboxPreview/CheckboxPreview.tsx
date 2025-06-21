import { type ComponentPropsWithoutRef, type FC, memo } from 'react';
import { PreviewList } from '../PreviewList';
import { Checkbox } from '@root';


export type CheckboxPreviewProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const CheckboxPreview: FC<CheckboxPreviewProps> = memo(function CheckboxPreview (props) {
    const { ...other } = props;

    return (
        <PreviewList { ...other }>
            <h2>Checkbox</h2>
            <Checkbox/>
            <Checkbox defaultChecked={ true } size={ 'small' }/>
            <Checkbox disabled size={ 'medium' }/>
            <Checkbox disabled size={ 'large' }/>
        </PreviewList>
    );
});