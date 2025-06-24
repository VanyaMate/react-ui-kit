import {
    type ComponentPropsWithoutRef,
    type FC,
    memo,
    useRef,
} from 'react';
import { PreviewList } from '../PreviewList';
import { Button, Icon, Input, Tooltip, useTooltip } from '@root';
import { IoLogoXbox, IoMail } from 'react-icons/io5';
import {
    TooltipIcon,
} from '../../../components/icons/TooltipIcon/ui/TooltipIcon';
import { P } from '../../../components/typography/P/ui/P';
import { IconLoader } from '../../../components/icons/IconLoader/ui/IconLoader';


export type InputPreviewProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const InputPreview: FC<InputPreviewProps> = memo(function InputPreview (props) {
    const { ...other } = props;

    const [ trigger, tooltip, controller, controls ] = useTooltip<HTMLLabelElement>();
    const seartchRef                                 = useRef<HTMLLabelElement | null>(null);

    return (
        <PreviewList { ...other }>
            <h2>Inputs</h2>
            <Input/>
            <Input
                placeholder={ 'email' }
                extraPrefix={ <Icon variant={ 'ghost' }
                                    size={ 'small' }><IoMail/></Icon> }
            />
            <Input
                size="small"
                placeholder={ 'email' }
            />
            <Input
                size="medium"
                placeholder={ 'Password' }
                type={ 'password' }
                extraPrefix={
                    <Icon variant={ 'ghost' } size={ 'small' }>
                        <IconLoader/>
                    </Icon>
                }
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
                labelRef={ seartchRef }
                extraPrefix={
                    <TooltipIcon
                        variant={ 'danger' }
                        horizontal={ 'left' }
                        content={ <P variant={ 'danger' }>Error message</P> }
                        parent={ seartchRef }
                    >
                        <IoLogoXbox/>
                    </TooltipIcon>
                }
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