/* @refresh reload */
import { render } from 'solid-js/web'
import TicTacToe from './TicTacToe'

render(() => <TicTacToe />, document.getElementById('root') as Element)
