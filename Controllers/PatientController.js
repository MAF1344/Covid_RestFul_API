// import Model Patient
const Patient = require('../Models/Patient');

// import express-validator
const {validationResult} = require('express-validator');

// buat class PatientController
class PatientController {
  // method index untuk menampilkan semua data Patient
  async index(req, res) {
    try {
      const patient = await Patient.all();
      if (patient.length > 0) {
        const data = {
          message: 'Menampilkan semua patients',
          data: patient,
        };
        return res.status(200).json(data);
      } else {
        const data = {
          message: 'Data Patients Tidak Ditemukan',
        };
        return res.status(200).json(data);
      }
    } catch (error) {
      console.error(error);
      const data = {
        message: 'Terjadi kesalahan saat memproses data Patients',
      };
      return res.status(500).json(data);
    }
  }

  // Method store untuk menambahkan data baru patient
  async store(req, res) {
    try {
      // Validasi input menggunakan express-validator
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
      }

      const {name, phone, address, status, in_date_at, out_date_at} = req.body;
      const patient = await Patient.create(req.body);

      const data = {
        message: 'Menambahkan data patient',
        data: patient,
      };

      return res.status(201).json(data);
    } catch (error) {
      console.error(error);
      const data = {
        message: 'Terjadi kesalahan saat menambahkan data patient',
      };
      return res.status(500).json(data);
    }
  }

  // Method update untuk menambahkan data baru update
  async update(req, res) {
    try {
      const {id} = req.params;
      const patient = await Patient.find(id);

      if (patient) {
        const updatedPatient = await Patient.update(id, req.body);
        const data = {
          message: 'Mengedit data pasien',
          data: updatedPatient,
        };
        res.status(200).json(data);
      } else {
        const data = {
          message: 'Patient not found',
        };
        res.status(404).json(data);
      }
    } catch (error) {
      console.error(error);
      const data = {
        message: 'Terjadi kesalahan saat memproses data pasien',
      };
      res.status(500).json(data);
    }
  }

  // Method destroy untuk menghapus data patient
  async destroy(req, res) {
    const {id} = req.params;
    const patient = await Patient.find(id);

    if (patient) {
      await Patient.delete(id);
      const data = {
        message: 'Data Patient Berhasil Dihapus',
      };
      res.status(200).json(data);
    } else {
      const data = {
        message: 'Data tidak ditemukan',
      };
      res.status(404).json(data);
    }
  }

  // Method show untuk menemukan satu data patient
  async show(req, res) {
    const {id} = req.params;
    const patient = await Patient.find(id);

    if (patient) {
      const data = {
        message: 'Menampilkan detail dari data Patients',
        data: patient,
      };
      res.status(200).json(data);
    } else {
      const data = {
        message: 'Data Patient tidak ditemukan',
      };
      res.status(404).json(data);
    }
  }

  // Method search untuk menampilkan data patient berdasarkan nama
  async search(req, res) {
    try {
      const {name} = req.params; // Menggunakan req.params untuk mendapatkan parameter dari path
      if (!name) {
        const data = {
          message: 'Parameter name harus disertakan',
        };
        return res.status(422).json(data);
      }

      const patients = await Patient.search(name);
      if (patients.length > 0) {
        const data = {
          message: 'Menampilkan hasil pencarian patients',
          data: patients,
        };
        return res.status(200).json(data);
      } else {
        const data = {
          message: 'Data Patients tidak ditemukan berdasarkan nama',
        };
        return res.status(200).json(data);
      }
    } catch (error) {
      console.error(error);
      const data = {
        message: 'Terjadi kesalahan saat memproses data Patients',
      };
      return res.status(500).json(data);
    }
  }

  // Method positive untuk menampilkan data patients dengan status positive
  async positive(req, res) {
    try {
      const patients = await Patient.findByStatus('positive');
      if (patients.length > 0) {
        const data = {
          message: 'Menampilkan patients dengan status positive',
          data: patients,
        };
        return res.status(200).json(data);
      } else {
        const data = {
          message: 'Tidak ada patients dengan status positive',
        };
        return res.status(200).json(data);
      }
    } catch (error) {
      console.error(error);
      const data = {
        message: 'Terjadi kesalahan saat memproses data Patients',
      };
      return res.status(500).json(data);
    }
  }

  // Method recovered untuk menampilkan data patients dengan status recovered
  async recovered(req, res) {
    try {
      const patients = await Patient.findByStatus('recovered');
      if (patients.length > 0) {
        const data = {
          message: 'Menampilkan patients dengan status recovered',
          data: patients,
        };
        return res.status(200).json(data);
      } else {
        const data = {
          message: 'Tidak ada patients dengan status recovered',
        };
        return res.status(200).json(data);
      }
    } catch (error) {
      console.error(error);
      const data = {
        message: 'Terjadi kesalahan saat memproses data Patients',
      };
      return res.status(500).json(data);
    }
  }

  // Method dead untuk menampilkan data patients dengan status dead
  async dead(req, res) {
    try {
      const patients = await Patient.findByStatus('dead');
      if (patients.length > 0) {
        const data = {
          message: 'Menampilkan patients dengan status dead',
          data: patients,
        };
        return res.status(200).json(data);
      } else {
        const data = {
          message: 'Tidak ada patients dengan status dead',
        };
        return res.status(200).json(data);
      }
    } catch (error) {
      console.error(error);
      const data = {
        message: 'Terjadi kesalahan saat memproses data Patients',
      };
      return res.status(500).json(data);
    }
  }
}

// membuat object PatientController
const object = new PatientController();

// export object PatientController
module.exports = object;
