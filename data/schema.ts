import { appSchema,tableSchema } from "@nozbe/watermelondb";

export default appSchema({
    version:1,
    tables:[
        tableSchema({
            name:'weights',
            columns:[
                {name:'weight',type:'number'},
                {name:'created_at',type:'number',isIndexed:true},
                {name:'note',type:'string',isOptional:true,isIndexed:true}
            ]
        })
    ]
})