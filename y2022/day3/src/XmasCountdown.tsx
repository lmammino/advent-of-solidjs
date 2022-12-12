import { createSignal, onCleanup } from 'solid-js'
import { JSX } from 'solid-js/jsx-runtime'
import styles from './XmasCountdown.module.css'

const XMAS_TIME = new Date('12/25/2022 00:00:00').getTime()
const ONE_DAY = 1000 * 60 * 60 * 24

export default function XmasCountdown (): JSX.Element {
  const [days, setDays] = createSignal<number>(0);
  const [floorDays, setFloorDays] = createSignal<number>(0);
  const [hours, setHours] = createSignal(0);
  const [floorHours, setFloorHours] = createSignal(0);
  const [minutes, setMinutes] = createSignal(0);
  const [floorMinutes, setFloorMinutes] = createSignal(0);
  const [seconds, setSeconds] = createSignal(0);
  const [floorSeconds, setFloorSeconds] = createSignal(0);


  const interval = setInterval(
		() => {(
      setDays((): number => {
        const days = (XMAS_TIME - Date.now()) / ONE_DAY

        setFloorDays((): number => {
          return Math.floor(days)
        })

        return days
      }),

      setHours((): number => {
        const hours = 24 * (days() - floorDays())
        
        setFloorHours((): number => {
          return Math.floor(hours)
        })
        
        return hours
      }),

      setMinutes((): number => {
        const minutes = 60 * (hours() - floorHours())

        setFloorMinutes((): number => {
          return Math.floor(minutes)
        })
        
        return minutes
      }),

      setSeconds((): number => {
        const seconds = 60 * (minutes() - floorMinutes())

        setFloorSeconds((): number => {
          return Math.floor(seconds)
        })

        return seconds
      })
    )},
		1000
	);

	onCleanup(() => clearInterval(interval));

  return (<>
    <div class={styles.wrapper}>
      <div class={styles.card}>
        <h2 class={styles.title}>Christmas Countdown</h2>
        <div class={styles.counter}>
          <div>
            <p class={styles.time}>{floorDays}</p>
            <p class={styles.title}>days</p>    
          </div>
          <div>
            <p class={styles.time}>{floorHours}</p>
            <p class={styles.title}>hours</p>
          </div>
          <div>
            <p class={styles.time}>{floorMinutes}</p>
            <p class={styles.title}>minutes</p>
          </div>
          <div>
            <p class={styles.time}>{floorSeconds}</p>
            <p class={styles.title}>seconds</p>  
          </div>
        </div>
      </div>
    </div>
  </>)
}
