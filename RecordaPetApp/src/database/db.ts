import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('recordapet.db');

// Função para criar as tabelas necessárias
export const createTables = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        username TEXT, 
        password TEXT
      );`
    );
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS houses (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT, 
        address TEXT, 
        userId INTEGER
      );`
    );
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS animals (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT, 
        type TEXT, 
        houseId INTEGER
      );`
    );
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS feedings (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        time DATETIME, 
        morning INTEGER, 
        afternoon INTEGER, 
        night INTEGER, 
        dawn INTEGER, 
        animalId INTEGER
      );`
    );
  });
};

// Função para registrar um usuário
export const registerUser = (username: string, password: string, callback: (error: any, result?: any) => void) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, password],
      (_, result) => callback(null, result),
      (_, error) => {
        callback(error);
        return false;
      }
    );
  });
};

// Função para logar um usuário
export const loginUser = (username: string, password: string, callback: (error: any, result?: any) => void) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM users WHERE username = ? AND password = ?',
      [username, password],
      (_, { rows }) => {
        if (rows.length > 0) {
          callback(null, rows.item(0));
        } else {
          callback('Invalid credentials', null);
        }
      },
      (_, error) => {
        callback(error, null);
        return true;
      }
    );
  });
};

// Função para obter todas as casas
export const fetchHouses = (callback: (error: any, result?: any) => void) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM houses',
      [],
      (_, { rows }) => callback(null, rows._array),
      (_, error) => {
        callback(error);
        return false;
      }
    );
  });
};

// Função para adicionar uma casa
export const insertHouse = (name: string, address: string, userId: number, callback: (error: any, result?: any) => void) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO houses (name, address, userId) VALUES (?, ?, ?)',
      [name, address, userId],
      (_, result) => callback(null, result),
      (_, error) => {
        callback(error);
        return false;
      }
    );
  });
};

// Função para obter uma casa específica
export const fetchHouse = (id: number, callback: (error: any, result?: any) => void) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM houses WHERE id = ?',
      [id],
      (_, { rows }) => callback(null, rows._array),
      (_, error) => {
        callback(error);
        return false;
      }
    );
  });
};

// Função para atualizar uma casa
export const updateHouse = (id: number, name: string, address: string, userId: number, callback: (error: any, result?: any) => void) => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE houses SET name = ?, address = ?, userId = ? WHERE id = ?',
      [name, address, userId, id],
      (_, result) => callback(null, result),
      (_, error) => {
        callback(error);
        return false;
      }
    );
  });
};

// Função para deletar uma casa
export const deleteHouse = (id: number, callback: (error: any, result?: any) => void) => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM houses WHERE id = ?',
      [id],
      (_, result) => callback(null, result),
      (_, error) => {
        callback(error);
        return false;
      }
    );
  });
};

// Função para obter todos os animais de uma casa específica
export const fetchAnimals = (houseId: number, callback: (error: any, result?: any) => void) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM animals WHERE houseId = ?',
      [houseId],
      (_, { rows }) => callback(null, rows._array),
      (_, error) => {
        callback(error);
        return false;
      }
    );
  });
};

// Função para adicionar um animal
export const insertAnimal = (name: string, type: string, houseId: number, callback: (error: any, result?: any) => void) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO animals (name, type, houseId) VALUES (?, ?, ?)',
      [name, type, houseId],
      (_, result) => callback(null, result),
      (_, error) => {
        callback(error);
        return false;
      }
    );
  });
};

// Função para obter um animal específico
export const fetchAnimal = (id: number, callback: (error: any, result?: any) => void) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM animals WHERE id = ?',
      [id],
      (_, { rows }) => callback(null, rows._array),
      (_, error) => {
        callback(error);
        return false;
      }
    );
  });
};

// Função para atualizar um animal
export const updateAnimal = (id: number, name: string, type: string, houseId: number, callback: (error: any, result?: any) => void) => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE animals SET name = ?, type = ?, houseId = ? WHERE id = ?',
      [name, type, houseId, id],
      (_, result) => callback(null, result),
      (_, error) => {
        callback(error);
        return false;
      }
    );
  });
};

// Função para deletar um animal
export const deleteAnimal = (id: number, callback: (error: any, result?: any) => void) => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM animals WHERE id = ?',
      [id],
      (_, result) => callback(null, result),
      (_, error) => {
        callback(error);
        return false;
      }
    );
  });
};

// Função para obter todas as alimentações de um animal específico
export const fetchFeedings = (animalId: number, callback: (error: any, result?: any) => void) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM feedings WHERE animalId = ?',
      [animalId],
      (_, { rows }) => callback(null, rows._array),
      (_, error) => {
        callback(error);
        return false;
      }
    );
  });
};

// Função para adicionar uma alimentação
export const insertFeeding = (time: string, morning: number, afternoon: number, night: number, dawn: number, animalId: number, callback: (error: any, result?: any) => void) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO feedings (time, morning, afternoon, night, dawn, animalId) VALUES (?, ?, ?, ?, ?, ?)',
      [time, morning, afternoon, night, dawn, animalId],
      (_, result) => {
        callback(null, result);
      },
      (_, error) => {
        callback(error);
        return true;
      }
    );
  });
};

// Função para obter uma alimentação específica
export const fetchFeeding = (id: number, callback: (error: any, result?: any) => void) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM feedings WHERE id = ?',
      [id],
      (_, { rows }) => callback(null, rows._array),
      (_, error) => {
        callback(error);
        return false;
      }
    );
  });
};

// Função para atualizar uma alimentação
export const updateFeeding = (id: number, time: string, morning: number, afternoon: number, night: number, dawn: number, animalId: number, callback: (error: any, result?: any) => void) => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE feedings SET time = ?, morning = ?, afternoon = ?, night = ?, dawn = ?, animalId = ? WHERE id = ?',
      [time, morning, afternoon, night, dawn, animalId, id],
      (_, result) => callback(null, result),
      (_, error) => {
        callback(error);
        return false;
      }
    );
  });
};

// Função para deletar uma alimentação
export const deleteFeeding = (id: number, callback: (error: any, result?: any) => void) => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM feedings WHERE id = ?',
      [id],
      (_, result) => callback(null, result),
      (_, error) => {
        callback(error);
        return false;
      }
    );
  });
};
