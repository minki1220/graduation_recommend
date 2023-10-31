'use client'

import '../../css/kakaomap.css';

import React, { useEffect, useState } from 'react';

export default function KakaoMap() {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [Tag, setTag] = useState('');
  let map; // 지도 객체
  let currentLocationMarker; // 현재 위치 마커
  const [starClicked, setStarClicked] = useState(false); // 별 모양 버튼 클릭 상태
  const [favoriteRestaurants, setFavoriteRestaurants] = useState([]); // 중복 저장을 방지할 목록

  const RESULTS_PER_PAGE = 10; // 페이지당 결과 수

  function handleRestaurantClick(restaurant) {
    setSelectedRestaurant(restaurant);
    // 별 모양 버튼 클릭 상태 설정
    setStarClicked(restaurant.isFavorite);
  }

  function handleNextPageClick() {
    if (currentPage < Math.ceil(restaurants.length / RESULTS_PER_PAGE)) {
      setCurrentPage(currentPage + 1);
    }
  }
  function handlePrevPageClick() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  function handleFavoriteClick(restaurant) {
    if (restaurant) {
      const isAlreadyFavorited = favoriteRestaurants.some(
        (r) => r.place_name === restaurant.place_name
      );

      if (isAlreadyFavorited) {
        console.log('이미 즐겨찾기에 추가된 음식점입니다.');
      } else {
        // 업체명과 업체 상세페이지 URL을 가져옵니다.
        const restaurantName = restaurant.place_name;
        const restaurantPageUrl = restaurant.place_url;

        // 즐겨찾기 상태를 토글합니다.
        const updatedRestaurant = { ...restaurant };
        updatedRestaurant.isFavorite = !restaurant.isFavorite;

        // 업데이트된 음식점을 찾아서 교체합니다.
        const updatedRestaurants = restaurants.map((r) =>
          r.place_name === restaurantName ? updatedRestaurant : r
        );
        setRestaurants(updatedRestaurants);

        // 즐겨찾기 별 아이콘 클릭 상태를 변경합니다.
        setStarClicked(!restaurant.isFavorite);

        // 음식점을 중복 저장을 방지도록 목록에 추가합니다.
        setFavoriteRestaurants([...favoriteRestaurants, restaurant]);

        // HTTP POST 요청을 생성합니다.
        fetch('/api/post/favorite', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ restaurantName, restaurantPageUrl }),
        })
          .then((response) => {
            if (response.status === 200) {
              // 즐겨찾기가 성공적으로 추가되었을 때의 처리를 여기에 추가할 수 있습니다.
              console.log('즐겨찾기가 추가되었습니다.');
            } else {
              // 요청이 실패했을 때의 처리를 여기에 추가할 수 있습니다.
              console.error('요청이 실패했습니다.');
            }
          })
          .catch((error) => {
            console.error('오류 발생:', error);
          });
      }
    }
  }
  useEffect(() => {
    fetch('/api/get/gettags')
      .then((r) => r.json())
      .then((result) => {
        setTag(result);
      });
  }, []);

  useEffect(() => {
    const mapScript = document.createElement('script');
    mapScript.async = true;
    mapScript.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=028a4a45448e1a2f02652fee133dd3b7&autoload=false&libraries=services";
    document.head.appendChild(mapScript);

    const loadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById('map');
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const mapOption = {
              center: new window.kakao.maps.LatLng(latitude, longitude),
              level: 3,
            };
            map = new window.kakao.maps.Map(mapContainer, mapOption);
            currentLocationMarker = new window.kakao.maps.Marker({
              position: new window.kakao.maps.LatLng(latitude, longitude),
              map: map,
            });
            let ps = new kakao.maps.services.Places(map);
            let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

            ps.keywordSearch(
              Tag,
              (data, status) => {
                if (status === kakao.maps.services.Status.OK) {
                  setRestaurants(data);
                  // 지도에 음식점 마커 추가
                  data.forEach((restaurant) => {
                    const marker = new kakao.maps.Marker({
                      position: new kakao.maps.LatLng(restaurant.y, restaurant.x),
                      map: map,
                    });

                    kakao.maps.event.addListener(marker, 'click', function () {
                      infowindow.setContent(
                        '<div style="padding:5px;font-size:12px;">' +
                        restaurant.place_name +
                        '</div>'
                      );
                      infowindow.open(map, marker);
                      setSelectedRestaurant(restaurant);
                    });
                  });
                }
              },
              {
                page: 1,
                size: 15,
                radius: 1000,
                location: new kakao.maps.LatLng(latitude, longitude),
              }
            );
          });
        } else {
          const mapOption = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: 3,
          };

          map = window.kakao.maps.Map(mapContainer, mapOption);
        }
      });
    };

    mapScript.addEventListener('load', loadKakaoMap);
  }, [Tag]);

  return (
    <div className="bg">
      <div id="map"></div>
      <div className="list-container">
        <h2>주변 음식점 목록</h2>
        <ul>
          {restaurants.length > 0 ? (
            restaurants
              .slice((currentPage - 1) * RESULTS_PER_PAGE, currentPage * RESULTS_PER_PAGE)
              .map((restaurant, index) => (
                <li onClick={() => handleRestaurantClick(restaurant)} key={index}>
                  <button className="list-btn" onClick={() => handleRestaurantClick(restaurant)}>
                    <span>{(currentPage - 1) * RESULTS_PER_PAGE + index + 1}</span>
                    {restaurant.place_name}
                  </button>
                  
                  <button
                   className={`favorite-btn ${restaurant.isFavorite ? 'checked' : 'empty-star'}`}
                   onClick={() => handleFavoriteClick(restaurant)}>
                   ★
                  </button>
                 
                </li>
              ))
          ) : (
            <p>음식점 목록이 로딩중입니다.</p>
          )}
        </ul>
        
        <div className="page-btn">
          {currentPage > 1 && (
            <button style={{background : '#03a9f4', color : 'white'}} onClick={handlePrevPageClick}>◀️</button>
          )}
          {currentPage < Math.ceil(restaurants.length / RESULTS_PER_PAGE) && (
            <button style={{background : '#03a9f4', color : 'white'}} onClick={handleNextPageClick}>▶️</button>
          )}
        </div>
      </div>

      {selectedRestaurant && (
        <div style={{ width: '30%' }}>
          <h3>선택한 음식점</h3>
          <p>업체명 : {selectedRestaurant.place_name}</p>
          <p>지번 주소 : {selectedRestaurant.address_name}</p>
          <p>도로명 주소 : {selectedRestaurant.road_address_name}</p>
          <p>업체 전화번호 : {selectedRestaurant.phone}</p>
          <a href={selectedRestaurant.place_url} target="_blank">
            업체 상세페이지 : {selectedRestaurant.place_url}
          </a>
        </div>
      )}
    </div>
  );
}
