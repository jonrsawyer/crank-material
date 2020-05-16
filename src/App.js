import { MDCTopAppBar } from '@material/top-app-bar';
import { Fragment } from '@bikeshaving/crank';
import displayError from './displayError';
import { MDCDrawer } from '@material/drawer';

// TODO This has no effect until build process generates the HTML file
// import './Menu.scss';

// TODO This belongs in TopAppBar only.
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

export default async function* App() {
    try {
        for await (const { topAppBar, children, drawer } of this) {

            // Hack: TopAppBar sets this prop for us here
            const type = topAppBar.props.type;
            const divClass = spacerClass(type);

            const promise = yield (
                <Fragment>
                    {drawer}
                    <div class="mdc-drawer-app-content">
                        {topAppBar}
                        <main class="main-content">
                            <div class={divClass}>
                                {children}
                            </div>
                        </main>
                    </div>
                </Fragment>
            );
            const fragment = await promise; // in case children are async
            const drawerElement = drawer && fragment[0];
            // Index from the end to avoid issues with presence or absence of drawer and scrim
            const appContent = fragment[fragment.length - 1];
            const topAppBarElement = appContent.firstElementChild;
            const topAppBarComp = new MDCTopAppBar(topAppBarElement); // for ripple
            const mainElement = appContent.children[1];
            topAppBarComp.setScrollTarget(mainElement);
            if (drawerElement) {
                let drawerComp;
                // HACK!!! This constructor expects drawerElement to have a parentNode (e.g. added to DOM), which it isn't yet.
                setTimeout(() => {
                    // This is a little weird, creating MDCDrawer here and not in the Drawer component.
                    drawerComp = new MDCDrawer(drawerElement);
                }, 50);
                topAppBarComp.listen('MDCTopAppBar:nav', () => {
                    drawerComp.open = !drawerComp.open;
                });
            }
        }
    } catch (error) {
        return displayError(error);
    }
}
