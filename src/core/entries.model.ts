import { db } from "@/core/api";
import { Entry } from "@/core/entries.interfaces";

/**
 * A database reference to the given user's blood pressure readings
 */
const userEntries = (userId: string) =>
  db.collection(`users/${userId}/entries`);

/**
 * Add a blood pressure entry for a given user
 */
export const addEntryForUser = (userId: string, entry: Entry) =>
  userEntries(userId).add({
    ...entry,
    dateTime: new Date(entry.dateTime)
  });

/**
 * All blood pressure entries for a given user
 */
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
