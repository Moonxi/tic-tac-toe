import React, { Component } from 'react'
import { ChessType, GameStatus } from '../types/enums'
import BoardCom from './BoardCom'
import GameStatusCom from './GameStatusCom'

interface GameComState {
  chesses: ChessType[]
  gameStatus: GameStatus
  nextChess: ChessType.red | ChessType.black
}

export default class GameCom extends Component<{}, GameComState> {
  state: GameComState = {
    chesses: new Array(9).fill(ChessType.none),
    gameStatus: GameStatus.gaming,
    nextChess: ChessType.black
  }
  componentDidMount(): void {
    this.init()
  }
  init() {
    this.setState({
      chesses: new Array(9).fill(ChessType.none),
      gameStatus: GameStatus.gaming,
      nextChess: ChessType.black
    })
  }
  handleChessClick(index: number) {
    const chesses = this.state.chesses.map((item, i) => (i === index ? this.state.nextChess : item))
    this.setState({
      chesses,
      nextChess: this.state.nextChess === ChessType.red ? ChessType.black : ChessType.red,
      gameStatus: this.getStatus(chesses, index)
    })
  }
  getStatus(chesses: ChessType[], index: number): GameStatus {
    const winner = this.getWinner(chesses, index)
    // 红方胜
    if (winner === ChessType.red) {
      return GameStatus.redWin
    }
    // 黑方胜
    if (winner === ChessType.black) {
      return GameStatus.blackWin
    }
    // 平局
    if (!chesses.includes(ChessType.none)) {
      return GameStatus.draw
    }
    // 游戏中
    return GameStatus.gaming
  }
  getWinner(chesses: ChessType[], index: number) {
    const horMin = Math.floor(index / 3) * 3
    const verMin = index % 3
    const horCheck =
      chesses[horMin] === chesses[horMin + 1] && chesses[horMin + 1] === chesses[horMin + 2]
    const verCheck =
      chesses[verMin] === chesses[verMin + 3] && chesses[verMin + 3] === chesses[verMin + 6]
    const diaCheck =
      chesses[4] !== ChessType.none &&
      ((chesses[0] === chesses[4] && chesses[4] === chesses[8]) ||
        (chesses[2] === chesses[4] && chesses[4] === chesses[6]))
    if (horCheck || verCheck || diaCheck) {
      return chesses[index]
    }
  }

  render() {
    return (
      <div
        style={{
          textAlign: 'center'
        }}
      >
        <h1>井字棋游戏</h1>
        <GameStatusCom status={this.state.gameStatus} nextChess={this.state.nextChess} />
        <BoardCom
          chesses={this.state.chesses}
          isGameOver={this.state.gameStatus !== GameStatus.gaming}
          onClick={this.handleChessClick.bind(this)}
        />
        <button onClick={this.init.bind(this)}>重新开始</button>
      </div>
    )
  }
}
