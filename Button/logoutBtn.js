'use client'

import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

export function LogOutBtn() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <button onClick={handleLogout} style={{
      border: '2px solid black',
      backgroundColor: '#fff',
      marginRight: '5px',
      fontSize: '16px',
      cursor: 'pointer',
      fontWeight: 'bold',
      borderRadius: '2em',
      padding: '1em 2em',
      marginLeft: '20px'
    }}>LogOut</button>
  );
}
