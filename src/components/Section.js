class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);

  }

  addItem(element) {
    this._container.prepend(element);

  }

  renderItems(Items) {
    Items.forEach((item) => {
      this._container.append(this._renderer(item));

    });
  }
}

export default Section;
