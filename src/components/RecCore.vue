<template>
  <div id="main">
    <header>
      <div class="container header-section">
        <img width="300" src="../assets/reddit_logo.svg">
        <h1>Reddit Recommendations</h1>
        <div class="input-group input-group-lg input-group--username">
          <input
            @keyup.enter="searchRequest()"
            type="text"
            v-model="searchString"
            class="form-control username-input"
            placeholder="Ex. ramen nyc, over-ear headphones"
            aria-describedby="u-addon"
            autocapitalize="off"
            autocorrect="off"
          >
          <span class="input-group-btn">
            <button
              @click="searchRequest()"
              class="btn btn-secondary"
              type="button"
              :disabled="isLoading"
            >Search!</button>
          </span>
        </div>
      </div>
    </header>
    <div class="container container--summary">
      <div v-if="isLoading" class="ajax-loader d-flex justify-content-center">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p v-show="notFound">Not found</p>
      <div v-show="valid">
        <rec-summary
          :searchString="searchString"
          :topSubreddits="topSubreddits"
          :extractedWords="extractedWords"
          :isLoading="isLoading"
          :allComments="allComments"
        ></rec-summary>
      </div>
    </div>
  </div>
</template>

<script>
import RecSummary from 'components/RecSummary'
import axios from 'axios';
export default {
  name: 'RecCore',
  components:{
    RecSummary,
  },
  data() {
    return {
      searchData: {},
      topSubreddits: [],
      extractedWords: [],
      allComments: [],
      searchString: '',
      isLoading: false,
      notFound: false,
      noPosts: false,
      finished: {
        subreddits: false,
        extracted:  false,
      },
    }
  },
  computed:{
    valid(){
      return this.finished.subreddits && this.finished.extracted
    },
  },
  mounted(){
    this.$watch('searchString', () => {
      this.reset()
    })
    if (window.location.hash !== '') {
      this.username = window.location.hash
        .split('#')
        .pop()
        .trim()
      this.searchRequest()
    }
  },
  methods: {
    reset() {
      this.notFound = false
      this.searchData = {},
      this.topSubreddits = [],
      this.allComments = [],
      this.extractedWords = []
      this.finished.subreddits = false
      this.finished.extracted = false
    },
    doSearch(payload) {
      const path = 'http://localhost:5000/search';
      axios.post(path, payload)
        .then((res) => {
          this.searchData = JSON.parse(res.data)
          this.findComments()
          this.findSubreddits()
          this.findExtracted()
          this.isLoading = false
        })
        .catch((error) => {
          // eslint-disable-next-line
          this.notFound = true
          this.isLoading = false
          alert(error)
          console.log(error);
        });
    },
    searchRequest() {
      if (this.searchString === '') return

      this.reset()

      document.title = `Extraction for search: ${this.searchString}`
      window.history.replaceState({}, '', `#${this.searchString}`)

      this.isLoading = true

      const payload = {
        search: this.searchString
      };
      this.doSearch(payload)
    },
    findComments(){
      this.allComments = this.searchData.body
    },
    findSubreddits(){
      //output format = [{'name':'FoodNYC','count':'9'},{'name':'nyc','count':'10'}]
      
      let subredditCounts = []
      for(let sr in this.searchData.subreddit){
        let eleVal = this.searchData.subreddit[sr] //json is returned like "subreddit":{ "0":"TheSilphRoad", "1":"AnotherSubreddit"}
        let found = subredditCounts.find(ele => ele.name === eleVal) //if subreddit string already in list, just update count
        if (found){
          found.count++
        }
        else{
          subredditCounts.push({'name':eleVal,'count':1})
        }
      }
      
      subredditCounts.sort((a, b) => b.count - a.count)
      this.topSubreddits = subredditCounts
      this.finished.subreddits = true
    },
    findExtracted(){
      //extracted format [{'entity':'Ippudo','count': '10'}, {'entity':'Mu Ramen','count': '19'}]
      let dictOfExtracted = this.searchData.extracted

      let totalExtractedStrings = new Set()
      let toBeBuilt = []

      for(let listE in dictOfExtracted){
        if(dictOfExtracted.hasOwnProperty(listE)){
          if(dictOfExtracted[listE].length !== 0 ){

            let entitiesList = dictOfExtracted[listE]
            for(var i = 0;i<entitiesList.length;i++){
              let entName = entitiesList[i][0]
                if(totalExtractedStrings.has(entName)){
                  let found = toBeBuilt.find(ele => ele.entity === entName)
                  if(found){
                    found.count++
                  }
                }
                else{
                  totalExtractedStrings.add(entName)
                  toBeBuilt.push({'entity':entName,'count':1})
                }
            }
          }
        }
      }

      this.extractedWords = toBeBuilt
      this.extractedWords.sort((a, b) => b.count - a.count)
      this.finished.extracted = true
    },
  },
}
</script>

<style lang="scss">
/*! Ripple.js v1.2.1
     * The MIT License (MIT)
     * Copyright (c) 2014 Jacob Kelley */
.has-ripple {
  position: relative;
  overflow: hidden;
  -webkit-transform: translate3d(0, 0, 0);
  -o-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
.ripple {
  display: block;
  position: absolute;
  pointer-events: none;
  border-radius: 50%;
  -webkit-transform: scale(0);
  -o-transform: scale(0);
  transform: scale(0);
  background: #fff;
  opacity: 1;
}
.ripple-animate {
  -webkit-animation: ripple;
  -o-animation: ripple;
  animation: ripple;
}
@-webkit-keyframes ripple {
  100% {
    opacity: 0;
    -webkit-transform: scale(2);
    transform: scale(2);
  }
}
@-o-keyframes ripple {
  100% {
    opacity: 0;
    -o-transform: scale(2);
    transform: scale(2);
  }
}
@keyframes ripple {
  100% {
    opacity: 0;
    transform: scale(2);
  }
}

$text: #aebed4;

body {
  font-family: 'Avenir', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
  background-color: #271b68;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #cad6e6;
}
a {
  color: #6edbff;

  &:hover,
  &:focus {
    color: lighten(#6edbff, 10);
  }
}

.section-illustration {
  max-width: 100%;
  width: 250px;
}

.center {
  text-align: center;
}

header {
  position: relative;
  background: #474ebd;
  background: radial-gradient(circle at 50% 1%, #474ebd, #371c84);
  padding: 2rem 0 2rem;
  margin-bottom: 3rem;
  box-shadow: 0 10px 80px -2px rgba(0, 0, 0, 0.4);
  overflow: hidden;

  &::before {
    display: inline-block;
    opacity: 0.8;
    content: '';
    height: 800px;
    width: 200%;
    background: url('../assets/ocean.svg') no-repeat;
    left: 50%;
    transform: translateX(-50%);
    top: 100px;
    position: absolute;
    background-position: center;
    background-size: contain;
  }
}
h1 {
  font-weight: 300;
  margin-bottom: 2rem;
  color: white;
}
.input-group {
  &--username {
    position: relative;
  }
}
.username-input {
  font-size: 1.1rem !important;
  padding: 0.8rem 1rem !important;
  position: relative;
  background: rgba(0, 10, 25, 0.5);
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-bottom-color: rgba(0, 0, 0, 0.5);
  box-shadow: 0 5px 12px -2px rgba(0, 0, 0, 0.3);
  font-weight: 300;
  color: lighten($text, 10);
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;

  &:hover {
    box-shadow: 0 10px 30px -2px rgba(0, 0, 0, 0.3);
    z-index: 0;
  }

  &:focus {
    z-index: 0;
    background: rgba(0, 0, 0, 0.3);
    color: white;
  }

  &::-webkit-input-placeholder {
    color: rgba(255, 255, 255, 0.4);
    font-size: 1.1rem;
  }
  &::-moz-input-placeholder {
    color: rgba(255, 255, 255, 0.4);
    font-size: 1.1rem;
  }
  &:-ms-input-placeholder {
    color: rgba(255, 255, 255, 0.4);
    font-size: 1.1rem;
  }
}
.input-group-addon {
  padding: 0 1rem;
}
.btn {
  background-color: transparent;
  color: #61efa7;
  border: none;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 17px !important;
  cursor: pointer;
  z-index: 1;
  padding: 1rem !important;
  font-size: 0.9rem !important;
  box-shadow: 0 5px 12px -2px rgba(0, 0, 0, 0.3);

  &:disabled {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    z-index: 1;
  }

  &:active {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
  }

  &:focus {
    box-shadow: 0 0 0 2px rgba(153, 236, 167, 0.5);
  }
}
#u-addon {
  background: linear-gradient(115deg, #ff79aa, #b743ff);
  box-shadow: 0 5px 20px -2px rgba(200, 50, 150, 0.7);
  border: none;
  color: white;
  font-weight: 700;
  padding: 0 0.75rem;
}
.header-section {
  max-width: 900px;
}
.comment {
  word-wrap: break-word;
}
.summary {
  text-align: left;
}
@keyframes ajax {
  50% {
    transform: scale(2.5);
    box-shadow: 0 8px 50px -4px rgba(0, 50, 150, 0.2);
  }
  100% {
    transform: scale(1);
  }
}
.ajax-loader {
  div {
    width: 10px;
    height: 10px;
    background-color: #e089d9;
    border-radius: 50%;
    margin: 0 1rem;
    animation: ajax 0.8s ease infinite;

    &:nth-child(2) {
      background-color: #ffa9a9;
      animation-delay: 0.1s;
    }
    &:nth-child(3) {
      background-color: #ffd578;
      animation-delay: 0.2s;
    }
    &:nth-child(4) {
      background-color: #a6d5e6;
      animation-delay: 0.3s;
    }
  }
}
.input-group-btn {
  background: rgba(0, 10, 25, 0.5);
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-left: none;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
@media (min-width: 576px) {
  .username-input {
    font-size: 1.25rem !important;
    padding: 0.75rem 1.5rem !important;

    &::-webkit-input-placeholder {
      font-size: 1.25rem;
    }
    &::-moz-input-placeholder {
      font-size: 1.25rem;
    }
    &:-ms-input-placeholder {
      font-size: 1.25rem;
    }
  }

  .btn {
    padding: 0 1.5rem !important;
    font-size: 1rem !important;
  }
}

.v2-alert {
  padding: 0.5rem 1rem;
  background-color: #10113d;
  font-size: 0.9rem;
}
</style>
