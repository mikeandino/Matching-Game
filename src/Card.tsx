import { useState } from 'react'
import './Card.css'

type CardProp = {
    num: number;
};

function Card({num}: CardProp) {
  
    const [clicked, setClicked] = useState(false);

    const isClicked = () => {
        setClicked(!clicked);
    }

    return (
      <>
        <div className={clicked ? 'tile clicked' : 'tile'} onClick={isClicked}>
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