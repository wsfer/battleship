(()=>{"use strict";var e={};e.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),(()=>{var t;e.g.importScripts&&(t=e.g.location+"");var s=e.g.document;if(!t&&s&&(s.currentScript&&(t=s.currentScript.src),!t)){var n=s.getElementsByTagName("script");if(n.length)for(var i=n.length-1;i>-1&&!t;)t=n[i--].src}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),e.p=t})();const t=class{static createPage(){return(new Range).createContextualFragment('\n            <header>\n                <button class="reset-button js-reset-game">BATTLESHIP</button>\n                <button class="svg-button sound-button js-sound on">\n                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\n                        <title>Sound on</title>\n                        <path d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />\n                    </svg>\n                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\n                        <title>Sound off</title>\n                        <path d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z" />\n                    </svg>\n                </button>\n            </header>\n            <main>\n                \n            </main>\n            <footer>\n                <p class="footer-text">Created by <a src="https://github.com/wsfer">@wsfer</a></p>\n                <section class="footer-links">\n                    <a href="#" target="_blank">\n                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\n                            <title>Linkedin</title>\n                            <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z" />\n                        </svg>\n                    </a>\n                    <a href="https://github.com/wsfer" target="_blank">\n                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\n                            <title>Github</title>\n                            <path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" />\n                        </svg>\n                    </a>\n                </section>\n            </footer>\n        ')}static createStartScreen(){return(new Range).createContextualFragment('\n            <h1 class="game-title">BATTLESHIP</h1>\n            <div class="buttons-container">\n                <button class="text-button js-player-vs-computer">Player vs Computer</button>\n                <button class="text-button js-player-vs-player">Player vs Player</button>\n            </div>\n            <section class="popup-box js-sound-box">\n                <p>Allow sound?</p>\n                <div>\n                    <button class="solid-button js-allow-sound">Allow</button>\n                    <button class="solid-button js-refuse-sound">Refuse</button>\n                </div>\n            </section>\n        ')}static createFleetScreen(){let e="";for(let t=0;t<100;t++)e+=`<div class="square js-square" data-x="${Math.floor(t/10)}" data-y="${t%10}"></div>`;return(new Range).createContextualFragment(`\n            <div class="player-name-input">\n                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\n                    <title>Drawing Pen</title>\n                    <path d="M9.75 20.85C11.53 20.15 11.14 18.22 10.24 17C9.35 15.75 8.12 14.89 6.88 14.06C6 13.5 5.19 12.8 4.54 12C4.26 11.67 3.69 11.06 4.27 10.94C4.86 10.82 5.88 11.4 6.4 11.62C7.31 12 8.21 12.44 9.05 12.96L10.06 11.26C8.5 10.23 6.5 9.32 4.64 9.05C3.58 8.89 2.46 9.11 2.1 10.26C1.78 11.25 2.29 12.25 2.87 13.03C4.24 14.86 6.37 15.74 7.96 17.32C8.3 17.65 8.71 18.04 8.91 18.5C9.12 18.94 9.07 18.97 8.6 18.97C7.36 18.97 5.81 18 4.8 17.36L3.79 19.06C5.32 20 7.88 21.47 9.75 20.85M18.96 7.33L13.29 13H11V10.71L16.67 5.03L18.96 7.33M22.36 6.55C22.35 6.85 22.04 7.16 21.72 7.47L19.2 10L18.33 9.13L20.93 6.54L20.34 5.95L19.67 6.62L17.38 4.33L19.53 2.18C19.77 1.94 20.16 1.94 20.39 2.18L21.82 3.61C22.06 3.83 22.06 4.23 21.82 4.47C21.61 4.68 21.41 4.88 21.41 5.08C21.39 5.28 21.59 5.5 21.79 5.67C22.08 5.97 22.37 6.25 22.36 6.55Z" />\n                </svg>\n                <label for="name">Your name:</label>\n                <input id="name" class="js-player-name" type="text" maxlength="12" required>\n                <p class="invalid-input-message">Name is required</p>\n            </div>\n            <h2>Build your fleet</h2>\n            <p>\n                <span class="js-selected-ship">No ship</span> selected\n            </p>\n            <section class="fleet-builder">\n                <div class="fleet-container">\n                    <section class="settings">\n                        <button class="svg-button js-random-fleet">\n                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\n                                <title>Random fleet</title>\n                                <path d="M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M7,5A2,2 0 0,0 5,7A2,2 0 0,0 7,9A2,2 0 0,0 9,7A2,2 0 0,0 7,5M17,15A2,2 0 0,0 15,17A2,2 0 0,0 17,19A2,2 0 0,0 19,17A2,2 0 0,0 17,15M17,5A2,2 0 0,0 15,7A2,2 0 0,0 17,9A2,2 0 0,0 19,7A2,2 0 0,0 17,5M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M7,15A2,2 0 0,0 5,17A2,2 0 0,0 7,19A2,2 0 0,0 9,17A2,2 0 0,0 7,15Z" />\n                            </svg>\n                        </button>\n                        <button class="svg-button js-rotate-ship" disabled>\n                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\n                                <title>Rotate Ship</title>\n                                <path d="M12 7C6.5 7 2 9.2 2 12C2 14.2 4.9 16.1 9 16.8V20L13 16L9 12V14.7C5.8 14.1 4 12.8 4 12C4 10.9 7 9 12 9S20 10.9 20 12C20 12.7 18.5 13.9 16 14.5V16.6C19.5 15.8 22 14.1 22 12C22 9.2 17.5 7 12 7Z" />\n                            </svg>\n                        </button>\n                        <button class="svg-button js-unselect-ship" disabled>\n                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\n                                <title>Unselect</title>\n                                <path d="M12 2C17.5 2 22 6.5 22 12S17.5 22 12 22 2 17.5 2 12 6.5 2 12 2M12 4C10.1 4 8.4 4.6 7.1 5.7L18.3 16.9C19.3 15.5 20 13.8 20 12C20 7.6 16.4 4 12 4M16.9 18.3L5.7 7.1C4.6 8.4 4 10.1 4 12C4 16.4 7.6 20 12 20C13.9 20 15.6 19.4 16.9 18.3Z" />\n                            </svg>\n                        </button>\n                    </section>\n                    <section class="gameboard">\n                        <div class="x-coords">\n                            <div>A</div>\n                            <div>B</div>\n                            <div>C</div>\n                            <div>D</div>\n                            <div>E</div>\n                            <div>F</div>\n                            <div>G</div>\n                            <div>H</div>\n                            <div>I</div>\n                            <div>J</div>\n                        </div>\n                        <div class="y-coords">\n                            <div>1</div>\n                            <div>2</div>\n                            <div>3</div>\n                            <div>4</div>\n                            <div>5</div>\n                            <div>6</div>\n                            <div>7</div>\n                            <div>8</div>\n                            <div>9</div>\n                            <div>10</div>\n                        </div>\n                        <div class="fleet js-fleet">\n                            ${e}\n                        </div>\n                    </section>\n                <section class="ship-dock js-ship-dock">\n                    <div id="destroyer" class="destroyer ship js-ship" draggable="true"\n                        data-direction="horizontal" data-name="destroyer"\n                        style="height: clamp(1rem, 5vw, 2.5rem); width: clamp(2rem, 10vw, 5rem);">\n                    </div>\n                    <div id="submarine" class="submarine ship js-ship" draggable="true"\n                        data-direction="horizontal" data-name="submarine"\n                        style="height: clamp(1rem, 5vw, 2.5rem); width: clamp(3rem, 15vw, 7.5rem);">\n                    </div>\n                    <div id="cruiser" class="cruiser ship js-ship" draggable="true"\n                        data-direction="horizontal" data-name="cruiser"\n                        style="height: clamp(1rem, 5vw, 2.5rem); width: clamp(3rem, 15vw, 7.5rem);">\n                    </div>\n                    <div id="battleship" class="battleship ship js-ship" draggable="true"\n                        data-direction="horizontal" data-name="battleship"\n                        style="height: clamp(1rem, 5vw, 2.5rem); width: clamp(4rem, 20vw, 10rem);">\n                    </div>\n                    <div id="carrier" class="carrier ship js-ship" draggable="true"\n                        data-direction="horizontal" data-name="carrier"\n                        style="height: clamp(1rem, 5vw, 2.5rem); width: clamp(5rem, 25vw, 12.5rem);">\n                    </div>\n                </section>\n            </section>\n            <button class="solid-button js-start-game" disabled>Start Game</button>\n        `)}static createGameScreen(){let e="";for(let t=0;t<100;t++)e+=`<div class="square js-square" data-x="${Math.floor(t/10)}" data-y="${t%10}"></div>`;return(new Range).createContextualFragment(`\n            <p class="changing-text"><span class="js-player-name-turn action-text"></span> turn</p>\n            <section class="player-boards-container">\n                <section class="board-container">\n                    <section class="fleet-status player-one">\n                        <div class="ship-health destroyer js-player-one-destroyer"></div>\n                        <div class="ship-health submarine js-player-one-submarine"></div>\n                        <div class="ship-health cruiser js-player-one-cruiser"></div>\n                        <div class="ship-health battleship js-player-one-battleship"></div>\n                        <div class="ship-health carrier js-player-one-carrier"></div>\n                    </section>\n                    <div class="fleet-container">\n                        <h3 class="board-title"><span class="action-text js-player-one-name"></span> fleet</h3>\n                        <section class="gameboard">\n                            <div class="x-coords">\n                                <div>A</div>\n                                <div>B</div>\n                                <div>C</div>\n                                <div>D</div>\n                                <div>E</div>\n                                <div>F</div>\n                                <div>G</div>\n                                <div>H</div>\n                                <div>I</div>\n                                <div>J</div>\n                            </div>\n                            <div class="y-coords">\n                                <div>1</div>\n                                <div>2</div>\n                                <div>3</div>\n                                <div>4</div>\n                                <div>5</div>\n                                <div>6</div>\n                                <div>7</div>\n                                <div>8</div>\n                                <div>9</div>\n                                <div>10</div>\n                            </div>\n                            <div class="fleet js-player-one-fleet">\n                                ${e}\n                            </div>\n                        </section>\n                    </div>\n                </section>\n                <section class="board-container">\n                    <div class="fleet-container">\n                        <h3 class="board-title"><span class="action-text js-player-two-name"></span> fleet</h3>\n                        <section class="gameboard">\n                            <div class="x-coords">\n                                <div>A</div>\n                                <div>B</div>\n                                <div>C</div>\n                                <div>D</div>\n                                <div>E</div>\n                                <div>F</div>\n                                <div>G</div>\n                                <div>H</div>\n                                <div>I</div>\n                                <div>J</div>\n                            </div>\n                            <div class="y-coords">\n                                <div>1</div>\n                                <div>2</div>\n                                <div>3</div>\n                                <div>4</div>\n                                <div>5</div>\n                                <div>6</div>\n                                <div>7</div>\n                                <div>8</div>\n                                <div>9</div>\n                                <div>10</div>\n                            </div>\n                            <div class="fleet js-player-two-fleet">\n                                ${e}\n                            </div>\n                        </section>\n                    </div>\n                    <section class="fleet-status player-two">\n                        <div class="ship-health destroyer js-player-two-destroyer"></div>\n                        <div class="ship-health submarine js-player-two-submarine"></div>\n                        <div class="ship-health cruiser js-player-two-cruiser"></div>\n                        <div class="ship-health battleship js-player-two-battleship"></div>\n                        <div class="ship-health carrier js-player-two-carrier"></div>\n                    </section>\n                </section>\n            </section>\n            <p class="action-text changing-text js-combat-log"></p>\n            <section class="popup-box js-gameover-box">\n                <h3><span class="action-text js-winner"></span> won the game</h3>\n                <button class="solid-button js-restart-game">Play again</button>\n            </section>\n        `)}},s=class{static addFleetScreenEvents(e,t){let s=null;const n=e.querySelector(".js-selected-ship"),i=e.querySelectorAll(".js-ship"),a=e.querySelectorAll(".js-square"),r=e.querySelector(".js-rotate-ship"),l=e.querySelector(".js-unselect-ship"),o=e.querySelector(".js-start-game"),d=e.querySelector(".js-player-name");d.addEventListener("input",(e=>{""===e.target.value?o.disabled=!0:t.isDone()&&(o.disabled=!1)})),e.querySelector(".js-random-fleet").addEventListener("click",(()=>{t.generateRandomFleet().forEach((e=>{const t=document.getElementById(e.target),[s,n]=e.newPositions[0];a[10*s+n].appendChild(t),t.dataset.direction!==e.direction&&(t.dataset.direction=e.direction,[t.style.width,t.style.height]=[t.style.height,t.style.width])})),""!==d.value&&(o.disabled=!1)})),r.addEventListener("click",(()=>{if(null!==s){const e=t.changeDirection(s.dataset.name);s.dataset.direction="horizontal"===s.dataset.direction?"vertical":"horizontal",[s.style.width,s.style.height]=[s.style.height,s.style.width],e.isValid||(document.querySelector(".js-ship-dock").appendChild(s),o.disabled=!0)}})),l.addEventListener("click",(e=>{null!==s&&(s.classList.toggle("selected"),s=null,n.classList.remove("action-text"),n.textContent="No ship",e.target.classList.toggle("disabled"),r.disabled=!0,l.disabled=!0)})),i.forEach((e=>{e.addEventListener("click",(e=>{s!==e.target&&(null!==s?s.classList.toggle("selected"):(r.disabled=!1,l.disabled=!1),s=e.target,e.target.classList.toggle("selected"),n.textContent=e.target.dataset.name.charAt(0).toUpperCase()+e.target.dataset.name.slice(1),n.classList.add("action-text"),document.querySelector(".js-unselect-ship").classList.toggle("disabled"),r.disabled=!1,l.disabled=!1)})),e.addEventListener("dragstart",(e=>{e.dataTransfer.setData("ship",e.target.id),s!==e.target&&(null!==s?s.classList.toggle("selected"):(r.disabled=!1,l.disabled=!1),s=e.target,e.target.classList.toggle("selected"),n.textContent=e.target.dataset.name.charAt(0).toUpperCase()+e.target.dataset.name.slice(1),n.classList.add("action-text"),document.querySelector(".js-unselect-ship").classList.toggle("disabled"))}))})),e.querySelector(".js-fleet").addEventListener("dragover",(e=>{e.preventDefault(),e.target.classList.contains(".js-square")&&e.target.classList.add("selected")})),e.querySelector(".js-fleet").addEventListener("dragleave",(e=>{e.target.classList.contains(".js-square")&&e.target.classList.remove("selected")})),e.querySelector(".js-fleet").addEventListener("drop",(e=>{if(e.preventDefault(),e.target.classList.contains("js-square")){e.target.classList.remove("selected");const s=e.dataTransfer.getData("ship"),n=document.getElementById(s),[i,a]=[Number(e.target.dataset.x),Number(e.target.dataset.y)];t.move(s,[i,a]).isValid&&(e.target.appendChild(n),t.isDone()&&""!==d.value&&(o.disabled=!1))}}))}static addGameScreenEvents(e,t,s,n,i){const a=e.querySelector(".js-player-one-fleet"),r=e.querySelector(".js-player-two-fleet");a.classList.toggle("disabled"),n.isComputer||i.isComputer?n.isComputer||r.addEventListener("click",(async e=>{if(e.target.classList.contains("js-square")&&!r.classList.contains("disabled")){if((await this.#e([Number(e.target.dataset.x),Number(e.target.dataset.y)],t,s,a,r)).gameover)return void document.body.classList.toggle("popup");(await this.#e(null,t,s,r,a)).gameover&&document.body.classList.toggle("popup")}})):(r.addEventListener("click",(async e=>{e.target.classList.contains("js-square")&&!r.classList.contains("disabled")&&(await this.#e([Number(e.target.dataset.x),Number(e.target.dataset.y)],t,s,a,r)).gameover&&document.body.classList.toggle("popup")})),a.addEventListener("click",(async e=>{e.target.classList.contains("js-square")&&!a.classList.contains("disabled")&&(await this.#e([Number(e.target.dataset.x),Number(e.target.dataset.y)],t,s,r,a)).gameover&&document.body.classList.toggle("popup")})))}static async#e(e,t,s,n,i){const a=await t.play(e);return i.classList.toggle("disabled"),a.isShip?s.playExplosion():s.playSplash(),n.classList.toggle("disabled"),a}},n=class{#t;#s;#n;constructor(){this.#t=new Map([["destroyer",{name:"destroyer",size:2,direction:"horizontal",positions:null}],["submarine",{name:"submarine",size:3,direction:"horizontal",positions:null}],["cruiser",{name:"cruiser",size:3,direction:"horizontal",positions:null}],["battleship",{name:"battleship",size:4,direction:"horizontal",positions:null}],["carrier",{name:"carrier",size:5,direction:"horizontal",positions:null}]]),this.#s=Array(10).fill().map((()=>Array(10).fill("water"))),this.#n=Array(10).fill().map((()=>Array(10).fill(!0)))}#i(e){e.positions.main.forEach((([t,s])=>{this.#s[t][s]=e.name,this.#n[t][s]=!1})),e.positions.border.forEach((([e,t])=>this.#n[e][t]=!1))}#a(e){e.positions.main.forEach((([e,t])=>{this.#s[e][t]="water",this.#n[e][t]=!0})),e.positions.border.forEach((([e,t])=>{this.#r([e,t])||(this.#n[e][t]=!0)}))}#r([e,t]){const s=[[e-1,t-1],[e-1,t],[e-1,t+1],[e,t-1],[e,t+1],[e+1,t-1],[e+1,t],[e+1,t+1]].filter((([e,t])=>e>=0&&e<10&&t>=0&&t<10));for(const[e,t]of s)if("water"!==this.#s[e][t])return!0;return!1}#l(e,[t,s]){const n=Array(e.size).fill().map(((n,i)=>"horizontal"===e.direction?[t,s+i]:[t+i,s])),i=[],a=[];for(let e=n[0][0]-1;e<=n[n.length-1][0]+1;e++)i.push(e);for(let e=n[0][1]-1;e<=n[n.length-1][1]+1;e++)a.push(e);const r=i.flatMap((e=>a.map((t=>[e,t])))).filter((([e,t])=>e>=0&&e<10&&t>=0&&t<10&&!n.map((([s,n])=>s===e&&n===t)).includes(!0)));return{main:n,border:r}}#o(e){for(const[t,s]of e)if(t<0||t>9||s<0||s>9||!this.#n[t][s])return!1;return!0}changeDirection(e){const t=this.#t.get(e);if(t.direction="horizontal"===t.direction?"vertical":"horizontal",t.positions){this.#a(t);const e=this.#l(t,t.positions.main[0]),s=this.#o(e.main);return s?(t.positions=e,this.#i(t)):t.positions=null,{isValid:s,target:t.name,size:t.size,direction:t.direction,newPositions:s?e.main:null}}return{isValid:!0,target:t.name,size:t.size,direction:t.direction,newPositions:null}}move(e,t){const s=this.#t.get(e);s.positions&&this.#a(s);const n=this.#l(s,t),i=this.#o(n.main);return s.positions=i?n:s.positions,s.positions&&this.#i(s),{isValid:i,target:s.name,size:s.size,direction:s.direction,newPositions:i?n.main:null}}generateRandomFleet(){this.#s=Array(10).fill().map((()=>Array(10).fill("water"))),this.#n=Array(10).fill().map((()=>Array(10).fill(!0))),[...this.#t.values()].forEach((e=>{e.positions=null}));const e=[...this.#t.keys()],t=[];for(;e.length>0;){const s=e.pop(),n=this.#n.map(((e,t)=>e.map(((e,s)=>!!e&&[t,s])))).filter((e=>e.filter((e=>e)).length>0)),i=n[Math.floor(Math.random()*n.length)].filter((e=>e)),a=i[Math.floor(Math.random()*i.length)];this.#t.get(s).direction=["horizontal","vertical"][Math.floor(2*Math.random())];const r=this.move(s,a);r.isValid?t.push(r):e.push(s)}return t}isDone(){const e=[...this.#t.values()],t=e.filter((e=>null!==e.positions));return t.length===e.length}getFleet(){return this.#s.map((e=>e.slice()))}},i=class{#d;#c;#u;constructor(e,t){this.#d=e,this.#c=e,this.#u=t}get size(){return this.#d}get health(){return this.#c}get name(){return this.#u}hit(){return this.#c>0&&(this.#c-=1),{target:this.#u,size:this.#d,health:this.#c}}isSunk(){return 0===this.#c}},a=class{#h;#s;constructor(e){this.#h=new Map([["destroyer",new i(2,"Destroyer")],["submarine",new i(3,"Submarine")],["cruiser",new i(3,"Cruiser")],["battleship",new i(4,"Battleship")],["carrier",new i(5,"Carrier")],["water",new i(0,"Water")],["sunken",new i(0,"Sunken ship")]]),this.#s=e.map((e=>e.map((e=>this.#h.get(e)))))}receiveAttack([e,t]){const s=this.#s[e][t],n=s.hit();return s.size>0?(this.#s[e][t]=this.#h.get("sunken"),{...n,x:e,y:t,isShip:!0,gameover:!!s.isSunk()&&this.#p()}):{target:n.target,x:e,y:t,isShip:!1,gameover:!1}}#p(){const e=[...this.#h.values()],t=e.filter((e=>e.isSunk()));return t.length===e.length}getFleet(){return this.#s.map((e=>e.map((e=>e.name))))}},r=class{#u;#v;constructor(e,t){this.#u=e,this.#v=t,this.isComputer=!1}get name(){return this.#u}receiveAttack([e,t]){return this.#v.receiveAttack([e,t])}async attack(e,t){return e.receiveAttack(t)}},l=class extends r{#m;#g;#y;constructor(e,t,s){super(e,t),this.#g=Array(10).fill().map(((e,t)=>Array(10).fill().map(((e,s)=>[t,s])))),this.#y=null,this.#m=s,this.isComputer=!0}async attack(e){const t=await this.#m.generateMove(this.#g,this.#y),s=e.receiveAttack(t);if(this.#g[s.x][s.y]=null,s.isShip)if(null===this.#y)this.#y={direction:null,positions:[[s.x,s.y]]};else if(this.#y.positions.length+1===s.size)this.#y=null;else{const[e]=this.#y.positions[0];this.#y.positions.push([s.x,s.y]),this.#y.direction=s.x===e?"horizontal":"vertical"}return s}},o=class{static async generateMove(e,t){if(null===t)return await new Promise((e=>{setTimeout(e,1e3*Math.random()+1e3)})),this.#b(e);if(1===t.positions.length){const s=t.positions[0];return await new Promise((e=>{setTimeout(e,1e3*Math.random()+1e3)})),this.#w(e,s)}return await new Promise((e=>{setTimeout(e,1e3*Math.random()+1e3)})),this.#S(e,t.direction,t.positions)}static#b(e){const t=e.filter((e=>e.filter((e=>e)).length>0)),s=t[Math.floor(Math.random()*t.length)].filter((e=>null!==e));return s[Math.floor(Math.random()*s.length)]}static#w(e,[t,s]){const n=[[t+1,s],[t,s-1],[t,s+1],[t-1,s]].filter((([t,s])=>t>=0&&t<10&&s>=0&&s<10&&null!==e[t][s]));return n[Math.floor(Math.random()*n.length)]}static#S(e,t,s){let n;if("horizontal"===t){const t=s[0][0],i=s.map((([e,t])=>t));n=[[t,Math.min(...i)-1],[t,Math.max(...i)+1]].filter((([t,s])=>s>=0&&s<10&&null!==e[t][s]))}if("vertical"===t){const t=s[0][1],i=s.map((([e,t])=>e));n=[[Math.min(...i)-1,t],[Math.max(...i)+1,t]].filter((([t,s])=>t>=0&&t<10&&null!==e[t][s]))}return n[Math.floor(Math.random()*n.length)]}},d=class{#f;#C;constructor(e,t,s){this.#f=[t,e],this.#C={combatLog:s.combatLog,nextPlayer:s.nextPlayer,winnerName:s.winnerName},s.combatLog.textContent="Nothing is happening",s.nextPlayer.textContent=e.name,e.squares=s.playerOneSquares,t.squares=s.playerTwoSquares,e.direction="to left",t.direction="to right",e.ships=s.playerOneShips,t.ships=s.playerTwoShips}get nextPlayer(){return this.#f[1]}async play(e){const t=this.#f.pop(),s=this.#f.pop(),n=await t.attack(s,e);return this.#f.push(t,s),n.isShip?(s.squares[n.x][n.y].classList.toggle("sunken"),s.ships[n.target.toLowerCase()].style.backgroundImage=`linear-gradient(${s.direction}, var(--secondary) 0 ${Math.round(n.health/n.size*100)}%, var(--light-opaque) ${Math.round(n.health/n.size*100)}% 100%)`):"Water"===n.target&&s.squares[n.x][n.y].classList.toggle("water"),this.#C.combatLog.textContent=`${t.name} attacked ${s.name}'s ${n.target}`,this.#C.nextPlayer.textContent=s.name,n.gameover&&(this.#C.winnerName.textContent=t.name),{attacker:t.name,defender:s.name,...n}}},c=new class{#j;#L;#q;constructor(e,t,s){this.#j=new Audio(e),this.#L=new Audio(t),this.#q=new Audio(s),this.#j.autoplay=!0,this.#j.loop=!0}toggle(){return this.#j.muted=!this.#j.muted,this.#j.muted}async playMusic(){return this.#j.play()}async playExplosion(){this.#j.muted||this.#L.play()}async playSplash(){this.#j.muted||this.#q.play()}}(e.p+"2fc907728fd185de0a31.mp3",e.p+"4dff150e73adf62cc2d3.mp3",e.p+"de67f6401b67e5c5c2d5.mp3"),u=function(){document.querySelector(".js-reset-game").style.display="none";const e=t.createStartScreen(),i=t.createFleetScreen(),h=t.createFleetScreen(),p=t.createGameScreen(),v=new n,m=new n;let g=null,y=null,b=null,w=null,S=null;const f={combatLog:p.querySelector(".js-combat-log"),nextPlayer:p.querySelector(".js-player-name-turn"),winnerName:p.querySelector(".js-winner"),playerOneSquares:[...p.querySelectorAll(".js-player-one-fleet > .js-square")].reduce(((e,t,s)=>(s%10==0?e.push([t]):e[e.length-1].push(t))&&e),[]),playerTwoSquares:[...p.querySelectorAll(".js-player-two-fleet > .js-square")].reduce(((e,t,s)=>(s%10==0?e.push([t]):e[e.length-1].push(t))&&e),[]),playerOneShips:{destroyer:p.querySelector(".js-player-one-destroyer"),submarine:p.querySelector(".js-player-one-submarine"),cruiser:p.querySelector(".js-player-one-cruiser"),battleship:p.querySelector(".js-player-one-battleship"),carrier:p.querySelector(".js-player-one-carrier")},playerTwoShips:{destroyer:p.querySelector(".js-player-two-destroyer"),submarine:p.querySelector(".js-player-two-submarine"),cruiser:p.querySelector(".js-player-two-cruiser"),battleship:p.querySelector(".js-player-two-battleship"),carrier:p.querySelector(".js-player-two-carrier")}};i.querySelector(".js-player-name").value="PlayerOne",h.querySelector(".js-player-name").value="PlayerTwo",e.querySelector(".js-player-vs-computer").addEventListener("click",(()=>{document.querySelector("main").textContent="",document.querySelector(".js-reset-game").style.display="block",m.generateRandomFleet(),y=new a(m.getFleet()),w=new l("Computer",y,o),s.addFleetScreenEvents(i,v),document.querySelector("main").appendChild(i)})),e.querySelector(".js-player-vs-player").addEventListener("click",(()=>{document.querySelector("main").textContent="",document.querySelector(".js-reset-game").style.display="block",s.addFleetScreenEvents(i,v),document.querySelector("main").appendChild(i)})),i.querySelector(".js-start-game").addEventListener("click",(()=>{const e=document.querySelector(".js-player-name");v.isDone()&&""!==e.value&&(document.querySelector("main").textContent="",g=new a(v.getFleet()),b=new r(e.value,g),p.querySelector(".js-player-name-turn").textContent=b.name,p.querySelector(".js-player-one-name").textContent=b.name,null===w?(s.addFleetScreenEvents(h,m),document.querySelector("main").appendChild(h)):(S=new d(b,w,f),p.querySelector(".js-player-two-name").textContent=w.name,s.addGameScreenEvents(p,S,c,b,w),document.querySelector("main").appendChild(p)))})),h.querySelector(".js-start-game").addEventListener("click",(()=>{const e=document.querySelector(".js-player-name");m.isDone()&&""!==e.value&&(document.querySelector("main").textContent="",y=new a(m.getFleet()),w=new r(e.value,y),S=new d(b,w,f),p.querySelector(".js-player-two-name").textContent=w.name,s.addGameScreenEvents(p,S,c,b,w),document.querySelector("main").appendChild(p))})),p.querySelector(".js-restart-game").addEventListener("click",(()=>{document.body.classList.toggle("popup"),u()})),document.querySelector("main").textContent="",document.querySelector("main").appendChild(e)},h=t.createPage(c);h.querySelector(".js-reset-game").addEventListener("click",u),h.querySelector(".js-sound").addEventListener("click",(()=>{document.querySelector(".js-sound").classList.toggle("on"),c.toggle()||c.playMusic()})),document.body.appendChild(h),u(),c.playMusic().catch((()=>{document.body.classList.toggle("popup"),document.querySelector(".js-allow-sound").addEventListener("click",(()=>{document.body.classList.toggle("popup"),c.playMusic()})),document.querySelector(".js-refuse-sound").addEventListener("click",(()=>{document.body.classList.toggle("popup"),document.querySelector(".js-sound").classList.toggle("on"),c.toggle()}))}))})();