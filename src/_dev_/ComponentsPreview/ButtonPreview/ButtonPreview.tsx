import { type ComponentPropsWithoutRef, type FC, memo } from 'react';
import { Button, ButtonSize, ButtonVariant } from '@/components';
import { PreviewList } from '@/_dev_/ComponentsPreview/PreviewList';


export type ButtonPreviewProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const ButtonPreview: FC<ButtonPreviewProps> = memo(function ButtonPreview (props) {
    const { ...other } = props;

    const variants: Array<ButtonVariant> = [
        'default',
        'primary',
        'secondary',
        'success',
        'danger',
        'outline',
        'link',
        'ghost',
    ];

    const sizes: Array<ButtonSize> = [
        'small',
        'medium',
        'large',
    ];

    return (
        <PreviewList { ...other }>
            <h2>Buttons</h2>
            {
                variants.map((variant) => (
                    <section key={ variant } style={ {
                        display: 'flex', flexDirection: 'column', gap: 5,
                    } }>
                        <h3>{ variant }</h3>
                        {
                            sizes.map((size) => (
                                <div key={ size }
                                     style={ { display: 'flex', gap: 5 } }>
                                    <Button variant={ variant } size={ size }
                                            kind={ 'icon' }>I</Button>
                                    <Button variant={ variant } size={ size }
                                            kind={ 'button' }>Button</Button>
                                    <Button variant={ variant } size={ size }
                                            kind={ 'button' }><span>[-]</span>Button</Button>
                                </div>
                            ))
                        }
                    </section>
                ))
            }
        </PreviewList>
    );
});