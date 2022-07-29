const getRandom = (num) => Math.random() * num;
export const getRandomColor = () => {
  const r = Math.floor(getRandom(255));
  const g = Math.floor(getRandom(255));
  const b = Math.floor(getRandom(255));
  return `rgba(${r}, ${g}, ${b}, 0.8)`;
}

export const getRandomPosition = (position) => {
  const { width, height } = position;

  return {
    left: Math.ceil(getRandom(width)) + 'px',
    top: Math.ceil(getRandom(height)) + 'px',
  }
}