import { connectDB } from '@/util/database';
import '../../css/list.css';
import DetailLink from './DetailLink';
import ListItem from './ListItem';

export default async function List() {

    let db = (await connectDB).db('store');
    let result = await db.collection('post').find().toArray();

    return (
     
        <div className="list-bg">
          <ListItem result={result}/>
        </div>
    
      )
    }