export interface Animal {
    id: string;
    name: string;
    houseId: string;
  }
  
  const animals: Animal[] = [];
  
  export const addAnimal = (animal: Animal): Animal => {
    animals.push(animal);
    return animal;
  };
  
  export const getAnimalsByHouseId = (houseId: string): Animal[] => {
    return animals.filter(animal => animal.houseId === houseId);
  };
  