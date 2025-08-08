/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import patientsJson from '../temp/data/patients.json';
import { db } from './db';

export async function seedPatients(withDBReset = false) {
  if (withDBReset) {
    await Promise.all([
      db.patients.clear(),
      db.medications.clear(),
      db.conditions.clear(),
      db.allergies.clear(),
      db.files.clear(),
      db.medical_flags.clear(),
    ]);
  }

  if ((await db.patients.toArray()).length > 0) return;

  for (const patient of patientsJson) {
    const {
      notes = [],
      appointments = [],
      medications = [],
      conditions = [],
      allergies = [],
      tags = [],
      medical_flags = [],
      ...patientCore
    } = patient;

    const patientId = patient.id;

    await db.patients.add(patientCore);

    await db.notes.bulkAdd(
      notes.map((n) => ({
        ...n,
        entity_type: 'patient',
        entity_id: patientId,
      }))
    );

    await db.appointments.bulkAdd(
      appointments.map((a) => ({
        ...a,
        entity_type: 'patient',
        entity_id: patientId,
      }))
    );

    await db.medications.bulkAdd(
      medications.map((m) => ({
        ...m,
        id: crypto.randomUUID(),
        patient_id: patientId,
      }))
    );

    await db.conditions.bulkAdd(
      conditions.map((c) => ({
        id: crypto.randomUUID(),
        patient_id: patientId,
        condition: c,
      }))
    );

    await db.allergies.bulkAdd(
      allergies.map((a) => ({
        ...a,
        id: crypto.randomUUID(),
        patient_id: patientId,
      }))
    );

    await db.tags.bulkAdd(
      tags.map((t) => ({
        id: crypto.randomUUID(),
        tag: t,
        entity_type: 'patient',
        entity_id: patientId,
      }))
    );

    await db.medical_flags.bulkAdd(
      medical_flags.map((flag) => ({
        id: crypto.randomUUID(),
        patient_id: patientId,
        flag,
      }))
    );
  }

  console.log('✅ JSON import complete');
}
