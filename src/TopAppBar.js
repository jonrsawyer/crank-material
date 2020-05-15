import { MDCTopAppBar } from '@material/top-app-bar';
import { Fragment } from '@bikeshaving/crank';
import displayError from './displayError';
import Button from './Button.js';
import { MDCDrawer } from '@material/drawer';

// TODO This has no effect until build process generates the HTML file
// import './Menu.scss';

function appBarClass(type) {
    switch (type) {
        case 'dense': return ' mdc-top-app-bar--dense';
        case 'fixed': return ' mdc-top-app-bar--fixed';
        case 'prominent': return ' mdc-top-app-bar--prominent';
        case 'short': return ' mdc-top-app-bar--short';
        case 'short-closed': return ' mdc-top-app-bar--short-collapsed';
        case 'normal': return '';
        default: return undefined;
    }
}

function spacerClass(type) {
    switch (type) {
        case 'dense': return 'mdc-top-app-bar--dense-fixed-adjust';
        case 'fixed': return 'mdc-top-app-bar--fixed-adjust';
        case 'prominent': return 'mdc-top-app-bar--prominent-fixed-adjust';
        case 'short': return 'mdc-top-app-bar--short-fixed-adjust';
        case 'short-closed': return 'mdc-top-app-bar--short-fixed-adjust';
        case 'normal': return 'mdc-top-app-bar--fixed-adjust';
        default: return undefined;
    }
}

function createDrawer(drawerItems, modal) {
    const asideClass = "mdc-drawer " + (modal ? "mdc-drawer--modal" : "mdc-drawer--dismissible")
    const header = (
        <div class="mdc-drawer__header">
            <h3 class="mdc-drawer__title">Mail</h3>
            <h6 class="mdc-drawer__subtitle">email@material.io</h6>
        </div>
    );
    return (
        <aside class={asideClass}>
            {header}
            <div class="mdc-drawer__content">
                <ul class="mdc-list">
                    {drawerItems}
                </ul>
            </div>
        </aside>
    );
}

export default async function* TopAppBar() {
    for await (const { actions, children, drawerItems, modal, title, type = 'normal' } of this) {

        try {
            const typeClass = appBarClass(type);
            if (typeClass === undefined) {
                return <p>Error: unrecognized TopAppBar type: {type}</p>
            }
            const headerClass = 'app-bar mdc-top-app-bar' + typeClass;

            // Create the nav button if there is a drawer
            const nav = drawerItems && <Button type="icon" icon="menu" classes="mdc-top-app-bar__navigation-icon" />;

            // This bit of trickery is needed to ensure actions is an array even when only one item supplied
            [].concat(actions).map((action => {
                action.props.classes = (action.props.classes || '') + ' mdc-top-app-bar__action-item';
            }));

            const drawer = drawerItems && createDrawer(drawerItems, modal);
            const scrim = modal && <div class="mdc-drawer-scrim"></div>;

            const promise = yield (
                <Fragment>
                    {drawer}
                    {scrim}
                    <div class="mdc-drawer-app-content">
                        <header class={headerClass}>
                            <div class="mdc-top-app-bar__row">
                                <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                                    {nav}
                                    <span class="mdc-top-app-bar__title">{title}</span>
                                </section>
                                <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
                                    {actions}
                                </section>
                            </div>
                        </header>
                        <main class="main-content">
                            <div class={spacerClass(type)}>
                                {children}
                            </div>
                        </main>
                    </div>
                </Fragment>
            );
            const fragment = await promise; // in case children are async
            const drawerElement = drawerItems && fragment[0];
            // Index from the end to avoid issues with presence or absence of drawer and scrim
            const appContent = fragment[fragment.length - 1];
            const topAppBarElement = appContent.firstElementChild;
            const topAppBar = new MDCTopAppBar(topAppBarElement); // for ripple
            const mainElement = appContent.children[1];
            topAppBar.setScrollTarget(mainElement);
            if (drawerElement) {
                let drawerComp;
                // HACK!!! This constructor expects drawerElement to have a parentNode (e.g. added to DOM), which it isn't yet.
                setTimeout(() => {
                    drawerComp = new MDCDrawer(drawerElement);
                }, 50);
                topAppBar.listen('MDCTopAppBar:nav', () => {
                    drawerComp.open = !drawerComp.open;
                });
            }
        } catch (error) {
            return displayError(error);
        }
    }
}
