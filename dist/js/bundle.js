!function(){"use strict";new class{constructor(){this.data=[],this.$select=document.querySelector(".select"),this.$select&&(this.#e(),this.#t())}#e(){this.$select.innerHTML=this.#s()}#s(){return'\n      <div class="select__wrap">\n        <input class="select__search" type="text" name="search" data-type = "input" placeholder="search" autofocus >\n        <ul class="select__lists" data-type = "drop-down"></ul>\n        <div class="select__repo" data-type = "repo"></div>\n      </div>'}#t(){this.renderItems=[],this.$search=this.$select.querySelector("[data-type = input]"),this.$dropDown=this.$select.querySelector("[data-type = drop-down]"),this.$repo=this.$select.querySelector("[data-type = repo]"),this.inputHandler=this.inputHandler.bind(this),this.$search.addEventListener("input",this.#i(this.inputHandler,300)),this.clickHandler=this.clickHandler.bind(this),this.$select.addEventListener("click",this.clickHandler)}#i(e,t){let s=null;return(...i)=>{s&&clearTimeout(s),s=setTimeout(e,t,...i)}}clearInputValue(){this.$search.value=""}async inputHandler(e){const t=this.$search.value.trim();if(!t)return this.$dropDown.innerHTML="",void this.clearInputValue();const s=await this.getData(t);this.$select.classList.add("select--open");const i=s.items.slice(0,5);this.data=i,this.#n()}async getData(e){try{const t=`https://api.github.com/search/repositories?q=${e}`,s=await fetch(t);return await s.json()}catch(e){console.log(e)}}clickHandler(e){const t=e.target,s=t.closest("LI"),i=t.closest("BUTTON");if(i)return this.#r(i),void this.#a();if(s){if(s.classList.contains("select__active"))return this.#r(s),void this.#a();if(!s.classList.contains("select__active")){if(this.clearInputValue(),this.renderItems.length>=3)return;s.classList.add("select__active");const e=this.data.find((e=>e.id==s.dataset.id));this.renderItems.push(e),this.#a()}}}#r(e){[...this.$dropDown.children].forEach((e=>{e.classList.contains("select__active")&&e.classList.remove("select__active")})),this.renderItems=this.renderItems.filter((t=>t.id!=e.dataset.id))}#n(){const e=[];this.$dropDown.innerHTML="",this.data.forEach((({id:t,name:s})=>{const i=this.#c("LI","select__item",null,{name:"id",id:t}),n=this.#c("A","select__link",s,null);i.append(n),e.push(i)})),this.$dropDown.append(...e)}#a(){this.$repo.innerHTML="";const e=[];this.renderItems.forEach((({id:t,name:s,owner:{login:i},stargazers_count:n})=>{const r=this.#c("DIV","select__repo-wrap",null),a=this.#c("DIV","select__repo-name",`Name: ${s}`),c=this.#c("DIV","select__repo-login",`Owner: ${i}`),l=this.#c("DIV","select__repo-star",`Stars: ${n}`);r.insertAdjacentHTML("afterbegin",`<button class="select__btn"  type="button" data-id = ${t}><span></span></button>`),r.append(a,c,l),e.push(r)})),this.$repo.append(...e)}destroyEvents(){this.$select.removeEventListener("click",this.clickHandler)}#c(e,t,s,i){const n=document.createElement(e);return t&&n.classList.add(t),s&&(n.textContent=s),i?.id&&(n.dataset[i.name]=i.id),n}}}();
//# sourceMappingURL=bundle.js.map