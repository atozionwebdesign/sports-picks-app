import React, {useRef} from "react";

export const capitalizeFirstLetter = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const classNames = (...args) => {
  return args.filter(Boolean).join(" ");
};

export const formatDate = (utc) => {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const date = new Date(utc);
  const fDate = weekday[date.getDay()] + ", " + date.toLocaleString([],{ dateStyle: 'short', timeStyle: 'short' });
  return fDate;
};

export const onClickHeaderItem = (ref) => {

  if(ref.current){
    ref.current.scrollIntoView({behavior: "smooth"})
  }
};


export const isElementLoaded = async selector => {
  console.log(selector)
  while ( document.querySelector(selector) === null) {
    await new Promise( resolve =>  requestAnimationFrame(resolve) )
  }
  return document.querySelector(selector);
};