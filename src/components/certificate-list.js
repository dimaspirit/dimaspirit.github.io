class CertificateList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.data = [];
  }

  setData(data) {
    this.data = data;
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const style = `
      :host {
        display: block;
        font-family: 'Manrope', 'Sora', Arial, sans-serif;
      }
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: row;
        gap: 1rem;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: thin;
      }
      li {
        min-width: 260px;
        background: var(--color-gray10);
        border-radius: 48px;
        padding: calc(var(--gutter-size) * 2);
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        flex: 0 0 auto;
      }
      .cert-title {
        font-family: "Sora", sans-serif;
        font-weight: 700;
        font-size: 1.2rem;
        color: #222;
      }
      .cert-issuer {
        font-size: 0.95rem;
        color: #666;
      }
      .cert-date {
        font-size: 0.85rem;
        color: #aaa;
      }
      .cert-link {
        margin-top: 0.5rem;
        font-size: 0.95rem;
        color: #0077ff;
        text-decoration: underline;
        word-break: break-all;
      }
      @media (min-width: 600px) {
        ul {
          gap: 2rem;
        }
        li {
          min-width: 320px;
        }
      }
    `;
    this.shadowRoot.innerHTML = `
      <style>${style}</style>
      <ul>
        ${this.data.map(cert => `
          <li>
            <div class="cert-info">
              <div class="cert-title">${cert.title}</div>
              <div class="cert-issuer">${cert.issuer}</div>
              <div class="cert-date">${cert.date}</div>
            </div>
            <a class="cert-link" href="${cert.href}" target="_blank" rel="noopener">View</a>
          </li>
        `).join('')}
      </ul>
    `;
  }
}

customElements.define('certificate-list', CertificateList);
