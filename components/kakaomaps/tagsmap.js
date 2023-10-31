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

  const RESULTS_PER_PAGE = 10; // 페이지당 결과 수

  function handleRestaurantClick(restaurant) {
    setSelectedRestaurant(restaurant);
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
