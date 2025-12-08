import React, { useState } from 'react'
import DOMPurify from 'dompurify'

const PostDetail = () => {
  const [post, setPost] = useState({
    id: "1",
    title:
      "ช่องบูมเมอแรง ได้ไปต่อ! MVTV Thailand ทุ่ม 200 ล้าน ให้เด็กไทยชมฟรีต่อเนื่อง",
    cover:
      "https://s.isanook.com/mv/0/ud/30/152539/boomerang.jpg?ip/crop/w1200h700/q80/webp",
    author: "sanook",
    createdAt: "2023-10-31",
    summary:
      "บริษัท เอ็มวีทีวี ไทยแลนด์ ทุ่มงบ 200 ล้าน ซื้อลิขสิทธิ์ช่องการ์ตูนดัง บูมเมอแรง (ฺBoomerang) เป็นของขวัญให้เด็กไทย ได้รับชมฟรีต่อเนื่อง หลังจากที่มีข่าวว่าช่อง บูมเมอแรง จะยุติการออกอากาศในวันที่ 1 กันยายน 2566 นี้ ในวันนี้ (31 ส.ค.) เฟซบุ๊กเพจ Boomerang Thailand แจ้งข่าวดีว่า บริษัท เอ็มวีทีวี ไทยแลนด์ ทุ่มงบ 200 ล้าน ซื้อลิขสิทธิ์ช่องการ์ตูนดัง บูมเมอแรง (ฺBoomerang) ให้เด็กไทยได้ชมกันอย่างต่อเนื่องฟรีๆ ต่อไปเรียบร้อยแล้ว",
  });
  return (
    <div>
      <div
        className="card card-side bg-base-100 shadow-sm overflow-hidden rounded-md max-md:grid max-md:grid-cols-1"
        key={post.id}
      >
        <div className="min-w-[400px] h-full object-cover">
          <img
            src={post.cover}
            alt="Movie"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="card-body">
          <h2 className="card-title">{post.title}</h2>
          <p>By {post.author}</p>
          <p> {post.createdAt}</p>
          <div className="card-actions justify-end"></div>
          <div className="content text-grey-700" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}></div>
        </div>
      </div>
    </div>
  );
};
export default PostDetail