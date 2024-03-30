export function makePhantom(event, el, onDrop = null) {

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;
    let clonedElement = null;


    startDrag(event);


    function startDrag(e) {
        // Prevent default to stop text selection, etc.
        e.preventDefault();

        isDragging = true;

        // Calculate the offset between the cursor and the target element's top-left corner
        offsetX = e.clientX - el.getBoundingClientRect().left;
        offsetY = e.clientY - el.getBoundingClientRect().top;

        // Clone the element and style it
        clonedElement = el.cloneNode(true);
        const els = clonedElement.querySelectorAll('[id]');
        els.forEach(el => el.removeAttribute('id'));

        clonedElement.style.position = 'absolute';
        clonedElement.style.pointerEvents = 'none';  // Make it non-interactive
        clonedElement.style.zIndex = 99999999;
        clonedElement.style.opacity = .8;
        document.body.style.cursor = "grabbing";
        
        const bb = el.getBoundingClientRect();
        clonedElement.style.width = bb.width + "px";
        clonedElement.style.minWidth = bb.width + "px";
        clonedElement.style.maxWidth = bb.width + "px";
        document.body.appendChild(clonedElement);


        // Update its initial position
        updateElementPosition(e);

        // Listen for mousemove and mouseup events
        document.addEventListener('mousemove', updateElementPosition);
        document.addEventListener('mouseup', stopDrag);
    }

    function updateElementPosition(e) {
        if (!isDragging || !clonedElement) return;

        clonedElement.style.left = (e.clientX - offsetX) + 'px';
        clonedElement.style.top = (e.clientY - offsetY) + 'px';
    }

    function stopDrag() {
        if (onDrop !== null) onDrop();
        isDragging = false;
        document.body.style.cursor = 'default';

        if (clonedElement) {
            document.body.removeChild(clonedElement);
            clonedElement = null;
        }

        document.removeEventListener('mousemove', updateElementPosition);
        document.removeEventListener('mouseup', stopDrag);
    }
}