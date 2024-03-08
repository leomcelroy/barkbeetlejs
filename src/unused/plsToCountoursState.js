convertPlsToContours(expandedInside).forEach(contour => {
  let newID = utils.makeID();
  newContours[newID] = contour;
});

state.contours = {
  ...state.contours,
  ...newContours
};