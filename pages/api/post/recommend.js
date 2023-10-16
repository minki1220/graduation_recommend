import { connectDB } from "@/util/database";

export default async function handler(req,res){
    // console.log(req.body)
    if(req.method == 'POST'){
        const category1 = req.body.category
        const cuisine1 = req.body.cuisine
        const occasion1 = req.body.occasion

        const db = (await connectDB).db('forum');
        
        let result = await db.collection('choose').findOne(
           {category : category1 ,
             cuisine : cuisine1 , 
             occasion : occasion1})
        
        // console.log(result)
        if (result){
            res.status(200).json({ menu: result.menu });
        }
        } 
    }