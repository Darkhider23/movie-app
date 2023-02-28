import "./movie-page.css"
import React, { useEffect } from "react"
import axios from "axios";
import { useState } from "react";
const Moviepage = ({ data }) => {
    const [movieRating,setmovieRating] = useState();
    useEffect(()=>{
        let titleid='';
        if(data.id){
        titleid = data.id;
        console.log(typeof titleid);
        console.log(typeof data.id);
        titleid = titleid.slice(7,titleid.length-1);
        console.log(titleid);
    }
    else{
        console.log("not id");
    }
    const options = {
        method: 'GET',
        url: 'https://imdb8.p.rapidapi.com/title/get-ratings',
        params: {tconst: titleid},
        headers: {
          'X-RapidAPI-Key': 'a8003c93e5mshcd18d73914e323dp1cb017jsn34c9d2a8d394',
          'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
        }
      };
      
      axios.request(options).then(async (response)=> {
          const rat = await response.data;
          console.log(rat.rating);
          setmovieRating(rat.rating);

      }).catch(function (error) {
          console.error(error);
      });
    },[]);
    return (
        
        <div className="page-container">
            <div className="top-left">
                <div className="title">{data.title}</div>
                <div className="top-left-sub">
                    <span>-</span>
                    <span className="type">{data.titleType}</span>
                    <span>-</span>
                    <span className="year">{data.seriesStartYear}-{data.seriesEndYear}</span>
                    <span>-</span>
                    <span className="average-time">{data.runningTimeInMinutes}m</span>
                    <span>-</span>
                </div>

            </div>
            <div className="top-right">
                <div className="rating">
                    <div className="label">Rating</div>
                    <div className="value">	&#11088;{movieRating}</div>
                </div>
            </div>
        </div>
    );
};
export default Moviepage