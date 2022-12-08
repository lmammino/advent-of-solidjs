/* @refresh reload */
import { render } from 'solid-js/web'
import JokeGenerator from './JokeGenerator'

render(() => <JokeGenerator />, document.getElementById('root') as Element)
