export type Medication = {
  name: string;
  dosage: string;
  start_date: string; // ISO date string
  end_date: string; // ISO date string
  prescribed_by: string; // doctor_id
};
