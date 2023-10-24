import { connectDB } from "@/util/database"

export default async function Home() {
  // const db = (await connectDB).db('store')
  // let result = await db.collection('post').find().toArray()
  // console.log(result)
  return (
    <div className="bg">
      <h4>
        home
      </h4>
    </div>
  )
}
