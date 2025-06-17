export const isChildOf = function (target: HTMLElement | null, parent: HTMLElement): boolean {
    if (target === null) {
        return false;
    }

    if (target === parent) {
        return true;
    }

    return isChildOf(target.parentElement, parent);
};