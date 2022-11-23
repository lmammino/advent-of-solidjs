import { For, Show, createSignal, Accessor } from 'solid-js'
import { JSX } from 'solid-js/jsx-runtime'
import styles from './TicTacToe.module.css'

type Player1 = 'X'
type Player2 = 'O'
type Player = Player1 | Player2
type Players = [Player1, Player2]
type Cell = Player1 | Player2 | ''
type Grid = [Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell]
const winningCombos: Array<[number, number, number]> = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const newGrid = (): Grid => ['', '', '', '', '', '', '', '', '']

export default function TicTacToe (): JSX.Element {
  const [grid, setGrid] = createSignal<Grid>(newGrid())
  const players: Players = ['X', 'O']
  const [turn, setTurn] = createSignal(0)
  const currentPlayer = (): Player => players[turn() % 2]

  function updateGrid (index: Accessor<number>, event: MouseEvent): void {
    if (!canRestart() && grid()[index()] === '') {
      const newGrid: Grid = [...grid()]
      newGrid[index()] = currentPlayer()
      setTurn(turn() + 1)
      setGrid(newGrid)
    }
  }

  function winner (): Player | null {
    const g = grid()
    for (const [a, b, c] of winningCombos) {
      if (g[a] !== '' && g[a] === g[b] && g[a] === g[c]) {
        return g[a] as Player
      }
    }
    return null
  }

  function isComplete (): boolean {
    return grid().every(cell => cell !== '')
  }

  function canRestart (): boolean {
    return isComplete() || winner() !== null
  }

  function restart (): void {
    setGrid(newGrid())
    setTurn(0)
  }

  return (<>
    <div class={styles.grid}>
      <For each={grid()}>
        {(cell, index) => (<div onClick={[updateGrid, index]} class={styles.cell}>{cell}</div>)}
      </For>
    </div>
    <div class={styles.gameInfo}>
      <Show when={isComplete()} fallback={<div>Current player: {currentPlayer()}</div>}>
        <Show when={winner()} fallback={<div>DRAW</div>}>
          <div>Winner: {winner()}</div>
        </Show>
      </Show>
      <Show when={canRestart()}>
        <button onClick={restart}>Restart Game</button>
      </Show>
    </div>
  </>)
}
