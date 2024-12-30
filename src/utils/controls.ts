export const handleTouchControls = (
  event: TouchEvent,
  jumpCallback: () => void
) => {
  event.preventDefault();
  jumpCallback();
};