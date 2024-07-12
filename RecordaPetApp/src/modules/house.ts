export interface House {
  id: string;
  name: string;
}

const houses: House[] = [];

export const addHouse = (house: House): House => {
  houses.push(house);
  return house;
};

export const getHouseById = (id: string): House | undefined => {
  return houses.find((house) => house.id === id);
};
