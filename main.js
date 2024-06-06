(()=>{"use strict";function e(){const e={totalhealth:10};return{battleship:{health:4,length:4,sunk:!1,legend:1},submarine:{health:3,length:3,sunk:!1,legend:2},cruiser:{health:2,length:2,sunk:!1,legend:3},gunship:{health:1,length:1,sunk:!1,legend:4},hit:t=>{e.totalhealth-=1,t.health-=1,0===t.health&&(t.sunk=!0)},state:e}}function t(e){return Math.floor(Math.random()*(e+1))}function n(e,n,o){if(1===t(1)){let o,r,l;do{l=!1,r=t(7-e.length),o=t(7);for(let t=0;t<e.length;t++)if(0!==n.grid[r+t][o]){l=!0;break}}while(l);for(let t=0;t<e.length;t++)n.grid[r+t][o]=e.legend}else{let o,r,l;do{l=!1,r=t(7),o=t(7-e.length);for(let t=0;t<e.length;t++)if(0!==n.grid[r][o+t]){l=!0;break}}while(l);for(let t=0;t<e.length;t++)n.grid[r][o+t]=e.legend}}function o(){return{grid:Array.from({length:8},(()=>Array(8).fill(0))),place:(e,o)=>{!function(e,n){if(1===t(1)){let o=t(7-e.length),r=t(7);for(let t=0;t<e.length;t++)n.grid[o+t][r]=1}else{let o=t(7),r=t(7-e.length);for(let t=0;t<e.length;t++)n.grid[o][r+t]=1}}(e.battleship,o),n(e.submarine,o),n(e.cruiser,o),n(e.gunship,o)},receiveAttack:(e,t,n)=>{const o=t.grid[n[0]][n[1]];if(0!==o)switch(t.grid[n[0]][n[1]]=5,o){case 1:e.hit(e.battleship);break;case 2:e.hit(e.submarine);break;case 3:e.hit(e.cruiser);break;case 4:e.hit(e.gunship);break;default:console.log("Error")}else t.grid[n[0]][n[1]]=6}}}function r(){const t=new o;return{ship:new e,board:t}}const l=document.getElementById("player-board"),a=document.getElementById("opponent-board"),i=document.querySelector("#obattleship"),c=document.querySelector("#osubmarine"),d=document.querySelector("#ocruiser"),s=document.querySelector("#ogunboat"),h=document.querySelector("#pbattleship"),u=document.querySelector("#psubmarine"),p=document.querySelector("#pcruiser"),g=document.querySelector("#pgunboat"),b=document.querySelector(".game-status");function f(e,t){!0===e.sunk&&(t.textContent="Sunk!")}function m(){for(let e=0;e<8;e++)for(let t=0;t<8;t++){const n=document.querySelector(`#p${e}${t}`);if(0!==C.board.grid[e][t])switch(C.board.grid[e][t]){case 1:case 2:case 3:case 4:n.style.backgroundColor="pink";break;case 5:n.style.backgroundColor="red";break;case 6:n.style.backgroundColor="black";break;default:console.log("Error")}}f(C.ship.battleship,h),f(C.ship.submarine,u),f(C.ship.cruiser,p),f(C.ship.gunship,g),f(y.ship.battleship,i),f(y.ship.submarine,c),f(y.ship.cruiser,d),f(y.ship.gunship,s),0===C.ship.state.totalhealth&&(b.textContent="CPU Wins",document.querySelectorAll(".cell").forEach((e=>{const t=e.cloneNode(!0);e.parentNode.replaceChild(t,e)}))),0===y.ship.state.totalhealth&&(b.textContent="Player Wins",document.querySelectorAll(".cell").forEach((e=>{const t=e.cloneNode(!0);e.parentNode.replaceChild(t,e)})))}function k(e){const t=document.createElement("div");t.classList.add("board");for(let n=0;n<8;n++)for(let o=0;o<8;o++){const r=document.createElement("div");if(r.classList.add("cell"),r.textContent=`${n}${o}`,r.id=`${e}${n}${o}`,t.appendChild(r),"o"===e){const e=()=>{let t,l;r.style.backgroundColor="black",y.board.receiveAttack(y.ship,y.board,[`${n}`,`${o}`]),5===y.board.grid[`${n}`][`${o}`]&&(r.style.backgroundColor="green");do{t=A(0,7),l=A(0,7)}while(C.board.grid[t][l]>4);C.board.receiveAttack(C.ship,C.board,[t,l]),m(),r.removeEventListener("click",e)};r.addEventListener("click",e)}}return t}l.appendChild(k("p")),a.appendChild(k("o"));let C=new r,y=new r;function A(e,t){return Math.floor(Math.random()*(t-e+1))+e}C.board.place(C.ship,C.board),console.log(C.board.grid),y.board.place(y.ship,y.board),console.log(y.board.grid),m(),document.querySelector("#reset").addEventListener("click",(function(){l.innerHTML="",a.innerHTML="",C=new r,y=new r,l.appendChild(k("p")),a.appendChild(k("o")),C.board.place(C.ship,C.board),y.board.place(y.ship,y.board),m(),i.textContent="Afloat",c.textContent="Afloat",d.textContent="Afloat",s.textContent="Afloat",h.textContent="Afloat",u.textContent="Afloat",p.textContent="Afloat",g.textContent="Afloat",b.textContent="Battle underway"}))})();