// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { DateTime } from "luxon";
import {RequestContract} from '@ioc:Adonis/Core/Request';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Weight from 'App/Models/Weight'

const getSafeLastPulledAt = (request: RequestContract) => {
    console.log(request.input('lastPulledAt'));
    
    const lastPulledAt = request.input('lastPulledAt')
    if (lastPulledAt !== 'null') {
      return DateTime.fromMillis(parseInt(lastPulledAt)).toString()
    }
    return DateTime.fromMillis(1).toString()
  }

export default class SyncsController {
    public async pull({request}:HttpContextContract){
        const changes = JSON.parse(request.input('changes'));
        console.log(changes?.weights?.created);
        
        
        if (changes?.weights?.created?.length > 0) {
            await Weight.createMany(changes.weights.created.map(remoteEntry => ({
              note: remoteEntry.note,
              weight: remoteEntry.weight,
              id: remoteEntry.id,
              createdAt: DateTime.fromMillis(parseInt(remoteEntry.created_at)),
            })))
          }
          if (changes?.weights?.updated?.length > 0) {
            const updateQueries = changes.weights.updated.map(remoteEntry => {
              return Weight.query().where('id', remoteEntry.id).update({
                note: remoteEntry.note,
                weight: remoteEntry.weight,
              })
            })
            await Promise.all(updateQueries)
          }
          if (changes?.weights?.deleted?.length > 0) {
            await Weight.query().where('id', changes.weights.deleted).exec()
          }
    }
    public async push ({request}: HttpContextContract) {
        const lastPulledAt = getSafeLastPulledAt(request);
        const created = await Weight.query().where('created_at', '>', lastPulledAt).exec()
        const updated = await Weight.query().where('updated_at', '>', lastPulledAt).exec()
        return {
          changes: {
            weights: {
              created,
              updated,
              deleted: [],
            },
          },
          timestamp: Date.now(),
        }
      }
}
