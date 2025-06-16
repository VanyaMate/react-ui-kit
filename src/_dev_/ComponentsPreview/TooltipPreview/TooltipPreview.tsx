import { type FC, memo } from 'react';
import { PreviewList } from '@/_dev_/ComponentsPreview/PreviewList';
import { Button, Input, Tooltip } from '@/components';
import { useTooltip } from '@/components/tooltips/Tooltip/hooks/useTooltip';


export const TooltipPreview: FC = memo(function TooltipPreview () {
    const [ trigger1, tooltip1, controller1 ] = useTooltip<HTMLButtonElement>('top', 'center');
    const [ trigger2, tooltip2, controller2 ] = useTooltip<HTMLButtonElement>('bottom', 'center');
    const [ trigger3, tooltip3, controller3 ] = useTooltip<HTMLButtonElement>('top', 'left');
    const [ trigger4, tooltip4, controller4 ] = useTooltip<HTMLButtonElement>('top', 'right', {
        x: 5, y: 10,
    });

    return (
        <PreviewList>
            <Button ref={ trigger1 }
                    onMouseEnter={ controller1.open }
                    onMouseLeave={ controller1.close }>Privet</Button>
            <Tooltip controller={ controller1 } ref={ tooltip1 }>
                <span>Подсказка</span>
            </Tooltip>
            <Button ref={ trigger2 }
                    onClick={ controller2.toggle }>Privet</Button>
            <Tooltip controller={ controller2 } ref={ tooltip2 }>
                <h1>Tooltip</h1>
                <Input placeholder={ 'EMail' }/>
            </Tooltip>
            <Button ref={ trigger3 }
                    onClick={ controller3.toggle }>Privet</Button>
            <Tooltip controller={ controller3 } ref={ tooltip3 }>
                <h1>Tooltip</h1>
                <Input placeholder={ 'EMail' }/>
            </Tooltip>
            <Button ref={ trigger4 }
                    onClick={ controller4.toggle }>Privet</Button>
            <Tooltip controller={ controller4 } ref={ tooltip4 }>
                <h1>Tooltip</h1>
                <Input placeholder={ 'EMail' }/>
            </Tooltip>
            <br/>
            <h1>_</h1>
            <br/>
            <h1>_</h1>
            <br/>
            <h1>_</h1>
            <br/>
            <h1>_</h1>
            <br/>
            <h1>_</h1>
            <br/>
            <h1>_</h1>
        </PreviewList>
    );
});