import React from 'react'
import { ChessType } from '../types/enums'
import './ChessCom.css'

export interface ChessComProps {
  type: ChessType
  onClick?: () => void
}

function ChessCom(props: ChessComProps) {
  let chess = null
  if (props.type === ChessType.red) {
    chess = <div className="red chess-item"></div>
  } else if (props.type === ChessType.black) {
    chess = <div className="black chess-item"></div>
  }

  return (
    <div
      className="chess"
      onClick={() => {
        if (props.type === ChessType.none && props.onClick) {
          props.onClick()
        }
      }}
    >
      {chess}
    </div>
  )
}

export default ChessCom
