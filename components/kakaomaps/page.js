'use client'

import '../../css/kakaomap.css';
import React, { useEffect, useState } from 'react';

export default function KakaoMap() {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  let map; // 지도 객체
  let currentLocationMarker; // 현재 위치 마커

  const RESULTS_PER_PAGE = 10; // 페이지당 결과 수
  const MAX_PAGES = 4; // 최대 페이지 수
  let allRestaurants = []; // 모든 음식점 목록을 저장할 배열
  let restaurantMarkers = []; // 음식점 마커를 저장할 배열

  function handleRestaurantClick(restaurant) {
    setSelectedRestaurant(restaurant);
  }

  function handleNextPageClick() {
    if (currentPage < MAX_PAGES) {
      setCurrentPage(currentPage + 1);
    }
  }

  function handlePrevPageClick() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  useEffect(() => {
    const mapScript = document.createElement('script');
    mapScript.async = true;
    mapScript.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=028a4a45448e1a2f02652fee133dd3b7&autoload=false&libraries=services";
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

            function placesSearchCB(data, status, page) {
              if (status === kakao.maps.services.Status.OK) {
                allRestaurants = [...allRestaurants, ...data];

                if (page < MAX_PAGES) {
                  ps.keywordSearch('음식점', (data, status) => placesSearchCB(data, status, page + 1), {
                    page: page + 1,
                    radius: 500,
                    location: new kakao.maps.LatLng(latitude, longitude),
                  });
                } else {
                  setRestaurants(allRestaurants.slice((currentPage - 1) * RESULTS_PER_PAGE, currentPage * RESULTS_PER_PAGE));

                  // 지도에 음식점 마커 추가
                  restaurantMarkers = allRestaurants.map(restaurant => {
                    const marker = new kakao.maps.Marker({
                      position: new kakao.maps.LatLng(restaurant.y, restaurant.x),
                      map: map,
                    });

                    kakao.maps.event.addListener(marker, 'click', function () {
                      infowindow.setContent('<div style="padding:5px;font-size:12px;">' + restaurant.place_name + '</div>');
                      infowindow.open(map, marker);
                      setSelectedRestaurant(restaurant);
                    });

                    return marker;
                  });
                }
              }
            }

            ps.keywordSearch('음식점', (data, status) => placesSearchCB(data, status, 1), {
              page: 1,
              radius: 500,
              location: new kakao.maps.LatLng(latitude, longitude),
              category_group_code: 'FD6'
            });
          });
        } else {
          const mapOption = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: 3,
          };

          map = new window.kakao.maps.Map(mapContainer, mapOption);
        }
      });
    };

    mapScript.addEventListener('load', loadKakaoMap);
  }, [currentPage]);

  return (
    // <div>
    <div className='bg' >
      <div id="map"></div>
      <div className="list-container">
        <h2>주변 음식점 목록</h2>
        <ul>
          {restaurants.map((restaurant, index) => (
            <li onClick={() => handleRestaurantClick(restaurant)} key={index}>
              <button className="list-btn" onClick={() => handleRestaurantClick(restaurant)}>
                <span>{(currentPage - 1) * RESULTS_PER_PAGE + index + 1}</span>{restaurant.place_name}
              </button>
            </li>
          ))}
        </ul>
        <div className='page-btn'>
        {currentPage > 1 && (
          <button style={{background : '#03a9f4', color : 'white', fontSize : '16px'}} onClick={handlePrevPageClick}>◀️</button>
        )}
        {currentPage < MAX_PAGES && (
          <button style={{background : '#03a9f4', color : 'white', fontSize : '16px'}} onClick={handleNextPageClick}>▶️</button>
        )}
      </div>
      </div>

      {selectedRestaurant && (
        <div style={{width : '30%'}}>
          <h3>선택한 음식점</h3>
          <p>업체명 : {selectedRestaurant.place_name}</p>
          <p>지번 주소 : {selectedRestaurant.address_name}</p>
          <p>도로명 주소 : {selectedRestaurant.road_address_name}</p>
          <p>업체 전화번호 : {selectedRestaurant.phone}</p>
          <a href={selectedRestaurant.place_url} target="_blank">
            업체 상세페이지 : <span style={{color : '#03a9f4'}}>{selectedRestaurant.place_url}</span>
          </a>
        </div>
      )}
    </div>
    // </div>
  );
}
