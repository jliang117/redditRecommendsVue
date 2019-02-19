webpackJsonp([1],{179:function(M,t,e){var i=e(120)(e(200),e(453),null,null);M.exports=i.exports},200:function(M,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=e(450),N=e.n(i);t.default={name:"app",components:{RecCore:N.a}}},201:function(M,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=e(205),N=e.n(i),s=e(451),n=e.n(s),I=e(182),D=e.n(I);t.default={name:"RecCore",components:{RecSummary:n.a},data:function(){return{searchData:{},topSubreddits:[],extractedWords:[],allComments:[],highScores:[],permalinks:[],searchString:"",isLoading:!1,notFound:!1,noPosts:!1,finished:{subreddits:!1,extracted:!1}}},computed:{valid:function(){return this.finished.subreddits&&this.finished.extracted}},mounted:function(){var M=this;this.$watch("searchString",function(){M.reset()}),""!==window.location.hash&&(this.username=window.location.hash.split("#").pop().trim(),this.searchRequest())},methods:{reset:function(){this.notFound=!1,this.searchData={},this.topSubreddits=[],this.allComments=[],this.extractedWords=[],this.highScores=[],this.permalinks=[],this.finished.subreddits=!1,this.finished.extracted=!1},doSearch:function(M){var t=this;console.log("requesting search");D.a.post("http://localhost:5000/search",M).then(function(M){t.searchData=JSON.parse(M.data),t.findComments(),t.findPermalinks(),t.findSubreddits(),t.findExtracted(),t.findTopComment(),t.isLoading=!1}).catch(function(M){t.notFound=!0,t.isLoading=!1,alert(M),console.log(M)})},searchRequest:function(){if(""!==this.searchString){this.reset(),document.title="Extraction for search: "+this.searchString,window.history.replaceState({},"","#"+this.searchString),this.isLoading=!0;var M={search:this.searchString};this.doSearch(M)}},findComments:function(){console.log("setting comments"),this.allComments=this.searchData.body},findPermalinks:function(){console.log("setting permalinks"),this.permalinks=this.searchData.permalink},findSubreddits:function(){var M=this;console.log("building extracted subreddits");var t=[];for(var e in this.searchData.subreddit)!function(e){var i=M.searchData.subreddit[e],N=t.find(function(M){return M.name===i});N?N.count++:t.push({name:i,count:1})}(e);t.sort(function(M,t){return t.count-M.count}),this.topSubreddits=t,this.finished.subreddits=!0},findExtracted:function(){console.log("building extracted entities");var M=this.searchData.extracted,t=new N.a,e=[];for(var i in M)if(M.hasOwnProperty(i)&&0!==M[i].length)for(var s=M[i],n=0;n<s.length;n++)!function(){var M=s[n];if(t.has(M)){var i=e.find(function(t){return t.entity===M});i&&i.count++}else t.add(M),e.push({entity:M,count:1})}();this.extractedWords=e,this.extractedWords.sort(function(M,t){return t.count-M.count}),this.finished.extracted=!0},findTopComment:function(){var M=this.searchData.score;for(var t in M)this.highScores.push({score:M[t],index:t});this.highScores.sort(function(M,t){return t.score-M.score})}}}},202:function(M,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=e(204),N=e.n(i);t.default={name:"rec-summary",props:["searchString","isLoading","topSubreddits","extractedWords","allComments","topComments","permalinks"],data:function(){return{numSubreddits:10,numFrequentWords:15,numTopComments:5}},methods:{commentLink:function(M){return"https://www.reddit.com"+this.permalinks[M]},subredditLink:function(M){return"https://www.reddit.com/r/"+M+"/"},wordLink:function(M){return"https://www.google.com/search?q="+encodeURIComponent(M)+" "+this.searchString},googleLink:function(){return"https://www.google.com/search?q="+encodeURIComponent(this.searchString+" site:reddit.com")},percentageOf:function(M){return Math.round(100*M/N()(this.allComments).length)}},computed:{topWords:function(){if(this.extractedWords.length&&!isNaN(this.numFrequentWords)){var M=this.extractedWords.slice(0);return M.length>this.numFrequentWords&&(M.length=this.numFrequentWords),M}},topSubs:function(){if(this.topSubreddits.length&&!isNaN(this.numSubreddits)){var M=this.topSubreddits.slice(0);return M.length>this.numSubreddits&&(M.length=this.numSubreddits),M}},topScoring:function(){if(this.topComments.length&&!isNaN(this.numTopComments)){var M=this.topComments.slice(0);return M.length>this.numTopComments&&(M.length=this.numTopComments),M}}}}},203:function(M,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=e(181),N=e.n(i),s=e(180),n=e(179),I=e.n(n),D=e(178);e.n(D);N.a.use(s.a),new N.a({el:"#app",template:"<App/>",components:{App:I.a}})},443:function(M,t){},444:function(M,t){},449:function(M,t){M.exports="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDAwcHgiIGhlaWdodD0iMzAwcHgiIHZpZXdCb3g9IjAgMCA0MDAgMzAwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0MS4yICgzNTM5NykgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+QXJ0Ym9hcmQ8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz4KICAgICAgICA8bGluZWFyR3JhZGllbnQgeDE9IjUwJSIgeTE9IjAlIiB4Mj0iNTAlIiB5Mj0iMTAwJSIgaWQ9ImxpbmVhckdyYWRpZW50LTEiPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjRkZBOUE5IiBvZmZzZXQ9IjAlIj48L3N0b3A+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiNGRjcwNzAiIG9mZnNldD0iMTAwJSI+PC9zdG9wPgogICAgICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8L2RlZnM+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iQXJ0Ym9hcmQiPgogICAgICAgICAgICA8cG9seWxpbmUgaWQ9IlBhdGgtMiIgc3Ryb2tlPSIjRTA4OUQ5IiBzdHJva2Utd2lkdGg9IjciIHBvaW50cz0iMTk4LjE4OTQ1OSAxNDIuNjMyMjI4IDIxMi4xNTAwMTMgOTguMTIzODI4OSAyNDkuMTQ2NjY3IDEwNy4wMTIwMTkiPjwvcG9seWxpbmU+CiAgICAgICAgICAgIDxjaXJjbGUgaWQ9Ik92YWwtMiIgc3Ryb2tlPSIjRTA4OUQ4IiBzdHJva2Utd2lkdGg9IjciIGN4PSIyNjUuNzc2Njc4IiBjeT0iMTA5LjY1ODEzMSIgcj0iMTQiPjwvY2lyY2xlPgogICAgICAgICAgICA8ZWxsaXBzZSBpZD0iT3ZhbCIgc3Ryb2tlPSJ1cmwoI2xpbmVhckdyYWRpZW50LTEpIiBzdHJva2Utd2lkdGg9IjciIGN4PSIxOTcuNjEzODkxIiBjeT0iMjAwLjE0Mjc1IiByeD0iNzUuOTMwNjIzMiIgcnk9IjU3LjM2OTM4Ij48L2VsbGlwc2U+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0yNTMuMjE1Mzk2LDE2MS4zMTg0NTUgQzIzOS4zMzA3NjgsMTQ5LjgzNTU0IDIxOS4zNDk3NDQsMTQyLjYzMjIyOCAxOTcuMTQxOTY2LDE0Mi42MzIyMjggQzE3NS42NDQyNzIsMTQyLjYzMjIyOCAxNTYuMjMzMjA5LDE0OS4zODIyNTkgMTQyLjQxODk3MiwxNjAuMjMwMTk0IEMxMzkuMzQyNDE1LDE1Ni43MjAyNzkgMTM1LjAzNzMzMSwxNTQuNTM5NDM5IDEzMC4yNzI1MDksMTU0LjUzOTQzOSBDMTIwLjkyMjIxOCwxNTQuNTM5NDM5IDExMy4zNDIzMSwxNjIuOTM3NTM0IDExMy4zNDIzMSwxNzMuMjk3MTEgQzExMy4zNDIzMSwxODAuNTAxMDI3IDExNy4wMDc2NzcsMTg2Ljc1NjQ0MyAxMjIuMzg0ODc2LDE4OS44OTg5NTkgQzEyMS42MTM3MDQsMTkzLjE3ODYwNiAxMjEuMjExMzQzLDE5Ni41NTQ2MDUgMTIxLjIxMTM0MywyMDAuMDAxNjA4IEMxMjEuMjExMzQzLDIzMS42ODU4NDIgMTU1LjIwNjY0MSwyNTcuMzcwOTg4IDE5Ny4xNDE5NjYsMjU3LjM3MDk4OCBDMjM5LjA3NzI5MSwyNTcuMzcwOTg4IDI3My4wNzI1ODksMjMxLjY4NTg0MiAyNzMuMDcyNTg5LDIwMC4wMDE2MDggQzI3My4wNzI1ODksMTk2LjkwMjE3MiAyNzIuNzQ3Mjc5LDE5My44NjAxNDMgMjcyLjEyMTA0OSwxOTAuODkzOTQ5IEMyNzguNTc0NTc0LDE4OC4yNDczNzUgMjgzLjE3NDYwOCwxODEuMzY3NDI2IDI4My4xNzQ2MDgsMTczLjI5NzExIEMyODMuMTc0NjA4LDE2Mi45Mzc1MzQgMjc1LjU5NDcsMTU0LjUzOTQzOSAyNjYuMjQ0NDEsMTU0LjUzOTQzOSBDMjYxLjAwNDY3OCwxNTQuNTM5NDM5IDI1Ni4zMjA4OTYsMTU3LjE3NjY3MyAyNTMuMjE1Mzk2LDE2MS4zMTg0NTUgWiIgaWQ9IkNvbWJpbmVkLVNoYXBlIiBzdHJva2U9InVybCgjbGluZWFyR3JhZGllbnQtMSkiIHN0cm9rZS13aWR0aD0iNyI+PC9wYXRoPgogICAgICAgICAgICA8ZWxsaXBzZSBpZD0iT3ZhbC0yIiBmaWxsPSIjZmZhMThmIiBjeD0iMTY2LjYyMjk0NCIgY3k9IjE5MS40OTE5NzEiIHJ4PSIxMi40MTA0MTc3IiByeT0iMTIuMzcxMDI1MSI+PC9lbGxpcHNlPgogICAgICAgICAgICA8ZWxsaXBzZSBpZD0iT3ZhbC0yIiBmaWxsPSIjZmZhMThmIiBjeD0iMjI4LjYwNDgzOSIgY3k9IjE5MS40OTE5NzEiIHJ4PSIxMi40MTA0MTc3IiByeT0iMTIuMzcxMDI1MSI+PC9lbGxpcHNlPgogICAgICAgICAgICA8cGF0aCBkPSJNMTY2LjYyMjk0NCwyMjQuMTE3MjgzIEMxNjYuNjIyOTQ0LDIyNC4xMTcyODMgMTgwLjQ5MjgxLDIzNS4yNjAyMTIgMTk4LjQ3ODg5NCwyMzUuMjYwMjEyIEMyMTYuNDY0OTc4LDIzNS4yNjAyMTIgMjI4LjYwNDgzOSwyMjQuNzIwNzIgMjI4LjYwNDgzOSwyMjQuNzIwNzIiIGlkPSJQYXRoLTMiIHN0cm9rZT0iI2FlZDRlNCIgc3Ryb2tlLXdpZHRoPSI3IiBzdHJva2UtbGluZWNhcD0icm91bmQiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTYzLjUsMTE3LjAwMjM5NiBMNTcuMTM1MTg1NCwxMTkuODIyOTQ1IEM1NS42MTg2OTA2LDEyMC40OTQ5NzUgNTQuNTI3NDg1NCwxMTkuNzAyOTM2IDU0LjY5ODA3NTMsMTE4LjA1MjI4MSBMNTUuNDEzNzQxLDExMS4xMjczODUgTDUwLjc2NDQwMzYsMTA1Ljk0NTY4NCBDNDkuNjU2NjQyMSwxMDQuNzExMDggNTAuMDcyNzE1MywxMDMuNDI4NTI5IDUxLjY5NTI5NjgsMTAzLjA4MDY4OSBMNTguNTAyNDE3MSwxMDEuNjIxNDE3IEw2MS45OTM3ODMxLDk1LjU5ODQwMSBDNjIuODI1NjQzNyw5NC4xNjMzNDM3IDY0LjE3Mzk5NjMsOTQuMTYyNzIyNyA2NS4wMDYyMTY5LDk1LjU5ODQwMSBMNjguNDk3NTgyOSwxMDEuNjIxNDE3IEw3NS4zMDQ3MDMyLDEwMy4wODA2ODkgQzc2LjkyNjU4MjgsMTAzLjQyODM3OSA3Ny4zNDM4MzczLDEwNC43MTA1NDYgNzYuMjM1NTk2NCwxMDUuOTQ1Njg0IEw3MS41ODYyNTksMTExLjEyNzM4NSBMNzIuMzAxOTI0NywxMTguMDUyMjgxIEM3Mi40NzI0NDA4LDExOS43MDIyMjIgNzEuMzgxOTY1NywxMjAuNDk1MjY2IDY5Ljg2NDgxNDYsMTE5LjgyMjk0NSBMNjMuNSwxMTcuMDAyMzk2IFoiIGlkPSJTdGFyIiBmaWxsPSIjRUFCRkZGIj48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0xNDEuMzQ4NDgyLDYwLjE1NTcwNTYgTDEzNC45ODM2NjgsNjIuOTc2MjU0NyBDMTMzLjQ2NzE3Myw2My42NDgyODUgMTMyLjM3NTk2OCw2Mi44NTYyNDU3IDEzMi41NDY1NTcsNjEuMjA1NTkwNSBMMTMzLjI2MjIyMyw1NC4yODA2OTQ1IEwxMjguNjEyODg2LDQ5LjA5ODk5MzcgQzEyNy41MDUxMjQsNDcuODY0MzkwMiAxMjcuOTIxMTk3LDQ2LjU4MTgzODggMTI5LjU0Mzc3OSw0Ni4yMzM5OTkgTDEzNi4zNTA4OTksNDQuNzc0NzI3IEwxMzkuODQyMjY1LDM4Ljc1MTcxMDcgQzE0MC42NzQxMjYsMzcuMzE2NjUzNSAxNDIuMDIyNDc4LDM3LjMxNjAzMjQgMTQyLjg1NDY5OSwzOC43NTE3MTA3IEwxNDYuMzQ2MDY1LDQ0Ljc3NDcyNyBMMTUzLjE1MzE4NSw0Ni4yMzM5OTkgQzE1NC43NzUwNjUsNDYuNTgxNjg4NCAxNTUuMTkyMzE5LDQ3Ljg2Mzg1NTkgMTU0LjA4NDA3OSw0OS4wOTg5OTM3IEwxNDkuNDM0NzQxLDU0LjI4MDY5NDUgTDE1MC4xNTA0MDcsNjEuMjA1NTkwNSBDMTUwLjMyMDkyMyw2Mi44NTU1MzE2IDE0OS4yMzA0NDgsNjMuNjQ4NTc1OCAxNDcuNzEzMjk3LDYyLjk3NjI1NDcgTDE0MS4zNDg0ODIsNjAuMTU1NzA1NiBaIiBpZD0iU3RhciIgZmlsbD0iI0E4Q0RDQyI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNMzU4LjY4NDc2NSw5Mi44NzkzNDg1IEwzNTUuNTk1MDMzLDk0LjI0ODU1NDMgQzM1NC4wNzc0MzIsOTQuOTIxMDc0OCAzNTIuOTg0NzczLDk0LjEzNDgyNDEgMzUzLjE1NjE0NSw5Mi40NzY1OTg2IEwzNTMuNTAzNTU4LDg5LjExNDk4MDkgTDM1MS4yNDY1ODYsODYuNTk5NTc4OSBDMzUwLjEzODAxNiw4NS4zNjQwNzQ4IDM1MC41NDgxMzUsODQuMDgxOTI5NCAzNTIuMTc4MTU4LDgzLjczMjQ5NDMgTDM1NS40ODI2MDMsODMuMDI0MTA2MSBMMzU3LjE3NzQ1LDgwLjEwMDI5NjMgQzM1OC4wMDk5MTcsNzguNjY0MTkyMyAzNTkuMzU2MDQzLDc4LjY1ODAzMzcgMzYwLjE5MjA4MSw4MC4xMDAyOTYzIEwzNjEuODg2OTI4LDgzLjAyNDEwNjEgTDM2NS4xOTEzNzIsODMuNzMyNDk0MyBDMzY2LjgxNDQzNSw4NC4wODA0MzczIDM2Ny4yMzYyNjgsODUuMzU4Nzc2NCAzNjYuMTIyOTQ1LDg2LjU5OTU3ODkgTDM2My44NjU5NzMsODkuMTE0OTgwOSBMMzY0LjIxMzM4NSw5Mi40NzY1OTg2IEMzNjQuMzg0MDI2LDk0LjEyNzc0MzIgMzYzLjI5ODYwNyw5NC45MjM5NTg5IDM2MS43NzQ0OTcsOTQuMjQ4NTU0MyBMMzU4LjY4NDc2NSw5Mi44NzkzNDg1IFoiIGlkPSJTdGFyIiBmaWxsPSIjRkY5QzY1Ij48L3BhdGg+CiAgICAgICAgICAgIDxjaXJjbGUgaWQ9Ik92YWwtNCIgZmlsbD0iI0ZDN0Q1RSIgY3g9IjU2IiBjeT0iMzIiIHI9IjUiPjwvY2lyY2xlPgogICAgICAgICAgICA8Y2lyY2xlIGlkPSJPdmFsLTQiIGZpbGw9IiNCRjk5RkYiIGN4PSI0OCIgY3k9IjE3OS4xMjA5NDYiIHI9IjUiPjwvY2lyY2xlPgogICAgICAgICAgICA8Y2lyY2xlIGlkPSJPdmFsLTQiIGZpbGw9IiNGRkQ1NzgiIGN4PSIzMDkuNTg4NDM2IiBjeT0iMzgiIHI9IjciPjwvY2lyY2xlPgogICAgICAgICAgICA8cGF0aCBkPSJNMjE4LjIwMzE3NSwyNCBDMjE5Ljg2MDAyOSwyNCAyMjEuMjAzMTc1LDIyLjY1Njg1NDIgMjIxLjIwMzE3NSwyMSBDMjIxLjIwMzE3NSwxOS4zNDMxNDU4IDIxOS44NjAwMjksMTggMjE4LjIwMzE3NSwxOCBDMjE2LjU0NjMyMSwxOCAyMTUuMjAzMTc1LDE5LjM0MzE0NTggMjE1LjIwMzE3NSwyMSBDMjE1LjIwMzE3NSwyMi42NTY4NTQyIDIxNi41NDYzMjEsMjQgMjE4LjIwMzE3NSwyNCBaIE0yMzQuMjAzMTc1LDQwIEMyMzUuODYwMDI5LDQwIDIzNy4yMDMxNzUsMzguNjU2ODU0MiAyMzcuMjAzMTc1LDM3IEMyMzcuMjAzMTc1LDM1LjM0MzE0NTggMjM1Ljg2MDAyOSwzNCAyMzQuMjAzMTc1LDM0IEMyMzIuNTQ2MzIxLDM0IDIzMS4yMDMxNzUsMzUuMzQzMTQ1OCAyMzEuMjAzMTc1LDM3IEMyMzEuMjAzMTc1LDM4LjY1Njg1NDIgMjMyLjU0NjMyMSw0MCAyMzQuMjAzMTc1LDQwIFogTTIxOC4yMDMxNzUsNTYgQzIxOS44NjAwMjksNTYgMjIxLjIwMzE3NSw1NC42NTY4NTQyIDIyMS4yMDMxNzUsNTMgQzIyMS4yMDMxNzUsNTEuMzQzMTQ1OCAyMTkuODYwMDI5LDUwIDIxOC4yMDMxNzUsNTAgQzIxNi41NDYzMjEsNTAgMjE1LjIwMzE3NSw1MS4zNDMxNDU4IDIxNS4yMDMxNzUsNTMgQzIxNS4yMDMxNzUsNTQuNjU2ODU0MiAyMTYuNTQ2MzIxLDU2IDIxOC4yMDMxNzUsNTYgWiBNMjAyLjIwMzE3NSw0MCBDMjAzLjg2MDAyOSw0MCAyMDUuMjAzMTc1LDM4LjY1Njg1NDIgMjA1LjIwMzE3NSwzNyBDMjA1LjIwMzE3NSwzNS4zNDMxNDU4IDIwMy44NjAwMjksMzQgMjAyLjIwMzE3NSwzNCBDMjAwLjU0NjMyMSwzNCAxOTkuMjAzMTc1LDM1LjM0MzE0NTggMTk5LjIwMzE3NSwzNyBDMTk5LjIwMzE3NSwzOC42NTY4NTQyIDIwMC41NDYzMjEsNDAgMjAyLjIwMzE3NSw0MCBaIE0yMjcuMzk1NTYzLDI3LjgwNzYxMTggQzIyOC41NjcxMzYsMjguOTc5MTg0NyAyMzAuNDY2NjMxLDI4Ljk3OTE4NDcgMjMxLjYzODIwNCwyNy44MDc2MTE4IEMyMzIuODA5Nzc3LDI2LjYzNjAzOSAyMzIuODA5Nzc3LDI0LjczNjU0NCAyMzEuNjM4MjA0LDIzLjU2NDk3MTIgQzIzMC40NjY2MzEsMjIuMzkzMzk4MyAyMjguNTY3MTM2LDIyLjM5MzM5ODMgMjI3LjM5NTU2MywyMy41NjQ5NzEyIEMyMjYuMjIzOTksMjQuNzM2NTQ0IDIyNi4yMjM5OSwyNi42MzYwMzkgMjI3LjM5NTU2MywyNy44MDc2MTE4IFogTTIyNy4zOTU1NjMsNTAuNDM1MDI4OCBDMjI4LjU2NzEzNiw1MS42MDY2MDE3IDIzMC40NjY2MzEsNTEuNjA2NjAxNyAyMzEuNjM4MjA0LDUwLjQzNTAyODggQzIzMi44MDk3NzcsNDkuMjYzNDU2IDIzMi44MDk3NzcsNDcuMzYzOTYxIDIzMS42MzgyMDQsNDYuMTkyMzg4MiBDMjMwLjQ2NjYzMSw0NS4wMjA4MTUzIDIyOC41NjcxMzYsNDUuMDIwODE1MyAyMjcuMzk1NTYzLDQ2LjE5MjM4ODIgQzIyNi4yMjM5OSw0Ny4zNjM5NjEgMjI2LjIyMzk5LDQ5LjI2MzQ1NiAyMjcuMzk1NTYzLDUwLjQzNTAyODggWiBNMjA0Ljc2ODE0Niw1MC40MzUwMjg4IEMyMDUuOTM5NzE5LDUxLjYwNjYwMTcgMjA3LjgzOTIxNCw1MS42MDY2MDE3IDIwOS4wMTA3ODcsNTAuNDM1MDI4OCBDMjEwLjE4MjM2LDQ5LjI2MzQ1NiAyMTAuMTgyMzYsNDcuMzYzOTYxIDIwOS4wMTA3ODcsNDYuMTkyMzg4MiBDMjA3LjgzOTIxNCw0NS4wMjA4MTUzIDIwNS45Mzk3MTksNDUuMDIwODE1MyAyMDQuNzY4MTQ2LDQ2LjE5MjM4ODIgQzIwMy41OTY1NzMsNDcuMzYzOTYxIDIwMy41OTY1NzMsNDkuMjYzNDU2IDIwNC43NjgxNDYsNTAuNDM1MDI4OCBaIE0yMDQuNzY4MTQ2LDI3LjgwNzYxMTggQzIwNS45Mzk3MTksMjguOTc5MTg0NyAyMDcuODM5MjE0LDI4Ljk3OTE4NDcgMjA5LjAxMDc4NywyNy44MDc2MTE4IEMyMTAuMTgyMzYsMjYuNjM2MDM5IDIxMC4xODIzNiwyNC43MzY1NDQgMjA5LjAxMDc4NywyMy41NjQ5NzEyIEMyMDcuODM5MjE0LDIyLjM5MzM5ODMgMjA1LjkzOTcxOSwyMi4zOTMzOTgzIDIwNC43NjgxNDYsMjMuNTY0OTcxMiBDMjAzLjU5NjU3MywyNC43MzY1NDQgMjAzLjU5NjU3MywyNi42MzYwMzkgMjA0Ljc2ODE0NiwyNy44MDc2MTE4IFoiIGlkPSJDb21iaW5lZC1TaGFwZSIgZmlsbD0iI0ZGRDU3OCI+PC9wYXRoPgogICAgICAgICAgICA8Y2lyY2xlIGlkPSJPdmFsLTQiIHN0cm9rZT0iI0E4Q0RDQyIgc3Ryb2tlLXdpZHRoPSIzIiBjeD0iMzc3LjE3NDQyMSIgY3k9IjE3OS4xMjA5NDYiIHI9IjEwLjQyODk4Ij48L2NpcmNsZT4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo="},450:function(M,t,e){e(443);var i=e(120)(e(201),e(452),null,null);M.exports=i.exports},451:function(M,t,e){e(444);var i=e(120)(e(202),e(454),null,null);M.exports=i.exports},452:function(M,t,e){M.exports={render:function(){var M=this,t=M.$createElement,i=M._self._c||t;return i("div",{attrs:{id:"main"}},[i("header",[i("div",{staticClass:"container header-section"},[i("img",{attrs:{width:"300",src:e(449)}}),M._v(" "),i("h1",[M._v("Reddit Recommendations")]),M._v(" "),i("div",{staticClass:"input-group input-group-lg input-group--username"},[i("input",{directives:[{name:"model",rawName:"v-model",value:M.searchString,expression:"searchString"}],staticClass:"form-control username-input",attrs:{type:"text",placeholder:"Ex. ramen nyc, over-ear headphones","aria-describedby":"u-addon",autocapitalize:"off",autocorrect:"off"},domProps:{value:M.searchString},on:{keyup:function(t){if(!("button"in t)&&M._k(t.keyCode,"enter",13,t.key,"Enter"))return null;M.searchRequest()},input:function(t){t.target.composing||(M.searchString=t.target.value)}}}),M._v(" "),i("span",{staticClass:"input-group-btn"},[i("button",{staticClass:"btn btn-secondary",attrs:{type:"button",disabled:M.isLoading},on:{click:function(t){M.searchRequest()}}},[M._v("Search!")])])])])]),M._v(" "),i("div",{staticClass:"container container--summary"},[M.isLoading?i("div",{staticClass:"ajax-loader d-flex justify-content-center"},[i("div"),M._v(" "),i("div"),M._v(" "),i("div"),M._v(" "),i("div")]):M._e(),M._v(" "),i("p",{directives:[{name:"show",rawName:"v-show",value:M.notFound,expression:"notFound"}]},[M._v("Not found")]),M._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:M.valid,expression:"valid"}]},[i("rec-summary",{attrs:{searchString:M.searchString,isLoading:M.isLoading,allComments:M.allComments,topSubreddits:M.topSubreddits,extractedWords:M.extractedWords,topComments:M.highScores,permalinks:M.permalinks}})],1)])])},staticRenderFns:[]}},453:function(M,t){M.exports={render:function(){var M=this,t=M.$createElement,e=M._self._c||t;return e("div",{attrs:{id:"app"}},[e("rec-core")],1)},staticRenderFns:[]}},454:function(M,t){M.exports={render:function(){var M=this,t=M.$createElement,e=M._self._c||t;return e("section",{staticClass:"summary"},[e("div",{staticClass:"container"},[e("h2",[M._v("\n        Overview for search:\n        "),e("a",{attrs:{target:"_blank",href:M.googleLink()}},[M._v(M._s(M.searchString))])]),M._v(" "),M._m(0),M._v(" "),e("hr"),M._v(" "),e("h3",[M._v("Most frequent named entities")]),M._v(" "),e("div",{staticClass:"input-group input-group-lg input-rangeslider"},[e("input",{directives:[{name:"model",rawName:"v-model",value:M.numFrequentWords,expression:"numFrequentWords"}],attrs:{type:"range",min:"1",max:"100",step:"1"},domProps:{value:M.numFrequentWords},on:{__r:function(t){M.numFrequentWords=t.target.value}}})]),M._v(" "),e("ul",{staticClass:"d-flex flex-wrap justify-content-center"},M._l(M.topWords,function(t){return e("li",{key:t.entity,staticClass:"card card--dark"},[e("a",{attrs:{target:"_blank",href:M.wordLink(t.entity)}},[M._v("\n            "+M._s(t.entity)+"\n            "),e("small",[M._v(M._s(t.count)+" times")])])])})),M._v(" "),e("hr"),M._v(" "),e("h3",[M._v("Top subreddits")]),M._v(" "),e("div",{staticClass:"input-group input-group-lg input-rangeslider"},[e("input",{directives:[{name:"model",rawName:"v-model",value:M.numSubreddits,expression:"numSubreddits"}],attrs:{type:"range",min:"1",max:"100",step:"1"},domProps:{value:M.numSubreddits},on:{__r:function(t){M.numSubreddits=t.target.value}}})]),M._v(" "),e("ul",{staticClass:"d-flex flex-wrap justify-content-center"},M._l(M.topSubs,function(t){return e("li",{key:t.name,staticClass:"card card--dark"},[e("a",{attrs:{target:"_blank",href:M.subredditLink(t.name)}},[M._v("\n            /r/"+M._s(t.name)+"\n              "),e("div",[e("small",[M._v(M._s(t.count)+" "+M._s(1==t.count?"comment":"comments")+" ("+M._s(M.percentageOf(t.count))+"%)")])])])])})),M._v(" "),e("hr"),M._v(" "),e("h3",[M._v("Top scoring comments")]),M._v(" "),e("div",{staticClass:"input-group input-group-lg input-rangeslider"},[e("input",{directives:[{name:"model",rawName:"v-model",value:M.numTopComments,expression:"numTopComments"}],attrs:{type:"range",min:"1",max:"100",step:"1"},domProps:{value:M.numTopComments},on:{__r:function(t){M.numTopComments=t.target.value}}})]),M._v(" "),e("ul",{staticClass:"d-flex flex-wrap justify-content-center"},M._l(M.topScoring,function(t){return e("li",{key:t.index,staticClass:"card card--dark"},[e("a",{attrs:{target:"_blank",href:M.commentLink(t.index)}},[M._v("\n              "+M._s(M.allComments[t.index])+"\n              "),e("div",[e("small",[M._v(M._s(t.score))]),M._v(" points\n              ")])])])}))])])},staticRenderFns:[function(){var M=this,t=M.$createElement,e=M._self._c||t;return e("p",[e("small",[M._v("*Data is available from up to one page of google searches (trust me, you don't wanna go past the first page)")])])}]}},456:function(M,t){}},[203]);