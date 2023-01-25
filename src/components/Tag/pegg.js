const template = document.createElement("template");
template.innerHTML = `
  <style>
   :host {
    cursor: pointer;
    z-index: 15;
    border-radius: 50px;
    transition: all 300ms;
         transition-timing-function: ease-in;
    }
    
    .tag {
     position: relative;
     width: 100% ;
     display: flex;
     align-items: center;
     height: 100%;

     
    } 
    
    .tag-p {
      color: white;
      font-size: 12px;
      /*display: none;*/
      opacity: 0;
      padding: 0 16px;
      width: 100% ;
      transition: all;
      transform: translateX(-100px);
      transition-delay: 300ms;
      transition-timing-function: ease-out;
      white-space: nowrap;

    }
   
  </style>
  <div class="tag" >
  <span class="tag-p">
   <slot></slot>
  </span>
  </div>
`;

class PeggTag extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.buyEvent = new CustomEvent("buy", {
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: {
        id: this.id,
      },
    });
  }

  static get observedAttribute() {
    return ["topPos", "leftPos", "length", "id"];
  }

  get topPos() {
    return this.getAttribute("topPos");
  }

  set topPos(nV) {
    this.setAttribute("topPos", nV);
  }

  get leftPos() {
    return this.getAttribute("leftPos");
  }

  set leftPos(nV) {
    this.setAttribute("leftPos", nV);
  }

  get textInfo() {
    return this.shadowRoot.querySelector(".tag-p");
  }

  get length() {
    return this.getAttribute("length");
  }

  set length(nV) {
    this.setAttribute("length", nV);
  }

  get id() {
    return this.getAttribute("id");
  }

  set id(nv) {
    this.setAttribute("id", nv);
  }

  modeOpen() {
    this.style.height = "25px";
    this.style.borderRadius = "25px";
    this.style.backgroundColor = "black";
    this.style.opacity = "0.95";
    // eslint-disable-next-line no-return-assign
    this.textInfo.style.display = "block";
    this.textInfo.style.transform = "translateX(50px)";
    this.style.width = `${this.length}px`;

    setTimeout(() => {
      this.textInfo.style.transform = "translateX(0)";
      this.textInfo.style.opacity = "1";
    }, 50);

    // this.textInfo.style.width = `${this.length}px`;
  }

  modeCollapse() {
    this.style.backgroundColor = "white";
    this.style.opacity = "1";
    this.style.width = "25px";
    this.style.height = "25px";
    this.style.borderRadius = "50px";
    this.textInfo.style.display = "none";
    this.textInfo.style.opacity = "0";
  }

  connectedCallback() {
    this.render();
    this.addEventListener("click", () => {
      if (this.style.width === "25px") {
        this.modeOpen();
        console.log(`open: ${this.length}`);
      } else {
        this.dispatchEvent(this.buyEvent);
        this.modeCollapse();
        // console.log(`close: ${this.length}`);
      }
    });
  }

  attributeChangedCallback(prop) {
    // eslint-disable-next-line no-unused-expressions
    prop === "length" ? this.render() : "";
  }

  render() {
    this.style.top = `${this.topPos}%`;
    this.style.left = `${this.leftPos}%`;
    this.style.position = "absolute";
    this.style.width = "25px";
    this.style.height = "25px";
    this.style.backgroundColor = "white";
    // console.log(`first: ${this.length}`);
    // console.log(this.id);
    // console.log(this.textInfo)
  }
}

// eslint-disable-next-line no-unused-expressions
window.customElements.get("pegg-tag") || window.customElements.define("pegg-tag", PeggTag);

export default PeggTag;
