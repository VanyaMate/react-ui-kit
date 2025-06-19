import { type ComponentPropsWithoutRef, type FC, memo, useMemo } from 'react';
import { PreviewList } from '@/_dev_/ComponentsPreview/PreviewList';
import { Button, Input, Tooltip } from '@/components';
import { useTooltip } from '@/components/tooltips/Tooltip/hooks/useTooltip';


export type InputPreviewProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const InputPreview: FC<InputPreviewProps> = memo(function InputPreview (props) {
    const { ...other } = props;

    const offset                                     = useMemo(() => ({
        x: 0, y: 5,
    }), []);
    const [ trigger, tooltip, controller, controls ] = useTooltip<HTMLLabelElement>('top', 'left', offset);

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
            <Input
                variant={ 'outline' }
                size={ 'medium' }
                placeholder={ 'email' }
                labelRef={ trigger }
                success
                extraPrefix={ <span
                    style={ { color: 'var(--success)' } }>[ok]</span> }
            />
            <Input
                variant={ 'outline' }
                size={ 'medium' }
                placeholder={ 'email' }
                labelRef={ trigger }
                error
                extraPrefix={ <span { ...controls.onHover }
                                    style={ { color: 'var(--danger)' } }>[error]</span> }
            />
            <Tooltip controller={ controller } ref={ tooltip }
                     style={ { borderColor: 'var(--danger)' } }>
                <span style={ { color: 'var(--danger)' } }>Неправильный формат почты</span>
            </Tooltip>
        </PreviewList>
    );
});