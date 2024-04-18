import {synchronize} from '@nozbe/watermelondb/sync';
import {database} from './database';

const SYNC_API_URL = 'http://192.168.10.207:3333/sync';

export async function sync() {
  await synchronize({
    database,
    pullChanges: async ({lastPulledAt}) => {
      const response = await fetch(
        `${SYNC_API_URL}?lastPulledAt=${lastPulledAt}`,
      );
      console.log('sync', response);
      if (!response.ok) {
        throw new Error(await response.text());
      }
      const {changes, timestamp} = await response.json();
      return {changes, timestamp};
    },
    pushChanges: async ({changes, lastPulledAt}) => {
      console.log('changes', changes);

      const response = await fetch(
        `${SYNC_API_URL}?lastPulledAt=${lastPulledAt}&changes=${JSON.stringify(
          changes,
        )}`,
        {
          method: 'POST',
          body: JSON.stringify(changes),
        },
      );
      if (!response.ok) {
        throw new Error(await response.text());
      }
    },
  });
}
