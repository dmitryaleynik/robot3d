const getColor = continent => {
  switch(continent) {
    case 'Europe':
      return 'rgb(255,165,0)';
    case 'Asia':
      return 'rgb(255, 0, 0)';
    case 'Africa':
      return 'rgb(255, 255, 0)';
    default:
      return 'black';
  }
}

export default getColor;
