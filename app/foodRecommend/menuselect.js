'use client'

import { useState } from 'react';

export default function MenuSelector() {
  const [category, setCategory] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [occasion, setOccasion] = useState('');
  const [menu, setMenu] = useState(''); // 추가: menu 상태
  
  async function fetchData() {
    
    try {
      const data = {
        category : category,
        cuisine : cuisine,
        occasion : occasion,
      }
      const response = await fetch('/api/post/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data1 = await response.json();
  
      setMenu(data1.menu);
      console.log(data1.menu);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleCuisineChange = (event) => {
    setCuisine(event.target.value);
  };

  const handleOccasionChange = (event) => {
    setOccasion(event.target.value);
  };

  const handleRecommendation = () => {
    fetchData()
  }

  return (
    <div>
      <div>
        <h3>카테고리 선택:</h3>
        
        <label>
          <input
            type="radio"
            value="식사"
            checked={category === '식사'}
            onChange={handleCategoryChange}
          />
          식사
        </label>
        <label>
          <input
            type="radio"
            value="요리"
            checked={category === '요리'}
            onChange={handleCategoryChange}
          />
          요리
        </label>
        <label>
          <input
            type="radio"
            value="간식"
            checked={category === '간식'}
            onChange={handleCategoryChange}
          />
          간식
        </label>
      </div>
      <div>
        <h3>요리 종류 선택:</h3>
        <label>
          <input
            type="radio"
            value="한식"
            checked={cuisine === '한식'}
            onChange={handleCuisineChange}
          />
          한식
        </label>
        <label>
          <input
            type="radio"
            value="중식"
            checked={cuisine === '중식'}
            onChange={handleCuisineChange}
          />
          중식
        </label>
        <label>
          <input
            type="radio"
            value="양식"
            checked={cuisine === '양식'}
            onChange={handleCuisineChange}
          />
          양식
        </label>
        <label>
          <input
            type="radio"
            value="일식"
            checked={cuisine === '일식'}
            onChange={handleCuisineChange}
          />
          일식
        </label>
        <label>
          <input
            type="radio"
            value="아시아"
            checked={cuisine === '아시아'}
            onChange={handleCuisineChange}
          />
          아시아
        </label>
      </div>
      <div>
        <h3>식사 기회 선택:</h3>
        <label>
          <input
            type="radio"
            value="혼밥"
            checked={occasion === '혼밥'}
            onChange={handleOccasionChange}
          />
          혼밥
        </label>
        <label>
          <input
            type="radio"
            value="친구"
            checked={occasion === '친구'}
            onChange={handleOccasionChange}
          />
          친구
        </label>
        <label>
          <input
            type="radio"
            value="연인"
            checked={occasion === '연인'}
            onChange={handleOccasionChange}
          />
          연인
        </label>
        <label>
          <input
            type="radio"
            value="가족"
            checked={occasion === '가족'}
            onChange={handleOccasionChange}
          />
          가족
        </label>
        <label>
          <input
            type="radio"
            value="모임"
            checked={occasion === '모임'}
            onChange={handleOccasionChange}
          />
          모임
        </label>
      </div>
      <div>
            <button onClick={handleRecommendation}>메뉴 추천</button>
            <h3>추천 메뉴:</h3>
            <p>{menu}</p>
      </div>
    </div>
  );
}