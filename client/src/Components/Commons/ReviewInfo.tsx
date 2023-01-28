import React, { useEffect } from 'react'
import { getReviewInfo } from '../../API/Review';
import "../Style/reviewInfo.css"

interface PropsType{
  reviewId : number
}

const ReviewInfo = ({reviewId} : PropsType) => {
  useEffect(() => {
    getReviewInfo(reviewId).then(res => {
      console.log(res);
    })
  }, []);
  return (
    <div className='ReviewInfo_Container'>
      {reviewId}
    </div>
  )
}

export default ReviewInfo