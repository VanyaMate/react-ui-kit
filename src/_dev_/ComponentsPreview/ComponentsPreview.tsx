import { type ComponentPropsWithoutRef, type FC, memo } from 'react';
import classNames from 'classnames';
import css from './ComponentsPreview.module.css';
import {
    ButtonPreview,
} from '@/_dev_/ComponentsPreview/ButtonPreview/ButtonPreview';
import { PreviewList } from '@/_dev_/ComponentsPreview/PreviewList';
import {
    InputPreview,
} from '@/_dev_/ComponentsPreview/InputPreview/InputPreview';
import {
    TooltipPreview,
} from '@/_dev_/ComponentsPreview/TooltipPreview/TooltipPreview';


export type ComponentsPreviewProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const ComponentsPreview: FC<ComponentsPreviewProps> = memo(function ComponentsPreview (props) {
    const { className, ...other } = props;

    return (
        <PreviewList { ...other }
                     className={ classNames(css.container, {}, [ className ]) }>
            <ButtonPreview/>
            <InputPreview/>
            <TooltipPreview/>
        </PreviewList>
    );
});