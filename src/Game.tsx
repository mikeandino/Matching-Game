import { useEffect, useState } from "react";
import Card from "./Card"

type Props = {

}

type Cardlog = {
    num: number;
    isflipped: boolean;
    matched: boolean;
}

type Savedcard = {
    num: number;
    isflipped: boolean;
    x: number;
    y: number;
}

function Game() {
    
    const rows:number = 3;
    const cols:number = 4;
    const [cardgrid,setCardgird] = useState<Cardlog[][]>([]);
    const [currentcard,setCurrentcard] = useState<Savedcard>({num: -1, isflipped: false, x: -1, y:-1});
    const [matching, setMatching] = useState(false);
    const [timer, setTimer] = useState(false);

    function fillgrid(){
        const copy = [...cardgrid];
        const cards:number = (rows * cols)/2;
        const deck:{num:number,uses:number}[]=[];
        for (let index = 1; index <= cards; index++) {
            deck.push({num:index,uses:2});
        }
        for (let i = 0; i < rows; i++) {
            copy[i] = [];
            for (let j = 0; j < cols; j++) {
                let temp:number = Math.floor(Math.random() * cards);
                while (deck[temp].uses == 0) {
                    temp = Math.floor(Math.random() * cards);
                }
                copy[i][j] = {num:(temp + 1),isflipped:false, matched:false};
                deck[temp].uses = deck[temp].uses - 1;
            }
        }
        setCardgird(copy);

    }

    useEffect(() => {
        fillgrid();
    }, [])

    function handleClick(row:number, col:number) {
        const copy = [...cardgrid];
        if (matching && !copy[row][col].matched) {
            if(copy[row][col].num != currentcard.num){
                setTimer(true)
                copy[row][col]= {...copy[row][col], isflipped: true};
                setTimeout(() => {
                    copy[row][col]= {...copy[row][col], isflipped: false};
                    copy[currentcard.x][currentcard.y]= {...copy[currentcard.x][currentcard.y], isflipped: false};
                    setCurrentcard({num: -1, isflipped: false, x: -1, y:-1});
                    setTimer(false);
                }, 500);
            } else if ((row === currentcard.x) && (col === currentcard.y)) {
                copy[row][col]= {...copy[row][col], isflipped: false};
                setCurrentcard({num: -1, isflipped: false, x: -1, y:-1});
            }else {
                copy[row][col]= {...copy[row][col], isflipped: true, matched: true};
                copy[currentcard.x][currentcard.y]= {...copy[currentcard.x][currentcard.y], matched: true};
                setCurrentcard({num: -1, isflipped: false, x: -1, y:-1});
            }
            setMatching(false)
        } else if (!copy[row][col].matched){
            copy[row][col] = {...copy[row][col], isflipped: true};
            setMatching(true);
            setCurrentcard({num: copy[row][col].num, isflipped: copy[row][col].isflipped, x: row, y:col});
        }
        setCardgird(copy);
    }
    
    return (
      <>
        <div key="grid "className="container">
            {cardgrid.map((row,i) => {
                return (            
                    <>
                        <div key={"row:"+i} className="row">
                            {row.map((col,j) =>{
                                return (
                                    <div key={"col:"+j} className="col" onClick={() => { timer ? null : handleClick(i, j) }} >
                                        <Card key={"row:"+i+", col:"+j} num={col.num} flipped={col.isflipped}></Card>
                                    </div>
                                )
                            })}
                        </div> 
                    </>
                )
            })}
        </div>
      </>
    )
  }
  
  export default Game  