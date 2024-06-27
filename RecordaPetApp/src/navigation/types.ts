export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Animals: { houseId: number };
  AnimalDetails: { animalId: number };
  Feedings: { animalId: number };
  Houses: undefined;
  AddHouse: { onHouseAdded: () => Promise<void> };
  AddAnimal: { houseId: number, onAnimalAdded: () => void };
  AddFeeding: { animalId: number };
  Logout: undefined;
  AddHouseById: { onHouseAdded: () => Promise<void> };
};
