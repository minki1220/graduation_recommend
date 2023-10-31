import { connectDB } from '@/util/database';
import '../../css/list.css';
import ListItem from './ListItem';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function List() {
  const session = await getServerSession(authOptions)
  const useremail = session.user.email
    let db = (await connectDB).db('store');
    let result = await db.collection('post').find().toArray();

    return (
        <div >
          <ListItem result={result} useremail={useremail}/>
        </div>
    
      )
    }