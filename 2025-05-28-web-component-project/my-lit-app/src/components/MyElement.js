import { LitElement, html, css } from 'lit';

export class MyElement extends LitElement {
  // 样式只作用于 shadowRoot 内部
  static styles = css`
    p {
      color: blue;
      font-weight: bold;
      border: 1px solid #ccc;
      padding: 8px;
    }
  `;

  render() {
    return html`<p>Hello from Lit with Shadow DOM!</p>`;
  }
}

// customElements 是一个全局对象，属于浏览器的 Web Components 标准 API
customElements.define('my-element', MyElement);
