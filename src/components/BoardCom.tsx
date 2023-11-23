import React from 'react'
import { ChessType } from '../types/enums'
import ChessCom from './ChessCom'
import './BoardCom.css'
interface BoardComProps {
  chesses: ChessType[]
  isGameOver?: boolean
  onClick?: (index: number) => void
}

const BoardCom: React.FC<BoardComProps> = function (props) {
  const isGameOver = props.isGameOver!
  return (
    <div className="board">
      {props.chesses.map((type, i) => (
        <ChessCom
          key={i}
          type={type}
          onClick={() => {
            if (props.onClick && !isGameOver) {
              props.onClick(i)
            }
          }}
        />
      ))}
    </div>
  )
}
BoardCom.defaultProps = {
  isGameOver: false
}

export default BoardCom
