/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import staffJson from '../temp/data/staff.json';
import { db } from './db';

export async function seedStaff(withDBReset = false) {
  if (withDBReset) {
    await db.staff.clear();
  }

  const existing = await db.staff.toArray();
  if (existing.length > 0) return;

  for (const staffMember of staffJson) {
    const { notes = [], tags = [], address, ...coreData } = staffMember;

    const staffId = staffMember.id;

    await db.staff.add({
      ...coreData,
      address,
    });

    // Optional: seed notes
    if (notes.length > 0) {
      await db.notes.bulkAdd(
        notes.map((n) => ({
          ...n,
          staff_id: staffId,
        }))
      );
    }

    // Optional: seed tags
    if (tags.length > 0) {
      await db.tags.bulkAdd(
        tags.map((t) => ({
          id: crypto.randomUUID(),
          tag: t.tag,
          staff_id: staffId,
        }))
      );
    }
  }

  console.log('✅ Staff JSON import complete');
}
