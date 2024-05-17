import { useEffect } from 'react'
import '../styles/Card.css'

type CardProp = {
    num: number;
    flipped: boolean;
    matched: boolean;
};

function Card({num, flipped, matched}: CardProp) {
  


    useEffect(() =>{

    }, [flipped])

    return (
      <>
        <div className={flipped ? 'tile clicked' : 'tile'} >
            <div className="tile-inner">
                <div className="tile-front">
                    <p>?</p>
                </div>
                <div className={ matched ? "tile-back matched" : "tile-back"}>
                    <p>{(num !== -1) ? num : "X"}</p>
                </div>
            </div>
        </div>
      </>
    )
  }
  
  export default Card  