import React from 'react'
import "./Aboutus.css"
import Amy from "./IMG_1465_jpg.JPG"
import Kerry from "./20210608_174911.jpg"
import Sara from "./image.png"
import Ash from "./ash.jpeg"

export default function Aboutus() {
  return (
    <div className='wrapper'>
            <div className='title'>
                <h1 className='title2'>About Us</h1>
            </div>
            <div className='team'>
            <div className='team_member'>
                <div className='team_img'>
                    <img className='team_img1' src={Amy}></img>
                </div>
            <h3 className='usertitle'>Amy</h3>
            <p className='role '>A total crack! Since the beginning of the bootcamp she has shown her consistency and effort! She has taught us many things and cares that we are all well, Amy knows the value of hard work and perseverance, she has what it takes to be a full stack developer.</p>
            </div>

            <div className='team_member'>
            <div className='team_img'>
                    <img className='team_img2' src={Kerry}></img>
                </div>
            <h3 className='usertitle'>Kerry</h3>
            <p className='role '>The sweetest of all! That person who is always there with a positive word, with a feeling of encouragement! With her great effort she has managed to overcome all the obstacles along the way, she is definitely an example for her son of perseverance and effort! She has a long road ahead of her.</p>
            </div>

            <div className='team_member'>
            <div className='team_img'>
                    <img className='team_img3' src={Sara}></img>
                </div>
            <h3 className='usertitle'>Sara</h3>
            <p className='role '>Ole Ole!! The most curious and charming Spanish girl! From the beginning, she has always shown tenacity, curiosity to learn and understand each concept, she has always sought that we are all well and that we go at a considerable rhythm. She is an admirable woman, a total programmer.</p>
            </div>

            <div className='team_member'>
            <div className='team_img'>
                    <img className='team_img4' src={Ash}></img>
                </div>
            <h3 className='usertitle'>Ashley</h3>
            <p className='role '>A Colombian with an immense heart, always willing to learn, to give her best, although she often does not understand what she is doing, in the end she always manages to reach the goal, her perseverance and effort is what makes her a promise of programming.</p>
            </div>
            </div>
        </div>
  )
}
