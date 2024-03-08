export const convertToPls = (contours) => {
  const pls = [];

  contours.forEach(pl => {
    const currentPl = [];

    pl.forEach((line, i) => {
      const { origin, end } = line;

      if (i === 0) currentPl.push([...origin]);
      currentPl.push([...end]);
    });

    if (currentPl.length > 0) pls.push(currentPl);
  });

  return pls;
}

export const convertPlsToContours = (pls) => {
  const contours = [];

  pls.forEach(pl => {
    const contour = [];

    let last = null;
    pl.forEach((pt, i) => {

      if (last) contour.push({
        type: "line",
        origin: last,
        end: pt
      })

      last = pt;
    });

    if (contour.length > 0) contours.push(contour);
  });

  return contours;
}