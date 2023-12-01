import { database } from "./database";

export type WeightType = {
    createdAt?: Date;
    weight: string | number;
    note: string | undefined;
  };

export const weights = database.collections.get('weights');

export const observeWeights = ()=> weights.query().observe();
console.log(database);

export const saveWeight =  async({weight,note}:WeightType)=>{
    await database.write(async()=>{
        await weights.create((entry)=>{
            entry.weight = Number(weight);
            entry.note = note;
        });
    });
}
