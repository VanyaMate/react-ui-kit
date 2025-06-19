import { type ComponentPropsWithoutRef, type FC, memo } from 'react';
import { PreviewList } from '@/_dev_/ComponentsPreview/PreviewList';
import { Checkbox } from '@/components/inputs/Checkbox/ui/Checkbox';


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
            <Checkbox disabled checked size={ 'large' }/>
        </PreviewList>
    );
});