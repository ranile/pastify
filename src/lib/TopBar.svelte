<script>
  import { createEventDispatcher } from 'svelte';

  export let logoSrc = 'https://pastify.xyz/icon.svg';
  export let logoAlt = 'Pastify logo';
  export let title = 'Pastify';
  export let topBarHeight = '3.3rem';
  export let buttonText;

  const dispatch = createEventDispatcher();

  const handleClick = () => {
    dispatch('actionButtonClick');
  };
</script>

<div class="top-bar" style:height={topBarHeight}>
  <div class="content">
    <a href="/" class="left">
      <img src={logoSrc} alt={logoAlt} class="logo" />
      <h1 class="title">{title}</h1>
    </a>
    <button class="save-button" on:click={handleClick}>
      {buttonText}
    </button>
  </div>
</div>

<style lang="scss">
  .top-bar {
    width: 100%;
    background-color: white;
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.1);
  }

  .content {
    margin: 0 auto;
    padding: 0 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;

    a {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      text-decoration: none;

      .logo {
        height: 2rem;
        width: 2rem;
        aspect-ratio: 32 / 32;
        object-fit: cover;
      }

      .title {
        font-size: 1.5rem;
        font-weight: 600;
        color: #2d3748;
      }
    }

    .save-button {
      display: inline-flex;
      align-items: center;
      cursor: pointer;
      justify-content: center;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      font-weight: 500;
      transition: all 0.2s;
      height: 2.5rem;
      padding: 0 1rem;
      border: 1px solid #e2e8f0;
      background-color: #f7fafc;
      color: #2d3748;

      &:hover {
        background-color: #4299e1;
        color: #f7fafc;
      }

      &:focus-visible {
        outline: none;
        box-shadow: 0 0 0 2px #90cdf4;
      }

      &:disabled {
        pointer-events: none;
        opacity: 0.5;
      }
    }
  }
</style>
