<template>
  <section class="summary">
    <div class="container">
      <h2>
        Overview for search:
        <a target="_blank" :href="googleLink()">{{searchString}}</a>
      </h2>
      <p>
        <small>*Data is available from up to one page of google searches (trust me, you don't wanna go past the first page)</small>
      </p>

      <hr>

     <h3>Most frequent named entities</h3>
      <div class="input-group input-group-lg input-rangeslider">
        <input type="range" min="1" max="100" step="1" v-model="numFrequentWords">
      </div>
      <ul class="d-flex flex-wrap justify-content-center">
        <li class="card card--dark" :key="e.entity" v-for="e in topWords">
          <a target="_blank" :href="wordLink(e.entity)">
            {{ e.entity }}
            <small>{{ e.count }} times</small>
          </a>
        </li>
      </ul>

      <hr>
      <h3>Top subreddits</h3>
      <div class="input-group input-group-lg input-rangeslider">
        <input type="range" min="1" max="100" step="1" v-model="numSubreddits">
      </div>
      <ul class="d-flex flex-wrap justify-content-center">
        <li class="card card--dark" :key="subreddit.name" v-for="subreddit in topSubs">
          <a target="_blank" :href="subredditLink(subreddit.name)">
            /r/{{subreddit.name}}
              <div>
              <small>{{ subreddit.count }} {{ subreddit.count == 1 ? 'comment' : 'comments' }} ({{ percentageOf(subreddit.count) }}%)</small>
            </div>
          </a>
          </li>
      </ul>

    </div>
  </section>
</template>

<script>

export default {
  name: 'rec-summary',
  props: ['searchString','isLoading','topSubreddits','extractedWords','allComments'],
  data() {
    return {
      topSub: [],
      extWords: [],
      allComments: [],
      numSubreddits: 10,
      numFrequentWords: 15,
    }
  },
  methods: {
    subredditLink(subreddit) {
      return `https://www.reddit.com/r/${subreddit}/`
    },
    wordLink(word) {
      const w = encodeURIComponent(word)
      return `https://www.google.com/search?q=${w}`
    },
    googleLink(){
      const str = encodeURIComponent(this.searchString + ' site:reddit.com');
      return `https://www.google.com/search?q=${str}`
    },
    percentageOf(count){
      return Math.round(
        (100 * count) / Object.keys(this.allComments).length
      )
    },
  },
  computed:{
     topWords(){
      if (!this.extractedWords.length || isNaN(this.numFrequentWords)) return
      this.extWords = this.extractedWords
       let words = this.extWords.slice(0)
      
      if(words.length > this.numFrequentWords){
        words.length = this.numFrequentWords
      }
      return words
    },
    topSubs(){
      if (!this.topSubreddits.length || isNaN(this.numSubreddits)) return
      this.topSubs = this.topSubreddits
      let subs = this.topSubs.slice(0)
      
      if(subs.length > this.numSubreddits){
        subs.length = this.numSubreddits
      }
      return subs
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
$text: #cad6e6;

input[type='range'] {
  -webkit-appearance: none;
  margin: 10px 0;
  width: 100%;
  background: transparent;

  &:active {
    &::-webkit-slider-thumb {
      opacity: 1;
      transition: transform 0.2s ease;
      transform: scale(1.5);
    }
    &::-moz-range-thumb {
      opacity: 1;
      transition: transform 0.2s ease;
      transform: scale(1.5);
    }
    &::-ms-thumb {
      opacity: 1;
      transition: transform 0.2s ease;
      transform: scale(1.5);
    }
  }
}
input[type='range']:focus {
  outline: none;
}
input[type='range']::-webkit-slider-runnable-track {
  width: 100%;
  height: 12.8px;
  cursor: pointer;
  box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
  background: linear-gradient(135deg, #00bec7, #0073e8);
  border-radius: 25px;
  border: 0px solid #000101;
}
input[type='range']::-webkit-slider-thumb {
  box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
  border: 0px solid #000000;
  border-radius: 50%;
  height: 25px;
  width: 25px;
  background: white;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -6px;
  opacity: 0.85;
}
input[type='range']:focus::-webkit-slider-runnable-track {
  background: linear-gradient(135deg, #00bec7, #0073e8);
}
input[type='range']::-moz-range-track {
  width: 100%;
  height: 12.8px;
  cursor: pointer;
  box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
  background: linear-gradient(135deg, #00bec7, #0073e8);
  border-radius: 25px;
  border: 0px solid #000101;
}
input[type='range']::-moz-range-thumb {
  box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
  border: 0px solid #000000;
  border-radius: 50%;
  height: 25px;
  width: 25px;
  background: white;
  cursor: pointer;
  opacity: 0.85;
}
input[type='range']::-ms-track {
  width: 100%;
  height: 12.8px;
  cursor: pointer;
  background: transparent;
  border-color: transparent;
  border-width: 39px 0;
  color: transparent;
}
input[type='range']::-ms-fill-lower {
  background: linear-gradient(135deg, #00bec7, #0073e8);
  border: 0px solid #000101;
  border-radius: 50px;
  box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
}
input[type='range']::-ms-fill-upper {
  background: linear-gradient(135deg, #00bec7, #0073e8);
  border: 0px solid #000101;
  border-radius: 50px;
  box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
}
input[type='range']::-ms-thumb {
  box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
  border: 0px solid #000000;
  border-radius: 50%;
  height: 25px;
  width: 25px;
  background: white;
  cursor: pointer;
  opacity: 0.85;
}
input[type='range']:focus::-ms-fill-lower {
  background: linear-gradient(135deg, #00bec7, #0073e8);
}
input[type='range']:focus::-ms-fill-upper {
  background: linear-gradient(135deg, #00bec7, #0073e8);
}

.input-rangeslider {
  max-width: 400px;
  margin: 0 auto;
  margin-bottom: 1rem;
}

.comment {
  word-wrap: break-word;
}

.container {
  &--summary {
    padding: 0;
  }
}

ul {
  list-style-type: none;
  padding: 0;
}

hr {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin: 2rem 0;
}

section.summary {
  padding: 4rem 0 2rem;
  margin-bottom: 4rem;
  border-radius: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  background-color: rgba(0, 0, 0, 0.2);
  border-top: 3px solid #7755ff;
}

h2 {
  word-wrap: break-word;
  font-size: 2rem;
  font-weight: 300;
  text-align: center;
  margin-bottom: 1.25rem;
  font-weight: 500;
}
h3 {
  @extend h2;
  font-weight: 300;
  font-size: 1.75rem;
  margin-bottom: 1rem;
}

.controversiality {
  font-weight: 700;
  color: #ff5600;
}

p {
  font-size: 18px;
  color: $text !important;
}

a {
  transition: all 0.2s ease;
  &:hover {
    text-decoration: none;
    background-color: rgba(0, 150, 255, 0.1);
  }
}

.card {
  &--dark {
    cursor: pointer;
    background: rgba(0, 0, 0, 0.5);
    box-shadow: 0 8px 40px -4px rgba(0, 0, 0, 0.5);
    margin: 0 0.5rem;
    padding: 0;
    border: none;
    margin-bottom: 1rem;
    border: 1px solid black;
    transition: all 0.2s ease;

    &:hover {
      background: linear-gradient(115deg, #ff79aa, #b743ff);
      box-shadow: 0 15px 100px -4px rgba(0, 0, 0, 0.7);
      color: white;
      transform: scale(1.1);
    }

    small {
      opacity: 0.8;
    }
  }
}

ul {
  li {
    &:hover {
      a {
        color: white;
        background: transparent;
      }
    }
    &:first-child {
      font-weight: 600;
      box-shadow: 0 5px 60px -2px rgba(0, 50, 150, 0.25);
      background: #0073e8;
      background: linear-gradient(135deg, #00bec7, #0073e8);
      color: white;

      a {
        display: inline-block;
        color: white;
      }
    }
  }
  a {
    color: $text;
    padding: 0.4rem 0.8rem;
  }
}

p {
  text-align: center;
  color: $text;
  margin: 0 0 2rem;

  small {
    opacity: 0.8;
  }
}

.gradient-uppercase {
  font-size: 1.75rem;
  text-transform: uppercase;
  color: #96efff !important;
  background: -webkit-linear-gradient(115deg, #108aff, #96efff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  border-radius: 30px;
  border: 1px solid #108aff;
  max-width: 300px;
  margin: 0 auto;
  margin-top: -0.5rem;
}

@media (min-width: 992px) {
  section.summary {
    padding: 5rem;
  }
}
</style>
