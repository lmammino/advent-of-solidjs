/* @refresh reload */
import { render } from 'solid-js/web'
import XmasCountdown from './XmasCountdown'

render(() => <XmasCountdown />, document.getElementById('root') as Element)
