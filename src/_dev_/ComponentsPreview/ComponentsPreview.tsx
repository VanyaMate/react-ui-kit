import { type ComponentPropsWithoutRef, type FC, memo } from 'react';
import classNames from 'classnames';
import css from './ComponentsPreview.module.css';
import { PreviewList } from './PreviewList';
import { ButtonPreview } from './ButtonPreview/ButtonPreview';
import { InputPreview } from './InputPreview/InputPreview';
import { TooltipPreview } from './TooltipPreview/TooltipPreview';
import { CheckboxPreview } from './CheckboxPreview/CheckboxPreview';
import { Button, Card, Tooltip, useTooltip } from '@root';
import { Heading } from '../../components/heading/Heading/ui/Heading';


export type ComponentsPreviewProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const ComponentsPreview: FC<ComponentsPreviewProps> = memo(function ComponentsPreview (props) {
    const { className, ...other } = props;

    const [ trigger, tooltip, controller, controls ] = useTooltip<HTMLButtonElement>({
        position: {
            horizontal: 'right',
            vertical  : 'bottom',
            offset    : {
                x: 5,
                y: 5,
            },
        },
    });

    return (
        <div>
            <header style={ {
                display       : 'flex',
                alignItems    : 'center',
                justifyContent: 'space-between',
                padding       : 10,
            } }>
                <h2>Biznes+</h2>
                <ul style={ {
                    display      : 'flex', alignItems: 'center', gap: 10,
                    listStyleType: 'none',
                } }>
                    <li>
                        <Button variant={ 'link' }>Решение</Button>
                    </li>
                    <li>
                        <Button variant={ 'link' }>Цены</Button>
                    </li>
                    <li>
                        <Button variant={ 'link' }>Контакты</Button>
                    </li>
                    <li>
                        <Button variant={ 'outline' }
                                kind={ 'icon' }>[m]</Button>
                    </li>
                    <li>
                        <Button variant={ 'outline' }
                                kind={ 'icon' }
                                ref={ trigger }
                                { ...controls.onClick }
                        >[p]</Button>
                        <Tooltip controller={ controller } ref={ tooltip }>
                            <ul style={ {
                                display      : 'flex',
                                flexDirection: 'column',
                                alignItems   : 'stretch',
                                alignContent : 'stretch',
                                gap          : 10,
                                listStyleType: 'none',
                            } }>
                                <li>
                                    <Button variant={ 'link' }>Профиль</Button>
                                </li>
                                <li>
                                    <Button
                                        variant={ 'link' }>Настройки</Button>
                                </li>
                                <li>
                                    <Button variant={ 'danger' }>Выйти</Button>
                                </li>
                            </ul>
                        </Tooltip>
                    </li>
                </ul>
            </header>
            <Card variant={ 'default' }>
                <Heading
                    content={
                        <Card variant={ 'main' }>
                            <Heading>
                                '2 card'
                            </Heading>
                        </Card>
                    }
                >
                    '1 card'
                </Heading>
            </Card>

            <Card variant={ 'main' }>
                '2 card'
            </Card>

            <Card variant={ 'primary' }>
                '3 card'
            </Card>

            <Card variant={ 'danger' }>
                '4 card'
            </Card>

            <Card variant={ 'gold' }>
                '5 card'
            </Card>

            <Card variant={ 'success' }>
                '6 card'
            </Card>

            <PreviewList { ...other }
                         className={ classNames(css.container, {}, [ className ]) }>
                <ButtonPreview/>
                <InputPreview/>
                <TooltipPreview/>
                <CheckboxPreview/>
            </PreviewList>
        </div>
    );
});