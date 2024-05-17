import { useEffect, useRef, useState } from "react";
import Card from "./Card"
import "bootstrap/dist/css/bootstrap-grid.css";

type BoardProps = {
    rows: number;
    cols: number;
    gamewin: ()=>void;
    gamelose: ()=>void;
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

function Board({rows, cols, gamewin, gamelose}: BoardProps) {
    const total:number = (!((rows * cols) % 2) ? (rows * cols)/2 :((rows * cols)/2 - .5));
    const [cardgrid,setCardgird] = useState<Cardlog[][]>([]);
    const [currentcard,setCurrentcard] = useState<Savedcard>({num: -1, isflipped: false, x: -1, y:-1});
    const [matching, setMatching] = useState(false);
    const [timer, setTimer] = useState(false);
    const matches = useRef(0);
    //const [victory, setVictory] = useState(false);
    
    useEffect(() => {
        fillgrid();
    }, [])

    function fillgrid(){
        const copy = [...cardgrid];
        const deck:{num:number,uses:number}[]=[];
        if ((rows * cols) % 2) {
            deck.push({num: -1, uses: 1})
        }
        for (let index = 1; index <= total; index++) {
            deck.push({num:index,uses:2});
        }
        for (let i = 0; i < rows; i++) {
            copy[i] = [];
            for (let j = 0; j < cols; j++) {
                let temp:number = Math.floor(Math.random() * deck.length);
                while (deck[temp].uses == 0) {
                    temp = Math.floor(Math.random() * deck.length);
                }
                copy[i][j] = {num:(deck[temp].num),isflipped:false, matched:false};
                deck[temp].uses = deck[temp].uses - 1;
            }
        }
        setCardgird(copy);
    }

    function handleClick(row:number, col:number) {
        const copy = [...cardgrid];
        if (copy[row][col].num !== -1) {
            if (matching && !copy[row][col].matched) {
                if(copy[row][col].num !== currentcard.num){
                    setTimer(true)
                    copy[row][col]= {...copy[row][col], isflipped: true};
                    setTimeout(() => {
                        copy[row][col] = {...copy[row][col], isflipped: false};
                        copy[currentcard.x][currentcard.y]= {...copy[currentcard.x][currentcard.y], isflipped: false};
                        setCurrentcard({num: -1, isflipped: false, x: -1, y:-1});
                        setTimer(false);
                    }, 1000);
                } else if ((row === currentcard.x) && (col === currentcard.y)) {
                    copy[row][col]= {...copy[row][col], isflipped: false};
                    setCurrentcard({num: -1, isflipped: false, x: -1, y:-1});
                }else {
                    copy[row][col]= {...copy[row][col], isflipped: true, matched: true};
                    copy[currentcard.x][currentcard.y]= {...copy[currentcard.x][currentcard.y], matched: true};
                    setCurrentcard({num: -1, isflipped: false, x: -1, y:-1});
                    matches.current += 1;
                }
                setMatching(false)
            } else if (!copy[row][col].matched){
                copy[row][col] = {...copy[row][col], isflipped: true};
                setMatching(true);
                setCurrentcard({num: copy[row][col].num, isflipped: copy[row][col].isflipped, x: row, y:col});
            }   
        } else {
            setTimer(true);
            copy[row][col] = {...copy[row][col], isflipped: true};
            if (matching) {
                copy[currentcard.x][currentcard.y] = {...copy[currentcard.x][currentcard.y], isflipped: false};
            }
            if (matches.current > 0) {   
                for (let i = 0; i < rows; i++) {
                    for (let j = 0; j < cols; j++) {
                        if ((copy[i][j].num != -1) && (copy[i][j].isflipped)) {
                            copy[i][j] = {...copy[i][j], isflipped: false};
                        }
                    }
                }
            }           
            setTimeout(() => {
                gamelose();
            }, 2000)
        }
        setCardgird(copy);
        if (matches.current === total) {
            if ((rows * cols) % 2) {
                for (let i = 0; i < rows; i) {
                    for (let j = 0; j < cols; j++) {
                        if (cardgrid[i][j].num === -1) {
                            cardgrid[i][j] = {...cardgrid[i][j], isflipped: true};
                            i = rows;
                            j = cols;
                        }
                    }
                }
            }
            gamewin();
        }
    }
    
    return (
      <>
        <div key="grid "className="container text-center">
            {cardgrid.map((row,i) => {
                return (            
                    <>
                        <div key={"row:"+i} className="row">
                            {row.map((col,j) =>{
                                return (
                                    <div key={"col:"+j} className="col" onClick={() => { timer ? null : handleClick(i, j) }} >
                                        <Card key={"row:"+i+", col:"+j} num={col.num} flipped={col.isflipped} matched={col.matched}></Card>
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
  
  export default Board  