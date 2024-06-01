import { useEffect, useState } from 'react'
import '../styles/Card.css'

type CardProp = {
    num: number;
    flipped: boolean;
    matched: boolean;
    onClick: () => void;
};

function Card({ num, flipped, matched, onClick }: CardProp) {
    const [active, setActive] = useState<boolean>(true)
    const [animation, setAnimation] = useState<boolean>(flipped)

    useEffect(() => {
        setActive(false);
        if(flipped)
            setAnimation(flipped);
        else {
            setTimeout(() => {
                setAnimation(flipped);
            }, 500);
        }
        setTimeout(() => {
            setActive(true); 
        }, 500);
    }, [flipped])

    return (
        <>
            <div className={"tile" + (flipped ? " clicked" : '')} onClick={()=> {if(active) onClick() }} >
                <div className="tile-inner">
                    <div className="tile-front">
                        <p>?</p>
                    </div>
                    <div className={"tile-back" + (matched ? " matched" : "")}>
                        {animation
                            ? <p>{(num !== -1) ? num : "X"}</p>
                            : "¿"
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card  