'use client'

import { signOut } from 'next-auth/react';

export function LogOutBtn() {
  const handleLogout = async () => {
    await signOut();
    window.location.href = '/'; // "/"로 리디렉션
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
      marginLeft: '10px'
    }}>LogOut</button>
  );
}
