import React from 'react'
import "./Style/review.css"

const Review = () => {
  return (
    <div className='Review_Container'>
      <div className='Review_TopBox'>
        <ul className='Review_Item'>
          <li>제품 명</li>
          <li>카테고리</li>
          <li>★★★★★</li>
        </ul>
        <div className='Review_MyTags'>
          내 태그 정보
        </div>
      </div>
      <div className='Review_Title'>
        <input type="text" className='textBox'/>
      </div>
      <div className='Review_TextBox'></div>
      <div className='Review_Submit'>
        <button>Submit</button>
        <button>Cancel</button>
      </div>
    </div>
  )
}

export default Review