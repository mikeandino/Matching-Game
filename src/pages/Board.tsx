import { useEffect, useRef, useState } from "react";
import Card from "./Card"
import "bootstrap/dist/css/bootstrap-grid.css";

type BoardProps = {
    rows: number;
    cols: number;
    gamewin: () => void;
    gamelose: () => void;
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

function Board({ rows, cols, gamewin, gamelose }: BoardProps) {
    const total: number = (!((rows * cols) % 2) ? (rows * cols) / 2 : ((rows * cols) / 2 - .5));
    const [cardgrid, setCardgird] = useState<Cardlog[][]>([]);
    const [currentcard, setCurrentcard] = useState<Savedcard>({ num: -1, isflipped: false, x: -1, y: -1 });
    const [matching, setMatching] = useState<boolean>(false);
    const [timer, setTimer] = useState<boolean>(false);
    const [width, setWidth] = useState<number>(75); 
    const [height, setHeight] = useState<number>(75);
    const [gap, setGap] = useState<number>(5);
    const matches = useRef<number>(0);

    useEffect(() => {
        setsize();
        fillgrid();
    }, [])

    function setsize() {
        if (rows === 2 ) {
            if (cols === 2) {
                setWidth(50);
            } 
            if (4 < cols && cols < 7) {
                setWidth(100);
            } 
            if (6 < cols){
                setWidth(100);
                setHeight(50);
            }
        }
        
        if (rows === 3 ) {
            if (cols === 3) {
                setWidth(50);
                setHeight(100);
            } 
            
            if (cols === 4 ) {
                setWidth(75);
                setHeight(100);
            } 
            if (6 < cols){
                setWidth(100);
            }
        }
        
        if (rows === 4 ) {
            setWidth(50);
            if (cols === 4 || cols === 5) {
                setGap(4);
            } 
             
            if (6 < cols){
                setWidth(100);
                setGap(4);
            }
        }
        
        if (rows === 5 ) {
            setHeight(100);
            setGap(3);
             if (cols === 9) {
                setWidth(100);
             } 
        }
        
        if (rows === 6 ) {
            setHeight(100);
            setGap(3);
             if (cols === 9) {
                setWidth(100);
             } 
        }
        
        if (rows === 7 ) {
            setHeight(100);
            setGap(3);
             if (cols === 9) {
                setWidth(100);
             } 
        }
        
        if (rows === 8 ) {
            setHeight(100);
            setGap(3);
             if (cols === 9) {
                setWidth(100);
             } 
        }
        
        if (rows === 9 && cols === 9 ) {
            setHeight(100);
            setWidth(100);
            setGap(3);
        }
        
        if (cols === 2 && 2 < rows) {
            setHeight(100);
            setWidth(50);
            if (3 < rows) {   
                setWidth(25);
                if (6 < rows) {
                    setGap(11 - rows);
                }
            } 
        }
        
        if (cols === 3 && 3 < rows) {
            setHeight(100);
            if (rows == 4) {   
                setWidth(50); 
            }else{    
                setWidth(25);
                if (6 < rows) {
                    setGap(11 - rows);
                }
            } 
        }
        
        if (cols === 4 && 4 < rows) {
            setHeight(100);
            setWidth(50); 
            if (5 < rows) {   
                   setGap(10 - rows);
            } 
        }
        
        if (cols === 5 && 5 < rows) {
            setHeight(100);
            setWidth(50);  
            if (rows == 9) {   
                   setGap(2);
            } 
        }
        
        if (cols === 6 && 6 < rows) {
            setHeight(100);
            setWidth(50);  
            if (rows == 9) {   
                   setGap(2);
            } 
        }
        
        if (cols === 7 && 7 < rows) {
            setHeight(100);
            setWidth(50);  
            if (rows == 9) {   
                   setGap(2);
            } 
        }

        if (cols === 8 && 8 < rows) {
            setHeight(100);
            setWidth(50);    
            setGap(2);
        }
    }

    function fillgrid() {
        const copy = [...cardgrid];
        const deck: { num: number, uses: number }[] = [];
        if ((rows * cols) % 2) {
            deck.push({ num: -1, uses: 1 })
        }
        for (let index = 1; index <= total; index++) {
            deck.push({ num: index, uses: 2 });
        }
        for (let i = 0; i < rows; i++) {
            copy[i] = [];
            for (let j = 0; j < cols; j++) {
                let temp: number = Math.floor(Math.random() * deck.length);
                while (deck[temp].uses == 0) {
                    temp = Math.floor(Math.random() * deck.length);
                }
                copy[i][j] = { num: (deck[temp].num), isflipped: false, matched: false };
                deck[temp].uses = deck[temp].uses - 1;
            }
        }
        setCardgird(copy);
    }

    function handleClick(row: number, col: number) {
        const copy = [...cardgrid];
        if (copy[row][col].num !== -1) {
            if (matching && !copy[row][col].matched) {
                if (copy[row][col].num !== currentcard.num) {
                    setTimer(true)
                    copy[row][col] = { ...copy[row][col], isflipped: true };
                    setTimeout(() => {
                        copy[row][col] = { ...copy[row][col], isflipped: false };
                        copy[currentcard.x][currentcard.y] = { ...copy[currentcard.x][currentcard.y], isflipped: false };
                        setCurrentcard({ num: -1, isflipped: false, x: -1, y: -1 });
                        setTimer(false);
                    }, 1000);
                } else if ((row === currentcard.x) && (col === currentcard.y)) {
                    copy[row][col] = { ...copy[row][col], isflipped: false };
                    setCurrentcard({ num: -1, isflipped: false, x: -1, y: -1 });
                } else {
                    copy[row][col] = { ...copy[row][col], isflipped: true, matched: true };
                    copy[currentcard.x][currentcard.y] = { ...copy[currentcard.x][currentcard.y], matched: true };
                    setCurrentcard({ num: -1, isflipped: false, x: -1, y: -1 });
                    matches.current += 1;
                }
                setMatching(false)
            } else if (!copy[row][col].matched) {
                copy[row][col] = { ...copy[row][col], isflipped: true };
                setMatching(true);
                setCurrentcard({ num: copy[row][col].num, isflipped: copy[row][col].isflipped, x: row, y: col });
            }
        } else {
            setTimer(true);
            copy[row][col] = { ...copy[row][col], isflipped: true };
            if (matching) {
                copy[currentcard.x][currentcard.y] = { ...copy[currentcard.x][currentcard.y], isflipped: false };
            }
            if (matches.current > 0) {
                for (let i = 0; i < rows; i++) {
                    for (let j = 0; j < cols; j++) {
                        if ((copy[i][j].num != -1) && (copy[i][j].isflipped)) {
                            copy[i][j] = { ...copy[i][j], isflipped: false };
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
                            cardgrid[i][j] = { ...cardgrid[i][j], isflipped: true };
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

        <div className={"d-flex flex-column gap-"+ gap +" w-"+ width + " h-" + height}>
            {cardgrid.map((row, i) => {
                return (
                    <div key={"row:" + i} className="row flex-grow-1">
                        {row.map((col, j) => {
                            return (
                                // <div key={"col:" + j} className="col d-flex justify-content-center g-1 w-auto h-1" >
                                <div key={"col:" + j} className="col flex-grow-1" >
                                    <Card key={"row:" + i + ", col:" + j} num={col.num} flipped={col.isflipped} matched={col.matched} onClick={() => { timer ? null : handleClick(i, j) }} />
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </div>

    )
}

export default Board  