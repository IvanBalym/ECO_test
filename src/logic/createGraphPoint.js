const createGraphPoint = (name = "") => {
  const parts = name.split(/^([A-Z]{1})([A-Z]{1})(\d+)$/).filter(v=>!!v);
  if (parts.length !== 3) {
    return null;
  }
  return {
    name: parts[0],
    path: {
      dest: parts[1],
      distance: +parts[2]
    }
  };
};

export default createGraphPoint;