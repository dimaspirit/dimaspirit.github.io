class CertificateList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._certificates = [];
  }

  connectedCallback() {
    this.render();
  }

  /**
   * Set certificates data and trigger re-render
   */
  setData(data) {
    this._certificates = Array.isArray(data) ? data : [];
    this.render();
  }

  /**
   * Get certificates array
   */
  get certificates() {
    return this._certificates;
  }

  /**
   * Add a single certificate to the list
   */
  addCertificate(certData) {
    this._certificates.push(certData);
    this.render();
  }

  /**
   * Clear all certificates
   */
  clear() {
    this._certificates = [];
    this.render();
  }

  render() {
    const certificatesHTML = this._certificates
      .map(cert => this.renderCertificate(cert))
      .join('');

    const template = `
      <style>
        :host {
          display: block;
        }

        .certificates-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          width: 100%;
        }

        @media only screen and (min-width: 768px) {
          .certificates-container {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media only screen and (min-width: 1024px) {
          .certificates-container {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .certificate-card {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding: 20px;
          border-radius: 12px;
          background: var(--bg-color, #ffffff);
          border: 1px solid var(--border-color, #e5e7eb);
          transition: all 0.3s ease;
          height: 100%;
          cursor: pointer;
        }

        .certificate-card:hover {
          border-color: var(--border-hover-color, #d1d5db);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          transform: translateY(-2px);
        }

        .image-wrapper {
          width: 100%;
          height: 200px;
          overflow: hidden;
          border-radius: 8px;
          background: var(--image-bg-color, #f3f4f6);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .certificate-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .certificate-card:hover .certificate-image {
          transform: scale(1.05);
        }

        .no-image {
          color: var(--text-muted, #9ca3af);
          font-size: 14px;
          font-weight: 500;
        }

        .content {
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex-grow: 1;
        }

        .title {
          font-size: 18px;
          font-weight: 600;
          color: var(--text-primary, #1f2937);
          margin: 0;
          line-height: 1.4;
        }

        .issuer {
          font-size: 14px;
          color: var(--text-secondary, #6b7280);
          margin: 0;
        }

        .date {
          font-size: 13px;
          color: var(--text-muted, #9ca3af);
          margin: 0;
          margin-top: 4px;
        }

        .footer {
          display: flex;
          gap: 8px;
          margin-top: auto;
        }

        .view-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          font-size: 13px;
          font-weight: 500;
          color: var(--link-color, #2563eb);
          text-decoration: none;
          border-radius: 6px;
          background: var(--link-bg, transparent);
          border: 1px solid var(--link-border, transparent);
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .view-link:hover {
          background: var(--link-hover-bg, #dbeafe);
          border-color: var(--link-hover-border, #93c5fd);
        }

        .view-link::after {
          content: '↓';
          font-size: 12px;
        }

        @media (prefers-reduced-motion: reduce) {
          .certificate-card,
          .certificate-image {
            transition: none;
          }
        }
      </style>

      <div class="certificates-container">
        ${certificatesHTML}
      </div>
    `;

    this.shadowRoot.innerHTML = template;
  }

  /**
   * Render a single certificate card
   */
  renderCertificate(cert) {
    const {
      title = 'Untitled Certificate',
      issuer = 'Unknown Issuer',
      date = 'Date Not Specified',
      image = '',
      href = ''
    } = cert;

    const imageHTML = image
      ? `<img src="${this.escapeHTML(image)}" alt="${this.escapeHTML(title)}" class="certificate-image" loading="lazy">`
      : `<div class="no-image">No Image</div>`;

    const footerHTML = href
      ? `<div class="footer"><a href="${this.escapeHTML(href)}" class="view-link" download title="Download Certificate">View Certificate</a></div>`
      : '';

    return `
      <div class="certificate-card">
        <div class="image-wrapper">
          ${imageHTML}
        </div>
        <div class="content">
          <h4 class="title">${this.escapeHTML(title)}</h4>
          <p class="issuer">Issued by: ${this.escapeHTML(issuer)}</p>
          <p class="date">${this.escapeHTML(date)}</p>
        </div>
        ${footerHTML}
      </div>
    `;
  }

  /**
   * Escape HTML special characters to prevent XSS
   */
  escapeHTML(text) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  }
}

// Register the custom element
if (!customElements.get('certificate-list')) {
  customElements.define('certificate-list', CertificateList);
}
