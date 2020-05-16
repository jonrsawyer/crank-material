import displayError from './displayError';
import Button from './Button.js';

import './TopAppBar.scss';

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
    try {
        for await (const props of this) {

            const { children, nav, title, type = 'normal' } = props;
            const typeClass = appBarClass(type);

            // Hack: this is needed in App, so set it on props here
            this.set("spacerClass", spacerClass(type));

            if (typeClass === undefined) {
                return <p>Error: unrecognized TopAppBar type: {type}</p>
            }
            const headerClass = 'app-bar mdc-top-app-bar' + typeClass;

            // Create the nav button if there is a nav
            const navTag = nav && <Button type="icon" icon="menu" classes="mdc-top-app-bar__navigation-icon" />;

            // This bit of trickery is needed to ensure an array even when children is a scalar
            [].concat(children).map((action => {
                action.props.classes = (action.props.classes || '') + ' mdc-top-app-bar__action-item';
            }));

            const promise = yield (
                <header class={headerClass}>
                    <div class="mdc-top-app-bar__row">
                        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                            {navTag}
                            <span class="mdc-top-app-bar__title">{title}</span>
                        </section>
                        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
                            {children}
                        </section>
                    </div>
                </header>
            );
            const fragment = await promise; // in case children are async
        }
    } catch (error) {
        return displayError(error);
    }
}
