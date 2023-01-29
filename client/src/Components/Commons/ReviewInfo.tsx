import React from 'react'
import "../Style/reviewInfo.css"

interface PropsType{
  reviewId : number
}

const ReviewInfo = ({reviewId} : PropsType) => {
  return (
    <div className='ReviewInfo_Container'>
      {reviewId}
    </div>
  )
}

export default ReviewInfo