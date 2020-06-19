
export class ItemServicesService {

  constructor(public element: any) {
    if (element == null) {
      return;
    }
    this.element = element;
  }

  public init() {
    this.addLoop();
  }

  public addLoop(){
    const parent = this.element;
    if (typeof parent !== 'undefined') {
      Array.prototype.slice.call(this.element.children).reverse().forEach(elem => {
        const clone = elem.cloneNode(true);
        clone.classList.add('clone');
        parent.insertBefore(clone, parent.firstChild);
      });
    }
  }
}


