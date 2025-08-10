import { db } from '@/shared/db/db';

export async function searchOverPatients(query: string) {
  const [first, last, email] = await Promise.all([
    db.patients.where('first_name').startsWithIgnoreCase(query).toArray(),
    db.patients.where('last_name').startsWithIgnoreCase(query).toArray(),
    db.patients.where('email').startsWithIgnoreCase(query).toArray(),
  ]);

  const mergedSearchResults = [...first, ...last, ...email];
  const uniqueValues = [...new Map(mergedSearchResults.map((res) => [res.id, res])).values()].map(
    (item) => ({
      label: `${item.first_name} ${item.last_name}`,
      value: item.id,
    })
  );

  return uniqueValues;
}
