import React from 'react';



export default function Comment(props){
  const {title, description, imgUrl, _id} = props

  return (
    <div>
      <h1>{title}</h1>
      <h3>{description}</h3>
      <img src={imgUrl} alt={imgUrl} width={300}/>
    </div>
  );

}