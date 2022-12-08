import { Show, createResource, createSignal } from 'solid-js'
import { JSX } from 'solid-js/jsx-runtime'
import styles from './JokeGenerator.module.css'

export default function JokeGenerator (): JSX.Element {
  const fetchJoke = async () => (await fetch(`https://v2.jokeapi.dev/joke/christmas`)).json();

  const [jokes, { mutate, refetch }] = createResource(fetchJoke)
  
  const [showDelivery, setShowDelivery] = createSignal(false);

  function toggleShowDelivery() {
    setShowDelivery(!showDelivery())
  }
  
  function loadNewJoke() {
    refetch()
    toggleShowDelivery()
  }
  
  return (<div class={styles.wrapper}>
    <div class={styles.joke}>
      {jokes.loading ? <span>"Loading..."</span> : 
        <>
          <p class={styles.text}>{jokes().setup}</p>
          <Show when={showDelivery()}>
            <p class={styles.text}>{jokes().delivery}</p>
          </Show>
        
          <Show when={!showDelivery()}>
            <button class={styles.button} onClick={toggleShowDelivery}>Tell Me!</button>
          </Show>

          <Show when={showDelivery()}>
            <button class={styles.button} onClick={loadNewJoke}>One More!</button>
          </Show>  
        </>
      }
    </div>
  </div>)
}
