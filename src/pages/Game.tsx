import { useEffect, useRef, useState } from "react";
import Board from "./Board";
import { Modal, Tooltip } from "bootstrap";
import "../styles/Game.css";
import "../../node_modules/bootstrap/scss/bootstrap.scss";
import "bootstrap-icons/font/bootstrap-icons.css";


function Game() {
  const [start, setStart] = useState<boolean>(false);
  const [rows, setRows] = useState<number>(0);
  const [cols, setCols] = useState<number>(0);
  const settingsRef = useRef<HTMLDivElement | null>(null);
  const settingsModal = useRef<Modal | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const tooltip = useRef<Tooltip | null>(null);
  const winRef = useRef<HTMLDivElement | null>(null);
  const winModal = useRef<Modal | null>(null);
  const loseRef = useRef<HTMLDivElement | null>(null);
  const loseModal = useRef<Modal | null>(null);

  useEffect(() => {
    handleModal(true);
  }, [])
  
  const handleModal = (show: boolean) => {
    if (settingsRef.current) {
      if (!settingsModal.current) {
        settingsModal.current = new Modal(settingsRef.current,{backdrop:"static", keyboard:false});
        tooltip.current = new Tooltip(tooltipRef.current!, {
          title: "<p>Enter a number between 2 and 9 to the rows and columns of tiles to match.</p> <p>If the number of tiles is odd a special <b>\"X\"</b> tile will appear that when flipped, ends the game.</p>", 
          placement: 'right', 
          html: true,
          container: "body",
          trigger: 'hover focus'
        });
      }
    
      if (show) {
        settingsModal.current.show();
      } else {
        settingsModal.current.hide();
      }
    }
  };
  

  function clickstart(event: React.MouseEvent<HTMLButtonElement> ){
    if((rows > 1) && (rows <= 9) && (cols > 1) && (cols <= 9)){
      event.preventDefault();
      handleModal(false);
      setStart(true);
    }
  }

  function gamewin(){
    console.log("victory");
    winModal.current = new Modal(winRef.current!,{backdrop:"static", keyboard:false});
    winModal.current.show();
  }

  function gamelose(){
    console.log("lose");
    loseModal.current = new Modal(loseRef.current!,{backdrop:"static", keyboard:false});
    loseModal.current.show();
  }

  function restart(){
    setStart(false);
    (document.getElementById("form") as HTMLFormElement).reset();
    handleModal(true);
  }

  return (
      <>
        <div className="modal fade" id="settings"  tabIndex={-1} role="dialog" ref={settingsRef} aria-labelledby="settingsLabel" aria-hidden="true" >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="settingsLabel">Matching Game</h5>
              </div>
              <form id="form">
                <div className="modal-body">
                  <label className="form-label">How to Play: <i className="bi bi-question-circle-fill" ref={tooltipRef} /></label>
                  <br/>
                  <label className="form-label">Game Settings:</label>
                  <div className="form-floating mb-3">
                    <input type="number" className="form-control" id="rows" min={2} max={9} placeholder="0" onChange={(e) => setRows(parseInt(e.target.value))} data-bind="value:replyNumber" required/>
                    <label htmlFor="rows">Rows</label>
                  </div>
                  <div className="form-floating">
                    <input type="number" className="form-control" id="cols" min={2} max={9} placeholder="0" onChange={(e) => setCols(parseInt(e.target.value))} data-bind="value:replyNumber" required/>
                    <label htmlFor="cols">Columns</label>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary" onClick={clickstart} >Start Game!</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {start && 
            (
              <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
                <Board rows={rows} cols={cols} gamewin={gamewin} gamelose={gamelose}/>
              </div>
            )
        }
        <div className="modal fade" id="win"  tabIndex={-1} role="dialog" ref={winRef} aria-labelledby="winLabel" aria-hidden="true" >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title" id="winLabel">Victory!</h3>
              </div>
              <div className="modal-body">
                <h5>Congratulations you won!</h5>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => restart()} >Play Again!</button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="lose"  tabIndex={-1} role="dialog" ref={loseRef} aria-labelledby="loseLabel" aria-hidden="true" >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title" id="loseLabel">Defeat...</h3>
              </div>
              <div className="modal-body">
                <h5>Maybe next try!</h5>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => restart()} >Play Again!</button>
              </div>
            </div>
          </div>
        </div>
      </>
  )
}

  export default Game  