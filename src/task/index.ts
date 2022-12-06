import './task.css';

function eventHandler(interactionEvent: MouseEvent | TouchEvent): void {
    const parentNode = interactionEvent.currentTarget as HTMLElement;
    const parentRect = parentNode.getBoundingClientRect();
    const child = document.querySelector('.child');

    if (!child) {
        return;
    }

    const childSize = child.getBoundingClientRect().width;

    const event: MouseEvent | Touch = interactionEvent.type === 'mousemove'
        ? interactionEvent as MouseEvent
        : (interactionEvent as TouchEvent).touches[0];

    const gapToCenter = childSize / 2;

    let top = event.clientY - parentRect.y - gapToCenter;
    let left = event.clientX - parentRect.x - gapToCenter;

    const childBoundaries = {
        top: 0,
        left: 0,
        right: parentRect.width - childSize,
        bottom: parentRect.height - childSize,
    };

    if (top < childBoundaries.top) {
        top = childBoundaries.top;
    }

    if (top > childBoundaries.bottom) {
        top = childBoundaries.bottom;
    }

    if (left < childBoundaries.left) {
        left = childBoundaries.left;
    }

    if (left > childBoundaries.right) {
        left = childBoundaries.right;
    }

    (child as HTMLElement).style.top = `${Math.round(top)}px`;
    (child as HTMLElement).style.left = `${Math.round(left)}px`;
}

function addEvents(parent: HTMLElement, child: HTMLElement): void {
    const modifier = 'x-move';
    child.addEventListener('mousedown', () => {
        child.classList.add(modifier);
        parent.addEventListener('mousemove', eventHandler);
    });
    child.addEventListener('touchstart', () => {
        child.classList.add(modifier);
        parent.addEventListener('touchmove', eventHandler);
    });

    child.addEventListener('mouseup', () => {
        child.classList.remove(modifier);
        parent.removeEventListener('mousemove', eventHandler);
    });
    child.addEventListener('touchend', () => {
        child.classList.remove(modifier);
        parent.removeEventListener('touchmove', eventHandler);
    });
}

export default function task(): void {
    const parentElement = document.createElement('div');
    parentElement.classList.add('parent');

    const childElement = document.createElement('div');
    childElement.classList.add('child');

    parentElement.append(childElement);

    const bodyElement = document.querySelector('body');
    bodyElement.classList.add('main');
    bodyElement.appendChild(parentElement);

    addEvents(parentElement, childElement);
}
