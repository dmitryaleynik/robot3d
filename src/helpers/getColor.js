const getColor = continent => {
  switch(continent) {
    case 'Europe':
      return 'rgb(255,165,0)'; // orange
    case 'Asia':
      return 'rgb(255, 0, 0)'; // red
    case 'Africa':
      return 'rgb(255, 255, 0)'; // yellow
    case 'North America':
      return 'rgb(0, 255, 255)'; // cyan
    case 'South America':
      return 'rgb(0, 255, 0)'; // green
    case 'Australia':
      return 'rgb(138, 43, 226)'; // purple
    case 'Oceania':
      return 'rgb(255, 182, 193)'; // pink
    case 'Antarctida':
      return 'rgb(0, 0, 255)'; // blue
    default:
      return 'black';
  }
}

export default getColor;
