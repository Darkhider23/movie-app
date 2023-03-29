import "./movie-page.css"
import React, { useEffect } from "react"
import axios from "axios";
import { useState } from "react";
const Moviepage = ({ data }) => {
    const [movieRating, setmovieRating] = useState();
    const [plot, setPlot] = useState();
    const [genre, setGenre] = useState([]);
    const [actorimg, setActorImg] = useState();
    const [buttontext, setButtonText] = useState('Add to my watchlist');
    useEffect(() => {
        setButtonText('Add to my watchlist');
        let titleid = '';
        if (data.id) {
            titleid = data.id;
            titleid = titleid.slice(7, titleid.length - 1);            
            //rating call
            {
                const rating_options = {
                    method: 'GET',
                    url: 'https://imdb8.p.rapidapi.com/title/get-ratings',
                    params: { tconst: titleid },
                    headers: {
                        'X-RapidAPI-Key': 'a8003c93e5mshcd18d73914e323dp1cb017jsn34c9d2a8d394',
                        'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
                    }
                };

                axios.request(rating_options).then(async (response) => {
                    const rat = await response.data;
                    console.log(rat.rating);
                    setmovieRating(rat.rating);

                }).catch(function (error) {
                    console.error(error);
                });
            }
            //plot call
            {
                const plot_options = {
                    method: 'GET',
                    url: 'https://imdb8.p.rapidapi.com/title/get-plots',
                    params: { tconst: titleid },
                    headers: {
                        'X-RapidAPI-Key': '6eb5ee05aamshf53aa2c30883a0bp14d696jsnd477cca6a087',
                        'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
                    }
                };

                axios.request(plot_options).then(async (response) => {
                    const plot = await response.data;
                    
                    setPlot(plot.plots[0].text);
                }).catch(function (error) {
                    console.error(error);
                });
            }
            //genre call
            {
                const genre_options = {
                    method: 'GET',
                    url: 'https://imdb8.p.rapidapi.com/title/get-genres',
                    params: { tconst: titleid },
                    headers: {
                        'X-RapidAPI-Key': '6eb5ee05aamshf53aa2c30883a0bp14d696jsnd477cca6a087',
                        'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
                    }
                };

                axios.request(genre_options).then(async (response) => {
                    const genre = await response.data;
                    setGenre(genre);
                }).catch(function (error) {
                    console.error(error);
                });
            }
        }
        else {
        }

    }, [data.id]);

    // function image_actor(actorid){
    //         actorid.slice(6, actorid.length - 1);
    //         const actor_image_options = {
    //             method: 'GET',
    //             url: 'https://imdb8.p.rapidapi.com/actors/get-bio',
    //             params: { nconst: actorid },
    //             headers: {
    //                 'X-RapidAPI-Key': '6eb5ee05aamshf53aa2c30883a0bp14d696jsnd477cca6a087',
    //                 'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
    //             }
    //         };

    //         axios.request(actor_image_options).then(async (response) => {
    //             const actorimg = await response.data;
    //             setActorImg(actorimg.image.url);
    //             // console.log(actorimg);
    //         }).catch(function (error) {
    //             console.error(error);
    //         });
    // }


    function buttonClick() {
        var checkmark = '✔';
        if (buttontext === 'Add to my watchlist') {
            setButtonText(checkmark);
        }
        else {
            setButtonText('Add to my watchlist');
        }
    }
    return (
        <>
            <div className="page-container">
                {data.length === 0 ? <div></div> :
                    <>
                        <div className="top-details">
                            <div className="top-left">
                                <img src={data.image.url} alt="" />
                            </div>
                            <div className="top-right">
                                <div className="title">{data.title}</div>
                                <div className="top-rating">
                                    <div className="value">	&#11088;{movieRating}
                                    </div>
                                </div>
                                <div className="top-details">

                                    {data.titleType ? <span className="type">{data.titleType}</span> : null}

                                    {data.seriesStartYear ? <span className="year">{data.seriesStartYear}{data.seriesEndYear ? <span className="year">-{data.seriesEndYear}</span> : null}</span> : null}

                                    {data.runningTimeInMinutes ? <span className="average-time">{data.runningTimeInMinutes}m</span> : null}
                                </div>
                                <div className="top-genre">
                                    {genre[0] ? <h3>{genre[0]}</h3> : null}
                                    {genre[1] ? <h3>{genre[1]}</h3> : null}
                                    {genre[2] ? <h3>{genre[2]}</h3> : null}
                                </div>
                                <button id="myAddbutton" onClick={buttonClick}>
                                    {buttontext}
                                </button>
                            </div>
                        </div>
                        <div className="middle">
                            <div className="plot-container">
                                <h1>
                                    Plot:
                                </h1>
                                <p>{plot}</p>
                            </div>
                            <div className="cast-container">
                                <h1>Cast</h1>
                                <p>
                                    {/* {image_actor(data.principals[0].id)}
                                    <img src={actorimg} alt="" height={100}/>
                                    {data.principals[0].name ? <span>{data.principals[0].name} <br/> {data.principals[0].roles[0].character}</span> : null}

                                    
                                    {data.principals[1].name ? <span>{data.principals[1].name} <br/> {data.principals[0].roles[0].character}</span> : null}

                                    
                                    {data.principals[2].name ? <span>{data.principals[2].name} <br/> {data.principals[0].roles[0].character}</span> : null} */}
                                </p>

                            </div>
                        </div>
                    </>
                }
            </div>
        </>
    );
};
export default Moviepage