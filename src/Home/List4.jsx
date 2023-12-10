import React, { Fragment, useState, useEffect, useRef } from 'react';
import './List.css';
import ListItem4 from './ListItem4.jsx' 

const List = ({ list }) => {
  const scrollContainerRef = useRef(null);
  const scroll = (direction) => {
      const container = scrollContainerRef.current;
      const scrollAmount = 700; // Adjust the scroll amount as needed

      console.log(list,'ok') 

      if (container) {
          if (direction === 'left') {
              container.scrollLeft -= scrollAmount;
          } else {
              container.scrollLeft += scrollAmount;
          }
      }
  };


  return (
    <Fragment>
        <div 
        className='list-parent-container'
        >
        <h2
        className='list-title'
        >{list?.title} </h2>

      <div className="list-container">

        <a
        className='arrow-btns'
        onClick={() => scroll('left')}
        >
        &#8249;
        </a>
       
        <div ref={scrollContainerRef}  >
            {list && list.content.map((item, index) => (
                <ListItem4 key={index} item={item} />
                ))}
        </div>
        <a
        
        className='arrow-btns-2'
        onClick={() => scroll('right')}
        >
        &#8250;
        </a>
    </div>
            </div>
    </Fragment>
  );
};

export default List;
