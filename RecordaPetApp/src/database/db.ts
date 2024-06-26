import { executeTransaction } from "./SQLiteDatabase";

// Function to create the necessary tables
export const createTables = async () => {
  try {
    await executeTransaction(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        username TEXT, 
        password TEXT
      );
    `);
    await executeTransaction(`
      CREATE TABLE IF NOT EXISTS houses (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT, 
        address TEXT, 
        userId INTEGER
      );
    `);
    await executeTransaction(`
      CREATE TABLE IF NOT EXISTS animals (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT, 
        type TEXT, 
        houseId INTEGER
      );
    `);
    await executeTransaction(`
      CREATE TABLE IF NOT EXISTS feedings (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        time DATETIME, 
        morning INTEGER, 
        afternoon INTEGER, 
        night INTEGER, 
        dawn INTEGER, 
        animalId INTEGER
      );
    `);
    console.log('Tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
  }
};

// Function to register a user
export const registerUser = async (username: string, password: string) => {
  try {
    const result = await executeTransaction(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, password]
    );
    return result;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// Function to log in a user
export const loginUser = async (username: string, password: string) => {
  console.log(`usuario = ${username} and password = ${password}`);
  try {
    const result = await executeTransaction(
      'SELECT * FROM users WHERE username = ? AND password = ?',
      [username, password]
    );
    if (result.rows.length > 0) {
      return result.rows.item(0);
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Function to fetch all houses
export const fetchHouses = async () => {
  try {
    const result = await executeTransaction('SELECT * FROM houses');
    return result.rows._array;
  } catch (error) {
    console.error('Error fetching houses:', error);
    throw error;
  }
};

// Function to insert a house
export const insertHouse = async (name: string, address: string, userId: number) => {
  try {
    const result = await executeTransaction(
      'INSERT INTO houses (name, address, userId) VALUES (?, ?, ?)',
      [name, address, userId]
    );
    return result;
  } catch (error) {
    console.error('Error inserting house:', error);
    throw error;
  }
};

// Function to fetch a specific house
export const fetchHouse = async (id: number) => {
  try {
    const result = await executeTransaction(
      'SELECT * FROM houses WHERE id = ?',
      [id]
    );
    return result.rows._array;
  } catch (error) {
    console.error('Error fetching house:', error);
    throw error;
  }
};

// Function to update a house
export const updateHouse = async (id: number, name: string, address: string, userId: number) => {
  try {
    const result = await executeTransaction(
      'UPDATE houses SET name = ?, address = ?, userId = ? WHERE id = ?',
      [name, address, userId, id]
    );
    return result;
  } catch (error) {
    console.error('Error updating house:', error);
    throw error;
  }
};

// Function to delete a house
export const deleteHouse = async (id: number) => {
  try {
    const result = await executeTransaction(
      'DELETE FROM houses WHERE id = ?',
      [id]
    );
    return result;
  } catch (error) {
    console.error('Error deleting house:', error);
    throw error;
  }
};

// Function to fetch all animals of a specific house
export const fetchAnimals = async (houseId: number) => {
  try {
    const result = await executeTransaction(
      'SELECT * FROM animals WHERE houseId = ?',
      [houseId]
    );
    return result.rows._array;
  } catch (error) {
    console.error('Error fetching animals:', error);
    throw error;
  }
};

// Function to insert an animal
export const insertAnimal = async (name: string, type: string, houseId: number) => {
  try {
    const result = await executeTransaction(
      'INSERT INTO animals (name, type, houseId) VALUES (?, ?, ?)',
      [name, type, houseId]
    );
    return result;
  } catch (error) {
    console.error('Error inserting animal:', error);
    throw error;
  }
};

// Function to fetch a specific animal
export const fetchAnimal = async (id: number) => {
  try {
    const result = await executeTransaction(
      'SELECT * FROM animals WHERE id = ?',
      [id]
    );
    return result.rows._array;
  } catch (error) {
    console.error('Error fetching animal:', error);
    throw error;
  }
};

// Function to update an animal
export const updateAnimal = async (id: number, name: string, type: string, houseId: number) => {
  try {
    const result = await executeTransaction(
      'UPDATE animals SET name = ?, type = ?, houseId = ? WHERE id = ?',
      [name, type, houseId, id]
    );
    return result;
  } catch (error) {
    console.error('Error updating animal:', error);
    throw error;
  }
};

// Function to delete an animal
export const deleteAnimal = async (id: number) => {
  try {
    const result = await executeTransaction(
      'DELETE FROM animals WHERE id = ?',
      [id]
    );
    return result;
  } catch (error) {
    console.error('Error deleting animal:', error);
    throw error;
  }
};

// Function to fetch all feedings of a specific animal
export const fetchFeedings = async (animalId: number) => {
  try {
    const result = await executeTransaction(
      'SELECT * FROM feedings WHERE animalId = ?',
      [animalId]
    );
    return result.rows._array;
  } catch (error) {
    console.error('Error fetching feedings:', error);
    throw error;
  }
};

// Function to insert a feeding
export const insertFeeding = async (time: string, morning: number, afternoon: number, night: number, dawn: number, animalId: number) => {
  try {
    const result = await executeTransaction(
      'INSERT INTO feedings (time, morning, afternoon, night, dawn, animalId) VALUES (?, ?, ?, ?, ?, ?)',
      [time, morning, afternoon, night, dawn, animalId]
    );
    return result;
  } catch (error) {
    console.error('Error inserting feeding:', error);
    throw error;
  }
};

// Function to fetch a specific feeding
export const fetchFeeding = async (id: number) => {
  try {
    const result = await executeTransaction(
      'SELECT * FROM feedings WHERE id = ?',
      [id]
    );
    return result.rows._array;
  } catch (error) {
    console.error('Error fetching feeding:', error);
    throw error;
  }
};

// Function to update a feeding
export const updateFeeding = async (id: number, time: string, morning: number, afternoon: number, night: number, dawn: number, animalId: number) => {
  try {
    const result = await executeTransaction(
      'UPDATE feedings SET time = ?, morning = ?, afternoon = ?, night = ?, dawn = ?, animalId = ? WHERE id = ?',
      [time, morning, afternoon, night, dawn, animalId, id]
    );
    return result;
  } catch (error) {
    console.error('Error updating feeding:', error);
    throw error;
  }
};

// Function to delete a feeding
export const deleteFeeding = async (id: number) => {
  try {
    const result = await executeTransaction(
      'DELETE FROM feedings WHERE id = ?',
      [id]
    );
    return result;
  } catch (error) {
    console.error('Error deleting feeding:', error);
    throw error;
  }
};

// Function to reset all feedings of a specific animal
export const resetFeedings = async (animalId: number) => {
  try {
    const result = await executeTransaction(
      'DELETE FROM feedings WHERE animalId = ?',
      [animalId]
    );
    return result;
  } catch (error) {
    console.error('Error resetting feedings:', error);
    throw error;
  }
};

