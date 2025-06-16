import { type ComponentPropsWithoutRef, type FC, memo } from 'react';
import { PreviewList } from '@/_dev_/ComponentsPreview/PreviewList';
import { Button, Input } from '@/components';


export type InputPreviewProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const InputPreview: FC<InputPreviewProps> = memo(function InputPreview (props) {
    const { ...other } = props;

    return (
        <PreviewList { ...other }>
            <h2>Inputs</h2>
            <Input/>
            <Input placeholder={ 'placeholder' }/>
            <Input
                size="small"
                placeholder={ 'placeholder' }
            />
            <Input
                size="medium"
                placeholder={ 'placeholder' }
                extraPrefix={ <span>(x)</span> }
                extraPostfix={
                    <Button
                        variant={ 'ghost' }
                        size={ 'small' }
                        kind={ 'icon' }
                    >
                        X
                    </Button>
                }
            />
            <Input
                variant={ 'noborder' }
                size="large"
                placeholder={ 'placeholder' }
                extraPrefix={ <span>(x)</span> }
                extraPostfix={
                    <Button
                        variant={ 'primary' }
                        size={ 'medium' }
                        kind={ 'button' }
                    >
                        Загрузить
                    </Button>
                }
            />
        </PreviewList>
    );
});