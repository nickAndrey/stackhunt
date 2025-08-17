import { db } from '@/shared/db/db';
import type { Appointment } from '@/shared/types/appointment';

export async function getStaffAppointments(): Promise<Appointment[]> {
  const appointments = await db.appointments.toArray();

  const enriched = await Promise.all(
    appointments.map(async (item) => {
      if (item.entity_type === 'staff') {
        const staff = await db.staff.get(item.entity_id);
        return staff
          ? {
              ...item,
              assignedStaff: {
                id: staff.id,
                role: staff.role,
                first_name: staff.first_name,
                last_name: staff.last_name,
              },
            }
          : item;
      }

      if (item.entity_type === 'patient') {
        const patient = await db.patients.get(item.entity_id);
        return patient
          ? {
              ...item,
              assignedPatient: {
                id: patient.id,
                first_name: patient.first_name,
                last_name: patient.last_name,
              },
            }
          : item;
      }

      return item;
    })
  );

  const grouped = enriched.reduce((map, app) => {
    if (!app) return map;

    const existing = map.get(app.group_id);
    if (!existing) {
      map.set(app.group_id, app);
    } else {
      map.set(app.group_id, {
        ...existing,
        assignedStaff: existing.assignedStaff ?? app.assignedStaff,
        assignedPatient: existing.assignedPatient ?? app.assignedPatient,
      });
    }
    return map;
  }, new Map<string, Appointment>());

  const uniqueAppointments = Array.from(grouped.values());

  return new Promise((resolve) => setTimeout(() => resolve(uniqueAppointments), 1000));
}
