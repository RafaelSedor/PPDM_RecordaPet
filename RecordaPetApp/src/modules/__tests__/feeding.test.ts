import { addFeeding, getFeedingsByAnimalId, Feeding } from "../feeding";

describe("Feeding Module", () => {
  it("should add a feeding", () => {
    const feeding: Feeding = {
      id: "1",
      animalId: "1",
      time: new Date(),
      amount: 100,
    };
    const addedFeeding = addFeeding(feeding);
    expect(addedFeeding).toEqual(feeding);
  });

  it("should get feedings by animal ID", () => {
    const feeding1: Feeding = {
      id: "2",
      animalId: "2",
      time: new Date(),
      amount: 150,
    };
    const feeding2: Feeding = {
      id: "3",
      animalId: "2",
      time: new Date(),
      amount: 200,
    };
    addFeeding(feeding1);
    addFeeding(feeding2);
    const fetchedFeedings = getFeedingsByAnimalId("2");
    expect(fetchedFeedings).toEqual([feeding1, feeding2]);
  });

  it("should return empty array for animal with no feedings", () => {
    const fetchedFeedings = getFeedingsByAnimalId("999");
    expect(fetchedFeedings).toEqual([]);
  });
});
