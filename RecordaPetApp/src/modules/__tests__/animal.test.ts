import { addAnimal, getAnimalsByHouseId, Animal } from "../animal";

describe("Animal Module", () => {
  it("should add an animal", () => {
    const animal: Animal = { id: "1", name: "Rex", houseId: "1" };
    const addedAnimal = addAnimal(animal);
    expect(addedAnimal).toEqual(animal);
  });

  it("should get animals by house ID", () => {
    const animal1: Animal = { id: "2", name: "Bella", houseId: "2" };
    const animal2: Animal = { id: "3", name: "Max", houseId: "2" };
    addAnimal(animal1);
    addAnimal(animal2);
    const fetchedAnimals = getAnimalsByHouseId("2");
    expect(fetchedAnimals).toEqual([animal1, animal2]);
  });

  it("should return empty array for house with no animals", () => {
    const fetchedAnimals = getAnimalsByHouseId("999");
    expect(fetchedAnimals).toEqual([]);
  });
});
