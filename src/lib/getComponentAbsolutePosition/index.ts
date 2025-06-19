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

    const clamp = (val: number, min: number, max: number): number => Math.max(min, Math.min(val, max));

    const tryTop     = parentPosition.top - componentSize.y - offset.y;
    const tryBottom  = parentPosition.top + parentPosition.height + offset.y;
    const tryCenterV = parentPosition.top + (parentPosition.height - componentSize.y) / 2;

    const tryLeftEdge  = parentPosition.left + offset.x;
    const tryRightEdge = parentPosition.left + parentPosition.width - componentSize.x - offset.x;
    const tryCenterH   = parentPosition.left + (parentPosition.width - componentSize.x) / 2;

    const canTopFit     = tryTop >= 0;
    const canBottomFit  = tryBottom + componentSize.y <= viewportHeight;
    const canCenterVFit = tryCenterV >= 0 && tryCenterV + componentSize.y <= viewportHeight;

    const isVerticalStacked = verticalPrefer !== 'center';

    if (isVerticalStacked) {
        if (horizontalPrefer === 'left') {
            left = tryLeftEdge;
            if (left + componentSize.x > viewportWidth) {
                width = Math.min(componentSize.x, viewportWidth - offset.x * 2);
                left  = offset.x + (viewportWidth - width) / 2;
            }
        } else if (horizontalPrefer === 'right') {
            left = tryRightEdge;
            if (left < 0) {
                width = Math.min(componentSize.x, viewportWidth - offset.x * 2);
                left  = offset.x + (viewportWidth - width) / 2;
            }
        } else {
            left = clamp(tryCenterH, offset.x, viewportWidth - componentSize.x - offset.x);
        }
    } else {
        const tryLeft  = parentPosition.left - componentSize.x - offset.x;
        const tryRight = parentPosition.left + parentPosition.width + offset.x;

        if (horizontalPrefer === 'left') {
            if (tryLeft >= 0) left = tryLeft;
            else if (tryRight + componentSize.x <= viewportWidth) left = tryRight;
            else left = clamp(tryCenterH, offset.x, viewportWidth - componentSize.x - offset.x);
        } else if (horizontalPrefer === 'right') {
            if (tryRight + componentSize.x <= viewportWidth) left = tryRight;
            else if (tryLeft >= 0) left = tryLeft;
            else left = clamp(tryCenterH, offset.x, viewportWidth - componentSize.x - offset.x);
        } else {
            left = clamp(tryCenterH, offset.x, viewportWidth - componentSize.x - offset.x);
        }
    }

    const forceNonCenterVertical =
              horizontalPrefer === 'center' ||
              (left < 0 || left + componentSize.x > viewportWidth);

    const effectiveVerticalPrefer =
              forceNonCenterVertical && verticalPrefer === 'center'
              ? 'bottom'
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