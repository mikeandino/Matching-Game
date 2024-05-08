import { useEffect } from 'react'
import './Card.css'

type CardProp = {
    num: number;
    flipped: boolean;
};

function Card({num, flipped}: CardProp) {
  


    useEffect(() =>{

    }, [flipped])

    return (
      <>
        <div className={flipped ? 'tile clicked' : 'tile'} >
            <div className="tile-inner">
                <div className="tile-front">
                    <p>?</p>
                </div>
                <div className="tile-back">
                    <p>{num}</p>
                </div>
            </div>
        </div>
      </>
    )
  }
  
  export default Card  