export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Houses: undefined;
    Animals: { houseId: number };
    AnimalDetails: { animalId: number };
    Feedings: { animalId: number };
    AddHouse: { onHouseAdded: () => void };
    AddAnimal: { houseId: number; onAnimalAdded: () => void };
    AddFeeding: { animalId: number; onFeedingAdded: () => void };
    Logout: undefined;
  };
  