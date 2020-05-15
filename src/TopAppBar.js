import { MDCTopAppBar } from '@material/top-app-bar';
import { Fragment } from '@bikeshaving/crank';
import displayError from './displayError';

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

export default async function* TopAppBar() {
    for await (const { children, title, type = 'normal' } of this) {

        try {
            const typeClass = appBarClass(type);
            if (typeClass === undefined) {
                return <p>Error: unrecognized TopAppBar type: {type}</p>
            }
            const headerClass = 'app-bar mdc-top-app-bar' + typeClass;

            const drawer = children.shift();
            drawer.props.classes = (drawer.props.classes || '') + ' mdc-top-app-bar__navigation-icon';

            children.map((child => {
                child.props.classes = (child.props.classes || '') + ' mdc-top-app-bar__action-item';
            }));

            const promise = yield (
                <Fragment>
                    <header class={headerClass}>
                        <div class="mdc-top-app-bar__row">
                            <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                                {drawer}
                                <span class="mdc-top-app-bar__title">{title}</span>
                            </section>
                            <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
                                {children}
                            </section>
                        </div>
                    </header>
                    <div class={spacerClass(type)}></div>
                </Fragment>
            );
            const fragment = await promise; // in case children are async
            const topAppBar = new MDCTopAppBar(fragment[0]); // for ripple
            const main = document.getElementById('main');
            if (main) {
                console.log('scroll target');
                topAppBar.setScrollTarget(main);
            }
        } catch (error) {
            return displayError(error);
        }
    }
}
