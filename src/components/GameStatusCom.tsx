import React from 'react'
import { ChessType, GameStatus } from '../types/enums'
import './GameStatusCom.css'

interface GameStatusComProps {
  status: GameStatus
  nextChess: ChessType.red | ChessType.black
}

function GameStatusCom(props: GameStatusComProps) {
  let status: JSX.Element
  switch (props.status) {
    case GameStatus.gaming:
      status =
        props.nextChess === ChessType.red ? (
          <div className="red">红方落子</div>
        ) : (
          <div className="black">黑方落子</div>
        )
      break
    case GameStatus.redWin:
      status = <div className="win red">红方胜利</div>
      break
    case GameStatus.blackWin:
      status = <div className="win black">黑方胜利</div>
      break
    case GameStatus.draw:
      status = <div className="win draw">平局</div>
      break
  }
  return <div className="status">{status}</div>
}

export default GameStatusCom
