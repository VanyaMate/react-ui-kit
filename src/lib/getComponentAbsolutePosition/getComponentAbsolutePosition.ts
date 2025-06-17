export type Size = {
    x: number;
    y: number;
};

export type Offset = {
    x: number;
    y: number;
}

export type Position = {
    top: number;
    left: number;
    width: number;
    height: number;
}

export type Vertical =
    'top'
    | 'center'
    | 'bottom';

export type Horizontal =
    'left'
    | 'center'
    | 'right';


export const getComponentAbsolutePosition = function (
    parentPosition: Position,
    componentSize: Size,
    verticalPrefer: Vertical,
    horizontalPrefer: Horizontal,
    offset: Offset,
): Position {
    const viewportWidth  = document.documentElement.clientWidth;
    const viewportHeight = document.documentElement.clientHeight;

    let top    = 0;
    let left   = 0;
    let width  = componentSize.x;
    let height = componentSize.y;

    // Горизонтальное позиционирование

    const tryLeft    = parentPosition.left - componentSize.x - offset.x;
    const tryRight   = parentPosition.left + parentPosition.width + offset.x;
    const tryCenterH = parentPosition.left + (parentPosition.width - componentSize.x) / 2;

    const canLeftFit    = tryLeft >= 0;
    const canRightFit   = tryRight + componentSize.x <= viewportWidth;
    const canCenterHFit = tryCenterH >= 0 && tryCenterH + componentSize.x <= viewportWidth;

    if (horizontalPrefer === 'left') {
        if (canLeftFit) left = tryLeft;
        else if (canRightFit) left = tryRight;
        else if (canCenterHFit) left = tryCenterH;
        else {
            width = Math.min(componentSize.x, viewportWidth - offset.x * 2);
            left  = offset.x + (viewportWidth - width) / 2;
        }
    } else if (horizontalPrefer === 'right') {
        if (canRightFit) left = tryRight;
        else if (canLeftFit) left = tryLeft;
        else if (canCenterHFit) left = tryCenterH;
        else {
            width = Math.min(componentSize.x, viewportWidth - offset.x * 2);
            left  = offset.x + (viewportWidth - width) / 2;
        }
    } else {
        if (canCenterHFit) left = tryCenterH;
        else if (canRightFit) left = tryRight;
        else if (canLeftFit) left = tryLeft;
        else {
            width = Math.min(componentSize.x, viewportWidth - offset.x * 2);
            left  = offset.x + (viewportWidth - width) / 2;
        }
    }

    // Вертикальное позиционирование

    const tryTop     = parentPosition.top - componentSize.y - offset.y;
    const tryBottom  = parentPosition.top + parentPosition.height + offset.y;
    const tryCenterV = parentPosition.top + (parentPosition.height - componentSize.y) / 2;

    const canTopFit     = tryTop >= 0;
    const canBottomFit  = tryBottom + componentSize.y <= viewportHeight;
    const canCenterVFit = tryCenterV >= 0 && tryCenterV + componentSize.y <= viewportHeight;

    const forceNonCenterVertical =
              horizontalPrefer === 'center' ||
              (!canLeftFit && !canRightFit);

    const effectiveVerticalPrefer = forceNonCenterVertical && verticalPrefer === 'center'
                                    ? 'top'
                                    : verticalPrefer;

    if (effectiveVerticalPrefer === 'top') {
        if (canTopFit) top = tryTop;
        else if (canBottomFit) top = tryBottom;
        else {
            height = Math.min(componentSize.y, viewportHeight - offset.y * 2);
            top    = offset.y + (viewportHeight - height) / 2;
        }
    } else if (effectiveVerticalPrefer === 'bottom') {
        if (canBottomFit) top = tryBottom;
        else if (canTopFit) top = tryTop;
        else {
            height = Math.min(componentSize.y, viewportHeight - offset.y * 2);
            top    = offset.y + (viewportHeight - height) / 2;
        }
    } else {
        if (canCenterVFit) top = tryCenterV;
        else if (canBottomFit) top = tryBottom;
        else if (canTopFit) top = tryTop;
        else {
            height = Math.min(componentSize.y, viewportHeight - offset.y * 2);
            top    = offset.y + (viewportHeight - height) / 2;
        }
    }

    return {
        top,
        left,
        width,
        height,
    };
};