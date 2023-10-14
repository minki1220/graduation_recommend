import { connectDB } from '@/util/database';
import '../../css/list.css';
import Link from 'next/link';
import DetailLink from './DetailLink';

export default async function List() {

    let db = (await connectDB).db('store');
    let result = await db.collection('post').find().toArray();

    return (
        <div className="list-bg">
          { result.map((a,i)=>
            <div className="list-item" key={i}>
              <Link href={'/detail/' + result[i]._id}><h4>{a.title}</h4></Link>
              <p>1월 1일</p>
              <DetailLink/>
            </div>
          ) }
        </div>
      )
    }