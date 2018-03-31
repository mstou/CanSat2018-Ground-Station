const sphericalToCartesian = (r, longitude, latitude) => {
    const x = r*Math.cos(longitude)*Math.sin(latitude);
    const y = r*Math.sin(longitude)*Math.sin(latitude)
    const z = r*Math.cos(latitude);
    return {
      x,
      y,
      z,
    }
}
export { sphericalToCartesian };
