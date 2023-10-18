'use client'

import '../../css/kakaomap.css';
import React, { useEffect, useState } from 'react';

export default function KakaoMap() {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  let map; // 지도 객체
  let currentLocationMarker; // 현재 위치 마커

  function handleRestaurantClick(restaurant) {
    setSelectedRestaurant(restaurant);
  }


  useEffect(() => {
    const mapScript = document.createElement('script');
    mapScript.async = true;
    mapScript.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=028a4a45448e1a2f02652fee133dd3b7&autoload=false&libraries=services";
    document.head.appendChild(mapScript);

    const loadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById('map');

        // 현재 위치 가져오기
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
            let searchOptions = {
              location: new kakao.maps.LatLng(latitude, longitude),
              // radius: 1000,
            };
            
            
            ps.keywordSearch('음식점', placesSearchCB, searchOptions);

            function placesSearchCB(data, status) {
              if (status === kakao.maps.services.Status.OK) {
                setRestaurants(data);
                for (let i = 0; i < data.length; i++) {
                  displayMarker(data[i]);    
                }       
              }
            }

            function displayMarker(place) {
              let marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(place.y, place.x) 
              });

              kakao.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
                infowindow.open(map, marker);
                setSelectedRestaurant(place); // 선택한 음식점 정보를 저장
              });
            }
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
  }, []);

  return (
    <div>
      <div id="map"></div>
      
      <div className="list-container">
        <h2>주변 음식점 목록</h2>
        <ul>
        
          {restaurants.map((restaurant, index) => (
            <li onClick={() => handleRestaurantClick(restaurant)} key={index} >
              <button className="list-btn" onClick={() => handleRestaurantClick(restaurant)}>
                <span>{index + 1}</span>{restaurant.place_name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {selectedRestaurant && (
        <div style={{marginTop : '80px',
                     marginLeft : '50px',
                     marginRight : '200px'}}>
          <h3>선택한 음식점</h3>
          <p>{selectedRestaurant.place_name}</p>
          <p>{selectedRestaurant.address_name}</p>
          <p>{selectedRestaurant.phone}</p>
          <p>{selectedRestaurant.operating_hours}</p>
        </div>
      )}
    </div>
  );
}
