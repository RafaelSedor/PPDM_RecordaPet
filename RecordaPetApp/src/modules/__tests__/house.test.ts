import { addHouse, getHouseById, House } from "../house";

describe("House Module", () => {
  it("should add a house", () => {
    const house: House = { id: "1", name: "Doe Household" };
    const addedHouse = addHouse(house);
    expect(addedHouse).toEqual(house);
  });

  it("should get a house by ID", () => {
    const house: House = { id: "2", name: "Smith Household" };
    addHouse(house);
    const fetchedHouse = getHouseById("2");
    expect(fetchedHouse).toEqual(house);
  });

  it("should return undefined for non-existing house", () => {
    const fetchedHouse = getHouseById("999");
    expect(fetchedHouse).toBeUndefined();
  });
});
