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

    // ----- Vertical -----
    const topPreferred    = parentPosition.top - componentSize.y - offset.y;
    const bottomPreferred = parentPosition.top + parentPosition.height + offset.y;

    const canPlaceTop    = topPreferred >= 0;
    const canPlaceBottom = bottomPreferred + componentSize.y <= viewportHeight;

    if (verticalPrefer === 'top' && canPlaceTop) {
        top = topPreferred;
    } else if (verticalPrefer === 'bottom' && canPlaceBottom) {
        top = bottomPreferred;
    } else if (verticalPrefer === 'top' && canPlaceBottom) {
        top = bottomPreferred;
    } else if (verticalPrefer === 'bottom' && canPlaceTop) {
        top = topPreferred;
    } else {
        height = Math.min(componentSize.y, viewportHeight - offset.y * 2);
        top    = offset.y + (viewportHeight - height) / 2;
    }

    // ----- Horizontal -----
    const leftPreferred  = parentPosition.left - componentSize.x - offset.x;
    const rightPreferred = parentPosition.left + parentPosition.width + offset.x;

    const canPlaceLeft  = leftPreferred >= 0;
    const canPlaceRight = rightPreferred + componentSize.x <= viewportWidth;

    if (horizontalPrefer === 'left' && canPlaceLeft) {
        left = leftPreferred;
    } else if (horizontalPrefer === 'right' && canPlaceRight) {
        left = rightPreferred;
    } else if (horizontalPrefer === 'left' && canPlaceRight) {
        left = rightPreferred;
    } else if (horizontalPrefer === 'right' && canPlaceLeft) {
        left = leftPreferred;
    } else {
        width = Math.min(componentSize.x, viewportWidth - offset.x * 2);
        left  = offset.x + (viewportWidth - width) / 2;
    }

    return {
        top,
        left,
        width,
        height,
    };
};