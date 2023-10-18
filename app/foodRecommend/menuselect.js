'use client'

import '../../css/recommend.css';
import { useState } from 'react';

export default function MenuSelector() {
  const [time, setTime] = useState('');
  const [category, setCategory] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [occasion, setOccasion] = useState('');
  const [menu, setMenu] = useState(''); // 추가: menu 상태
  
  async function fetchData() {
    
    try {
      const data = {
        time : time,
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
  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

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
    <div className='bg'>
    <div className='ml-100'>
    <div>
      <h3>시간대 :</h3>
    </div>
    <div className='container'>
          <input
            type="radio"
            id='morning'
            value="아침"
            name='time'
            checked={time === '아침'}
            onChange={handleTimeChange}
          />
          <label htmlFor='morning'>아침</label>
        
       
          <input
            type="radio"
            id='lunch'
            value="점심"
            name='time'
            checked={time === '점심'}
            onChange={handleTimeChange}
          />
          <label htmlFor='lunch'>점심</label>
      
       
          <input
            type="radio"
            id='evening'
            value="저녁"
            name='time'
            checked={time === '저녁'}
            onChange={handleTimeChange}
          />
          <label htmlFor='evening'>저녁</label>
          
        </div>
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
      <br></br>
      <button onClick={handleRecommendation} className='recommend-btn'>메뉴 추천</button>
      </div>

      <div className='recommendBtn-box'>
            
            <h3>추천 메뉴:</h3>
            <p>{menu}</p>
      </div>
  </div>
  );
}