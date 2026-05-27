// src/services/api.js

// ================= LOGIN API =================

export const loginApi = async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const userEmail = email?.trim();
      const userPass = password?.trim();

      if (userEmail && userPass) {
        resolve({
          success: true,
          token: "dummy-token-123",
          user: {
            id: "1",
            name: "Admin User",
            email: userEmail,
          },
        });
      } else {
        reject({
          success: false,
          message: "Invalid credentials",
        });
      }
    }, 800);
  });
};

// ================= FETCH PATIENTS API =================

export const fetchPatientsApi = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "1",
          name: "Rahul Sharma",
          disease: "Fever",
        },
        {
          id: "2",
          name: "Priya Mehta",
          disease: "Diabetes",
        },
        {
          id: "3",
          name: "Amit Shah",
          disease: "Flu",
        },
        {
          id: "4",
          name: "Sneha Joshi",
          disease: "Cold",
        },
      ]);
    }, 800);
  });
};

// ================= ADD PATIENT API =================

export const addPatientApi = async (
  name,
  disease
) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (name && disease) {
        resolve({
          success: true,
          patient: {
            id: Date.now().toString(),
            name,
            disease,
          },
        });
      } else {
        reject({
          success: false,
          message: "All fields required",
        });
      }
    }, 800);
  });
};

// ================= DELETE PATIENT API =================

export const deletePatientApi = async (
  patientId
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        deletedId: patientId,
      });
    }, 800);
  });
};

// ================= LOAD MORE API =================

export const loadMorePatientsApi = async (
  page
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const morePatients = Array.from({
        length: 5,
      }).map((_, i) => ({
        id: Date.now().toString() + i,
        name: `Patient ${page * 5 + i + 1}`,
        disease: "General Checkup",
      }));

      resolve(morePatients);
    }, 800);
  });
};
