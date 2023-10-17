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
    <div className='ml-100'>
      <div>
        
        <h3>카테고리 :</h3>

      </div>
          <div className='container'>
          <input
            type="radio"
            id='meal'
            value="식사"
            name='category'
            checked={category === '식사'}
            onChange={handleCategoryChange}
          />
          <label htmlFor='meal'>식사</label>
        
       
          <input
            type="radio"
            id='cooking'
            value="요리"
            name='category'
            checked={category === '요리'}
            onChange={handleCategoryChange}
          />
          <label htmlFor='cooking'>요리</label>
      
       
          <input
            type="radio"
            id='snack'
            value="간식"
            name='category'
            checked={category === '간식'}
            onChange={handleCategoryChange}
          />
          <label htmlFor='snack'>간식</label>
          
        </div>
      
     
      <div>
        <h3>요리 종류 :</h3>
      </div>

        <div className='container'>
          <input
            type="radio"
            id='korean'
            value="한식"
            checked={cuisine === '한식'}
            onChange={handleCuisineChange}
          />
          <label htmlFor='korean'>한식</label>
       
        
          <input
            type="radio"
            id='chinese'
            value="중식"
            checked={cuisine === '중식'}
            onChange={handleCuisineChange}
          />
          <label htmlFor='chinese'>중식</label>
        
        
          <input
            type="radio"
            id='western'
            value="양식"
            checked={cuisine === '양식'}
            onChange={handleCuisineChange}
          />
          <label htmlFor='western'>양식</label>
        
          <input
            type="radio"
            id='japanese'
            value="일식"
            checked={cuisine === '일식'}
            onChange={handleCuisineChange}
          />
          <label htmlFor='japanese'>일식</label>
       
       
          <input
            type="radio"
            id='asian'
            value="아시아"
            checked={cuisine === '아시아'}
            onChange={handleCuisineChange}
          />
          <label htmlFor='asian'>아시아</label>
       
      </div>


      <div>
        <h3>식사 기회 :</h3>
      </div>

        <div className='container'>
          <input
            type="radio"
            id='alone'
            value="혼밥"
            checked={occasion === '혼밥'}
            onChange={handleOccasionChange}
          />
          <label htmlFor='alone'>혼밥</label>
       
        
          <input
            type="radio"
            id='friend'
            value="친구"
            checked={occasion === '친구'}
            onChange={handleOccasionChange}
          />
          <label htmlFor='friend'>친구</label>
        
          <input
            type="radio"
            id='couple'
            value="연인"
            checked={occasion === '연인'}
            onChange={handleOccasionChange}
          />
          <label htmlFor='couple'>커플</label>
        
          <input
            type="radio"
            id='family'
            value="가족"
            checked={occasion === '가족'}
            onChange={handleOccasionChange}
          />
          <label htmlFor='family'>가족</label>
        
          <input
            type="radio"
            id='group'
            value="모임"
            checked={occasion === '모임'}
            onChange={handleOccasionChange}
          />
          <label htmlFor='group'>모임</label>
        
      </div>

      <div>
            <button onClick={handleRecommendation} className='recommend-btn'>메뉴 추천</button>
            <h3>추천 메뉴:</h3>
            <p>{menu}</p>
      </div>
    </div>
  </div>
  );
}