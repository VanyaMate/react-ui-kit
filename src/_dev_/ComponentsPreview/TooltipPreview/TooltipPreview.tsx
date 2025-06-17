import { type FC, memo } from 'react';
import { PreviewList } from '@/_dev_/ComponentsPreview/PreviewList';
import { Button, Input, Tooltip } from '@/components';
import { useTooltip } from '@/components/tooltips/Tooltip/hooks/useTooltip';


export const TooltipPreview: FC = memo(function TooltipPreview () {
    const [ trigger1, tooltip1, controller1 ]            = useTooltip<HTMLButtonElement>('center', 'left', {
        x: 5, y: 5,
    });
    const [ trigger3, tooltip3, controller3, controls3 ] = useTooltip<HTMLButtonElement>('center', 'right');
    const [ trigger2, tooltip2, controller2 ]            = useTooltip<HTMLButtonElement>('bottom', 'center', undefined, [ tooltip3 ]);
    const [ trigger4, tooltip4, controller4 ]            = useTooltip<HTMLButtonElement>('top', 'right', {
        x: 5, y: 10,
    });

    return (
        <PreviewList>
            <Button ref={ trigger2 }
                    variant={ 'secondary' }
                    onClick={ controller2.toggle }>Privet</Button>
            <Tooltip controller={ controller2 } ref={ tooltip2 }>
                <h1>Tooltip</h1>
                <Input placeholder={ 'EMail' }/>
                <br/>
                <Button ref={ trigger3 }
                        variant={ 'secondary' }
                        { ...controls3.onClick }>Privet</Button>
                <Tooltip controller={ controller3 } ref={ tooltip3 }>
                    <h1>Tooltip</h1>
                    <Input placeholder={ 'EMail' }/>
                </Tooltip>
            </Tooltip>
            <Button ref={ trigger4 }
                    variant={ 'secondary' }
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
            <div style={ {
                padding       : 100,
                display       : 'flex',
                justifyContent: 'center',
                alignItems    : 'center',
            } }>
                <Button ref={ trigger1 }
                        variant={ 'secondary' }
                        onMouseEnter={ controller1.open }
                        onMouseLeave={ controller1.close }>Privet</Button>
                <Tooltip controller={ controller1 } ref={ tooltip1 }>
                    <span>Подсказка</span>
                </Tooltip>
            </div>
        </PreviewList>
    );
});