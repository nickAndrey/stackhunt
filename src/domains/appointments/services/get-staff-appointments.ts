import { db } from '@/shared/db/db';
import type { Appointment } from '@/shared/types/appointment';

export async function getStaffAppointments(): Promise<Appointment[]> {
  const appointments = await db.appointments.toArray();

  const appointmentsWithAssigned = await Promise.all(
    appointments.map(async (item) => {
      let itemModified;

      if (item.entity_type == 'staff') {
        const staff = await db.staff.where('id').equals(item.entity_id).first();
        if (staff) {
          itemModified = {
            ...item,
            assignedStaff: {
              id: staff.id,
              role: staff.role,
              first_name: staff.first_name,
              last_name: staff.last_name,
            },
          };
        }
      }

      if (item.entity_type == 'patient') {
        const patient = await db.patients.where('id').equals(item.entity_id).first();
        if (patient) {
          itemModified = {
            ...item,
            assignedPatient: {
              id: patient.id,
              first_name: patient.first_name,
              last_name: patient.last_name,
            },
          };
        }
      }

      return itemModified;
    })
  );

  const grouped = new Map<string, Appointment>();

  for (const app of appointmentsWithAssigned) {
    if (!app) continue;

    const existing = grouped.get(app.group_id);

    if (!existing) {
      grouped.set(app.group_id, app);
    } else {
      grouped.set(app.group_id, {
        ...existing,
        assignedStaff: existing.assignedStaff ?? app.assignedStaff,
        assignedPatient: existing.assignedPatient ?? app.assignedPatient,
      });
    }
  }

  const uniqueAppointments = Array.from(grouped.values());

  return new Promise((resolve) => setTimeout(() => resolve(uniqueAppointments), 1000));
}
