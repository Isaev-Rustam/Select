export class Select {
  constructor() {
    this.data = [];
    this.$select = document.querySelector(".select");
    if (this.$select) {
      this.#render();
      this.#setup();
    }
  }

  #render() {
    this.$select.innerHTML = this.#getTemplateBody();
  }

  #getTemplateBody() {
    return `
      <div class="select__wrap">
        <input class="select__search" type="text" name="search" data-type = "input" placeholder="search" autofocus >
        <ul class="select__lists" data-type = "drop-down"></ul>
        <div class="select__repo" data-type = "repo"></div>
      </div>`;
  }

  #setup() {
    this.renderItems = [];

    this.$search = this.$select.querySelector("[data-type = input]");
    this.$dropDown = this.$select.querySelector("[data-type = drop-down]");
    this.$repo = this.$select.querySelector("[data-type = repo]");

    this.inputHandler = this.inputHandler.bind(this);
    this.$search.addEventListener("input", this.#debounce(this.inputHandler, 300));

    this.clickHandler = this.clickHandler.bind(this);
    this.$select.addEventListener("click", this.clickHandler);
  }

  #debounce(callback, time) {
    let timeout = null;
    return (...arg) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(callback, time, ...arg);
    }
  }

  clearInputValue() {
    this.$search.value = "";
  }

  async inputHandler(event) {
    const value = this.$search.value.trim();
    if (!value) {
      this.$dropDown.innerHTML = "";
      this.clearInputValue();
      return;
    }
    const data = await this.getData(value);
    this.$select.classList.add("select--open");
    const arr = data.items.slice(0, 5);
    this.data = arr;
    this.#renderDropDown();
  }

  async getData(token) {
    try {
      const url = `https://api.github.com/search/repositories?q=${token}`;
      const response = await fetch(url);
      const result = await response.json();
      return result
    } catch (error) {
      console.log(error);
    }
  }

  clickHandler(event) {
    const target = event.target;
    const $list = target.closest("LI");
    const $repoCloseBtn = target.closest("BUTTON");
    if ($repoCloseBtn) {
      this.#removeRenderItem($repoCloseBtn);
      this.#renderRepositories();
      return;
    }

    if ($list) {
      if ($list.classList.contains("select__active")) {
        this.#removeRenderItem($list);
        this.#renderRepositories();
        return;
      }

      if (!$list.classList.contains("select__active")) {
        this.clearInputValue();
        if (this.renderItems.length >= 3) return;
        $list.classList.add("select__active");
        const renderObj = this.data.find(i => i.id == $list.dataset.id);
        this.renderItems.push(renderObj);
        this.#renderRepositories();
      }
    }
  }

  #removeRenderItem($item) {
    const listItems = [...this.$dropDown.children];
    listItems.forEach(i => {
      if (i.classList.contains("select__active")) {
        i.classList.remove("select__active");
      }
    })
    this.renderItems = this.renderItems.filter(i => i.id != $item.dataset.id);
  }

  #renderDropDown() {
    const $listItems = [];
    this.$dropDown.innerHTML = "";

    this.data.forEach(({id, name,}) => {

      const $dropDownItem = this.#createElement("LI", "select__item", null, {name: "id", id: id});

      const $dropDownLink = this.#createElement("A", "select__link", name, null);

      $dropDownItem.append($dropDownLink);
      $listItems.push($dropDownItem);
    })
    this.$dropDown.append(...$listItems);
  }

  #renderRepositories() {
    this.$repo.innerHTML = "";
    const $arItems = [];

    this.renderItems.forEach(({id, name, owner: {login}, stargazers_count: star}) => {

      const $repoWrap = this.#createElement("DIV", "select__repo-wrap", null);

      const $repoNameItem = this.#createElement("DIV", "select__repo-name", `Name: ${name}`);

      const $repoLoginItem = this.#createElement("DIV", "select__repo-login", `Owner: ${login}`);

      const $repoStarItem = this.#createElement("DIV", "select__repo-star", `Stars: ${star}`);

      $repoWrap.insertAdjacentHTML('afterbegin', `<button class="select__btn"  type="button" data-id = ${id}><span></span></button>`)

      $repoWrap.append($repoNameItem, $repoLoginItem, $repoStarItem);

      $arItems.push($repoWrap)
    })

    this.$repo.append(...$arItems);
  }

  destroyEvents() {
    this.$select.removeEventListener("click", this.clickHandler);
  }

  #createElement(tagName, selector, textContent, data) {
    const $el = document.createElement(tagName);
    if (selector) $el.classList.add(selector);
    if (textContent) $el.textContent = textContent;
    if (data?.id) $el.dataset[data.name] = data.id;
    return $el;
  }

}
