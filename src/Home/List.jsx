import React, { Fragment, useState, useEffect, useRef } from 'react';
import './List.css';
import ListItem from './ListItem.jsx' 

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
      {
        list &&  list.content.length > 1? 
        <div 
        className='list-parent-container'

        >
        <h2
        className='list-title'
        >{list && list.title  } </h2>

      <div className="list-container">

        <a
        className='arrow-btns'
        onClick={() => scroll('left')}
        >
        &#8249;
        </a>
       
        <div ref={scrollContainerRef}  >
            {list && list.content.length > 1 ? list.content.map((item, index) => (
                <ListItem key={index} item={item} />
                )) : null
              } 
        </div>
        <a
        
        className='arrow-btns-2'
        onClick={() => scroll('right')}
        >
        &#8250;
        </a>
    </div>
            </div> : (
              null
            )
      }
        
    </Fragment>
  );
};

export default List;
