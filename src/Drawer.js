import { MDCDrawer } from '@material/drawer';
import displayError from './displayError';
import { Fragment } from '@bikeshaving/crank';
import List from './List.js';

// TODO This has no effect until build process generates the HTML file
// import './Menu.scss';

export default async function* Drawer() {
    try {
        for await (const { children, modal, title, subtitle } of this) {

            const titleElement = title && <h3 class="mdc-drawer__title">{title}</h3>;
            const subtitleElement = subtitle && <h6 class="mdc-drawer__subtitle">{subtitle}</h6>;

            const header = (title || subtitle) && (
                <div class="mdc-drawer__header">
                    {titleElement}
                    {subtitleElement}
                </div>
            );

            const asideClass = "mdc-drawer " + (modal ? "mdc-drawer--modal" : "mdc-drawer--dismissible");

            const scrim = modal && <div class="mdc-drawer-scrim"></div>;

            const p = yield (
                <Fragment>
                    <aside class={asideClass}>
                        {header}
                        <div class="mdc-drawer__content">
                            <nav class="mdc-list">
                                {children}
                            </nav>
                        </div>
                    </aside>
                    {scrim}
                </Fragment>
            );
            const aside = await p; // in case children are async
        }
    } catch (error) {
        return displayError(error);
    }
}
