// import database
const db = require('../config/database');

// membuat class Patient
class Patient {
  // Method all untuk menampilkan seluruh data patient
  static all() {
    // return Promise sebagai solusi Asynchronous
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM patients';
      db.query(sql, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  // Method create untuk menambahkan data patient
  static async create(data, callback) {
    const id = await new Promise((resolve, reject) => {
      const sql = 'INSERT INTO patients SET ?';
      db.query(sql, data, (err, results) => {
        resolve(results.insertId);
      });
    });
    const student = this.find(id);
    return student;
  }

  // Method find untuk menemukan data patient
  static find(id) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM patients WHERE id = ?';
      db.query(sql, id, (err, results) => {
        // destructing array
        const [student] = results;
        resolve(student);
      });
    });
  }

  // Method update untuk mengubah data patient
  static async update(id, data) {
    await new Promise((resolve, reject) => {
      const sql = 'UPDATE patients SET ? WHERE id = ?';
      db.query(sql, [data, id], (err, results) => {
        resolve(results);
      });
    });
    const student = await this.find(id);
    return student;
  }

  // Methd delete untuk mengapus data patient
  static delete(id) {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM patients WHERE id = ?';
      db.query(sql, id, (err, results) => {
        resolve(results);
      });
    });
  }

  // Method search untuk menampilkan data berdasarkan nama
  static search(name) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM patients WHERE name LIKE ?';
      const searchTerm = `%${name}%`;
      db.query(sql, searchTerm, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  // Method findByStatus untuk menampilkan data patient dengan status yang berbeda beda
  static findByStatus(status) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM patients WHERE status = ?';
      db.query(sql, status, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }
}

// export class Patient
module.exports = Patient;
