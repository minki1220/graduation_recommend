'use client'
import { useState } from "react";

export default function Write() {
  let [src, setSrc] = useState('');
  let [title, setTitle] = useState('');
  let [content, setContent] = useState('');

  const handleFileChange = async (e) => {
    let file = e.target.files[0];
    let filename = encodeURIComponent(file.name);
    let res = await fetch('/api/post/image?file=' + filename);
    res = await res.json();

    // S3 업로드
    const formData = new FormData();
    Object.entries({ ...res.fields, file }).forEach(([key, value]) => {
      formData.append(key, value);
    });
    let 업로드결과 = await fetch(res.url, {
      method: 'POST',
      body: formData,
    });

    if (업로드결과.ok) {
      const imageURL = 업로드결과.url + '/' + filename;
      setSrc(imageURL);
    } else {
      console.log('실패');
    }
  };

  const handleSubmit = async () => {
    // 이미지 URL, 제목(title), 내용(content) 서버로 보내기
    const data = {
      title,
      content,
      imageURL: src,
    };

    const response = await fetch('/api/post/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      // 서버에서 리디렉션 URL을 보내면 클라이언트에서 이동
      const result = await response.json();
      if (result.redirect) {
        window.location.href = result.redirect;
      } else {
        console.log('서버에서 올바른 리디렉션 URL을 제공하지 않았습니다.');
      }
    } else {
      console.log('데이터 전송 실패');
    }
  };

  return (
    <div className="bg">
      <h4>글작성</h4>
        <input
          name="title"
          placeholder="글제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          name="content"
          placeholder="글내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit}>
          전송
        </button>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <img style={{ width: '200px', height: '200px' }} src={src} />
    </div>
  );
}
