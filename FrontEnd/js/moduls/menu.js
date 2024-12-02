import { getData } from "../services/api";

export default function menu() {
  class MenuCard {
    constructor(imgSrc, title, descr, price) {
      this.imgSrc = imgSrc;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.transfer = 41.22;
      this.changeToUAH();
    }

    changeToUAH() {
      this.price *= this.transfer;
    }

    render() {
      const elem = document.querySelector(".menu__field .container");
      const { imgSrc, title, descr, price } = this;
      elem.innerHTML += `
        <div class="menu__item">
          <img src="${imgSrc}" alt="${title}">
          <h3 class="menu__item-subtitle">${title}</h3>
          <div class="menu__item-descr">${descr}</div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${price.toFixed(2)}</span> грн/день</div>
          </div>
        </div>
      `;
    }
  }

  getData("http://localhost:8888/get-menu")
    .then(data => {
      data.map(({ image, title, description, price }) => {
        return new MenuCard(`img/tabs/${image}`, title, description, price).render()
      })
    })
}