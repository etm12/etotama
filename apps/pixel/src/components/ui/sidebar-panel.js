import * as React from 'karet';

/**
 *
 * @param {Props} props
 */
export default function SidebarPanel ({ title, children }) {
  return (
    <section className="sidebar-panel">
      <header className="sidebar-panel__header">
        {title}
      </header>

      <div className="sidebar-panel__body">

        {children}
      </div>
    </section>
  );
}

//

/**
 * @typedef {object} Props
 * @prop {string} title
 * @prop {boolean} collapse
 */
