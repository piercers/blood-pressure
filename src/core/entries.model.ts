import { db } from "@/core/api";
import { Entry } from "@/core/entries.interfaces";

const userEntries = (userId: string) =>
  db.collection(`users/${userId}/entries`);

export const addEntryForUser = (userId: string, entry: Entry) =>
  userEntries(userId).add({
    ...entry,
    dateTime: new Date(entry.dateTime)
  });

export const entriesListByUser = (userId: string) =>
  userEntries(userId)
    .get()
    .then(querySnapshot =>
      querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          dateTime: data.dateTime.toDate().toISOString()
        } as Entry;
      })
    );
