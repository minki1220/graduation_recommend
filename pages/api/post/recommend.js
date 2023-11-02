import { connectDB } from "@/util/database";

export default async function handler(req,res){
    
    if(req.method == 'POST'){
        const time1 = req.body.time
        const category1 = req.body.category
        const cuisine1 = req.body.cuisine
        const occasion1 = req.body.occasion

        const db = (await connectDB).db('store');
        let result = await db.collection('choose').findOne(
           {time : time1,
            category : category1 ,
             cuisine : cuisine1 , 
             occasion : occasion1})
        
        if (result){
            res.status(200).json({ menu: result.menu, img : result.img });
        }
        } 
    }