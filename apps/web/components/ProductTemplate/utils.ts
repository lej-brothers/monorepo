import GRIND_SIZE from "../../constants/grindSize";

export const getGrindAttitude = (should: boolean, size: GRIND_SIZE) => {
  if (!should) return "Nguyên Hạt";
  if (size === GRIND_SIZE.ESPRESSO) return "Espresso";
  if (size === GRIND_SIZE.FILTER) return "Phin";
  return ''
};
