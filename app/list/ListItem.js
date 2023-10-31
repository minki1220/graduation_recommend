'use client'

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ListItem({ result, useremail }) {
  const [items, setItems] = useState(result);
  const router = useRouter();
  const listRef = useRef(null);

  const handleDelete = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  useEffect(() => {
    // 목록이 업데이트될 때마다 스크롤을 맨 위로 이동
    listRef.current.scrollTop = 0;
  }, [items]);

  return (
    <div className="bg">
      <div className="write-btn">
        <Link href="/write">
          <button>
            <span>글 작성하기</span>
          </button>
        </Link>
      </div>
      <div className="list-container" ref={listRef}>
        {items.map((a, i) => (
          <div className="list-box" key={i}>
            <div className="list-item">
              <a
                href={'/detail/' + items[i]._id}
                onClick={() => {
                  router.prefetch();
                }}
              >
                {items[i].title}
                <p>
                  {a.dateTime}
                  <span style={{ marginLeft: '20px' }}>작성자 - {a.author}</span>
                </p>
              </a>
              <div className="list-btn">
                {useremail === a.author ? (
                  <>
                    <a
                      href={'/edit/' + items[i]._id}
                      onClick={() => {
                        router.prefetch();
                      }}
                    >
                      ✏️
                    </a>
                    <button
                      onClick={() => {
                        fetch('/api/post/delete', {
                          method: 'DELETE',
                          body: items[i]._id,
                        })
                          .then((r) => {
                            if (r.status === 200) {
                              handleDelete(i);
                            }
                          })
                          .catch((error) => {
                            console.log(error);
                          });
                      }}
                    >
                      🗑️
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
