<script lang="ts">
  import wordsArrays from './words.js'

  let translationInput: HTMLInputElement;
  let spanishSpan: HTMLSpanElement;

  const getBlurStyle = (index: number, exerciseHistory: Exercise[]) => {
    const visibleEntries = 8;
    const blurIndex = (exerciseHistory.length - 1) - index;
    const fadeoutFactor = (visibleEntries - blurIndex) / visibleEntries;
    const blurFactor = (1 - fadeoutFactor) * 0.2;

    return `opacity: ${fadeoutFactor}; filter: blur(${blurFactor}rem`;
  }

  let exerciseHistory = $state<Exercise[]>([]);

  const exercises = wordsArrays.map(array => {
    return {
      spanish: array[0],
      english: array[1]
    }
  });

  type Exercise = {
    spanish: string,
    english: string,
    guess?: string,
    isCorrect?: boolean
  };

  const pastExercises: Exercise[] = [];

  let currentExercise: Exercise;

  let getNewExercise: () => void;

  $effect(() => {
    getNewExercise = () => {
      const randomIndex = Math.floor(Math.random() * exercises.length);

      currentExercise = { ...exercises[randomIndex] }; // clone
      spanishSpan.textContent = currentExercise.spanish;
    }

    getNewExercise();
  });

  const formSubmitHandler = (e: Event) => {
    e.preventDefault();

    currentExercise.guess = translationInput.value;
    currentExercise.isCorrect = currentExercise.english.toLowerCase() === currentExercise.guess!.toLowerCase();

    translationInput.value = '';
    
    pastExercises.push(currentExercise);
    exerciseHistory = pastExercises.slice(-10);

    getNewExercise();
  };
</script>

<div class="container">
  <main>
    <table id="table">
      <tbody>
        {#each exerciseHistory as exercise, index}
          <tr class={exercise.isCorrect ? 'correct' : 'incorrect'} style={getBlurStyle(index, exerciseHistory)}>
            <td>
              {exercise.spanish}
            </td>
            <td>
              <span>{`${exercise.english} `}</span>
              <span class="linethrough">{exercise.isCorrect ? '' : exercise.guess}</span>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
    <form id="form" on:submit={formSubmitHandler}>
      <table>
        <tbody>
          <tr>
            <td class="left">
              <span id="spanish-span" bind:this={spanishSpan}></span>
            </td>
            <td class="no-padding">
                <input id="translation-input" bind:this={translationInput} placeholder="translation (english)" autocomplete="off" autofocus />
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  </main>
</div>

<style>
  .container {
    width: 100%;
    display: flex;
    justify-content: center;
    height: 3.5rem;
    position: relative;
  }

  main {
    width: 100%;
    max-width: 800px;
    position: absolute;
    bottom: 0;
  }

  input {
    font-family: monospace;
    width: 100%;
    background-color: var(--dark-gray);
    color: var(--white);
    border: 2px var(--gray) solid;
    padding: 8px;
    font-size: inherit;
    border-radius: 0.2rem;
  }
  input:focus {
    outline-width: 0;
  }

  table {
    padding: 0px;
    width: 100%;
    border-spacing: 0.6rem;
    font-size: inherit;
  }

  tr {
    background-color: var(--black);
  }

  td {
    width: 50%;
    padding: 0.6rem;
    border-radius: 0.1rem;
  }
  td:first-child {
    border-top-left-radius: 0.4rem;
    border-bottom-left-radius: 0.4rem;
  }
  td:last-child {
    border-top-right-radius: 0.4rem;
    border-bottom-right-radius: 0.4rem;
  }
  .no-padding {
    padding: 0;
  }

  .left {
    text-align: right;
  }

  .correct {
    background-color: green;
  }
  .incorrect {
    background-color: red;
  }

  .linethrough {
    text-decoration: line-through;
    opacity: 0.7;
  }

  form {
    margin: 0;
  }
</style>
