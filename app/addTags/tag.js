'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import "../../css/tags.css";

export default function Tags() {
  const [selectedTag, setSelectedTag] = useState('');
  const router = useRouter();

  const tags = [
    { id: 'pighocks', value: '족발', label: '#족발' },
    { id: 'stew', value: '찌개', label: '#찌개' },
    { id: 'lunchbox', value: '도시락', label: '#도시락' },
    { id: 'asian', value: '아시안', label: '#아시안' },
    { id: 'schoolfood', value: '분식', label: '#분식' },
    { id: 'pizza', value: '피자', label: '#피자' },
    { id: 'chicken', value: '치킨', label: '#치킨' },
    { id: 'porkcutlet', value: '돈까스', label: '#돈까스' },
    { id: 'rawfish', value: '회', label: '#회' },
    { id: 'pork', value: '돼지고기', label: '#고기' },
    { id: 'western', value: '양식', label: '#양식' },
    { id: 'chinese', value: '중식', label: '#중식' },
    { id: 'korean', value: '한식', label: '#한식' },
    { id: 'japanese', value: '일식', label: '#일식' },
    { id: 'hamburger', value: '햄버거', label: '#햄버거' },
    { id: 'dessert', value: '디저트', label: '#디저트' },
    { id: 'cafe', value: '카페', label: '#카페' },
    { id: 'side dish', value: '반찬', label: '#반찬' },
  ];

  const handleRadioChange = (event, setStateFunction) => {
    setStateFunction(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedTag) {
      console.log("선택된 tag:", selectedTag);
      try {
        const response = await fetch('/api/post/addtags', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ tags: [selectedTag] }),
        });

        if (response.ok) {
          router.push("/tagsMap");
        } else {
          console.error('서버 응답 오류');
        }
      } catch (error) {
        console.error('서버 요청 중 오류:', error);
      }
    } else {
      console.warn('태그를 선택하세요.');
    }
  };

  return (
    <div className='bg'>
      <div className='ml-100'>
        <div>
          <h3 className="h3">원하는 해시태그를 하나 선택해주세요!</h3>
        </div>
        <div className='container'>
          <div className='tag-grid'>
            {tags.map((option) => (
              <div key={option.id}>
                <input
                  type='radio'
                  id={option.id}
                  value={option.value}
                  name='tags'
                  checked={selectedTag === option.value}
                  onChange={(event) => handleRadioChange(event, setSelectedTag)}
                />
                <label htmlFor={option.id}>{option.label}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="recommend-box">
        <input onClick={handleSubmit} type="submit" value="검색" className='recommend-btn' />
        </div>
      </div>
    </div>
  );
}
