import React from 'react'
import { useParams } from 'react-router-dom';

function Assignment() {
    let title = useParams();
  return (
    <div>
      This is Assignment Component
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti dignissimos fugit voluptatum. Maxime, quia fuga animi sequi dolor nostrum sint error veritatis perspiciatis voluptate laboriosam aspernatur saepe eaque ab, beatae asperiores similique quam consequuntur iure illum aperiam dicta rerum soluta deleniti? Amet qui vel fuga maxime saepe laborum veniam architecto.
    </div>
  )
}

export default Assignment
