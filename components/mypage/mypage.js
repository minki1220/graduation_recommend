'use client'

import "../../css/mypage.css"

import { useState } from 'react';


export default function MyPage({ result, session }) {
  // const [favorites, setFavorites] = useState(result.favorites);
 
  // const handleDeleteFavorite = (favorite) => {
  //   fetch('/api/post/favoritedelete', {
  //     method: 'DELETE',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(favorite),
  //   })
  //     .then((r) => {
  //       if (r.status === 200) {
  //         return r.json();
  //       } else {
  //         throw new Error('삭제 실패');
  //       }
  //     })
  //     .then(() => {
  //       // 삭제된 요소를 화면에서 제거
  //       const updatedFavorites = favorites.filter(
  //         (fav) =>
  //           fav.restaurantName !== favorite.restaurantName ||
  //           fav.restaurantPageUrl !== favorite.restaurantPageUrl
  //       );
  //       setFavorites(updatedFavorites);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  return (
    <div className="bg">
      <div>
      {/* 유저 이미지 넣을 곳 */}
      <span>{session.user.name}</span>
      <br></br>
      <span>{session.user.email}</span>
      </div>

      {/* 즐겨찾기 목록 */}
      <div className="favorite-box">
        <div>
          <h4>즐겨찾기 목록</h4>
        </div>
        {/* <div className="favorite-ullist">
          {favorites.length > 0 ? (
            favorites.map((favorite, index) => (
              <div className="favorite-list"key={index}>
                <a href={favorite.restaurantPageUrl}>
                  <span> {favorite.restaurantName}</span>
                </a>
                
                <button onClick={() => handleDeleteFavorite(favorite)}>🗑️</button>
              </div>
            ))
          ) : (
            <p>즐겨찾기 목록이 비어 있습니다.</p>
          )}
        </div> */}
      </div>
    </div>
  );
}
