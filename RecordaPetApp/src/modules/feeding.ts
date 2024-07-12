export interface Feeding {
  id: string;
  animalId: string;
  time: Date;
  amount: number;
}

const feedings: Feeding[] = [];

export const addFeeding = (feeding: Feeding): Feeding => {
  feedings.push(feeding);
  return feeding;
};

export const getFeedingsByAnimalId = (animalId: string): Feeding[] => {
  return feedings.filter((feeding) => feeding.animalId === animalId);
};
