import { connectDB } from "@/util/database"

export default async function Home() {
  // const db = (await connectDB).db('store')
  // let result = await db.collection('post').find().toArray()
  // console.log(result)
  return (
    <div style={{backgroundColor :  'rgb(249, 250, 255)',
                width : '100%',
                height : '85vh',
                padding : '1px'}}>
      <h4>
        안녕
      </h4>
    </div>
  )
}
