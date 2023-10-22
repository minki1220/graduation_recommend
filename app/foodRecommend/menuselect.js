'use client'

import '../../css/recommend.css';
import { useState } from 'react';

export default function MenuSelector() {
  const [time, setTime] = useState('');
  const [category, setCategory] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [occasion, setOccasion] = useState('');
  const [menu, setMenu] = useState(''); // 추가: menu 상태

  const timeOptions = [
    { id: 'morning', value: '아침', label: '아침' },
    { id: 'lunch', value: '점심', label: '점심' },
    { id: 'evening', value: '저녁', label: '저녁' },
  ];

  const categoryOptions = [
    { id: 'meal', value: '식사', label: '식사' },
    { id: 'cooking', value: '요리', label: '요리' },
    { id: 'snack', value: '간식', label: '간식' },
  ];

  const cuisineOptions = [
    { id: 'korean', value: '한식', label: '한식' },
    { id: 'chinese', value: '중식', label: '중식' },
    { id: 'western', value: '양식', label: '양식' },
    { id: 'japanese', value: '일식', label: '일식' },
    { id: 'asian', value: '아시아', label: '아시아' },
  ];

  const occasionOptions = [
    { id: 'alone', value: '혼밥', label: '혼밥' },
    { id: 'friend', value: '친구', label: '친구' },
    { id: 'couple', value: '연인', label: '연인' },
    { id: 'family', value: '가족', label: '가족' },
    { id: 'group', value: '모임', label: '모임' },
  ];

  async function fetchData() {
    try {
      const data = {
        time: time,
        category: category,
        cuisine: cuisine,
        occasion: occasion,
      };
      const response = await fetch('/api/post/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data1 = await response.json();

      setMenu(data1.menu);
      
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  const handleRadioChange = (event, setStateFunction) => {
    setStateFunction(event.target.value);
  };

  const handleRecommendation = () => {
    fetchData();
  };

  return (
    <div className='bg'>
      <div className='ml-100'>
        <div>
          <h3>시간대 :</h3>
        </div>
        <div className='container'>
          {timeOptions.map((option) => (
            <div key={option.id}>
              <input
                type='radio'
                id={option.id}
                value={option.value}
                name='time'
                checked={time === option.value}
                onChange={(event) => handleRadioChange(event, setTime)}
              />
              <label htmlFor={option.id}>{option.label}</label>
            </div>
          ))}
        </div>
        <div>
          <h3>카테고리 :</h3>
        </div>
        <div className='container'>
          {categoryOptions.map((option) => (
            <div key={option.id}>
              <input
                type='radio'
                id={option.id}
                value={option.value}
                name='category'
                checked={category === option.value}
                onChange={(event) => handleRadioChange(event, setCategory)}
              />
              <label htmlFor={option.id}>{option.label}</label>
            </div>
          ))}
        </div>
        <div>
          <h3>요리 종류 :</h3>
        </div>
        <div className='container'>
          {cuisineOptions.map((option) => (
            <div key={option.id}>
              <input
                type='radio'
                id={option.id}
                value={option.value}
                checked={cuisine === option.value}
                onChange={(event) => handleRadioChange(event, setCuisine)}
              />
              <label htmlFor={option.id}>{option.label}</label>
            </div>
          ))}
        </div>
        <div>
          <h3>식사 기회 :</h3>
        </div>
        <div className='container'>
          {occasionOptions.map((option) => (
            <div key={option.id}>
              <input
                type='radio'
                id={option.id}
                value={option.value}
                checked={occasion === option.value}
                onChange={(event) => handleRadioChange(event, setOccasion)}
              />
              <label htmlFor={option.id}>{option.label}</label>
            </div>
          ))}
        </div>
        <br />
        <button onClick={handleRecommendation} className='recommend-btn'>
          메뉴 추천
        </button>
      </div>

      <div className='recommendBtn-box'>
        <h3>추천 메뉴:</h3>
        <p>{menu}</p>
      </div>
    </div>
  );
}
