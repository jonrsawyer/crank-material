import { MDCRipple } from "@material/ripple";
import { Fragment } from '@bikeshaving/crank';

// TODO This has no effect until build process generates the HTML file
import './Button.scss';

function typeClass(type) {
    switch (type) {
        case 'icon': return 'mdc-icon-button material-icons';
        case 'text': return 'mdc-button mdc-button--touch';
        case 'outlined': return 'mdc-button mdc-button--touch mdc-button--outlined';
        case 'raised': return 'mdc-button mdc-button--touch mdc-button--raised';
        case 'unelevated': return 'mdc-button mdc-button--touch mdc-button--unelevated'; // or 'contained'?
        default: return undefined;
    }
}

function buttonBody(icon, iconAfter, children) {
    const iTag = <i class="material-icons mdc-button__icon" aria-hidden="true">{icon}</i>;
    const beforeIcon = !!icon && !iconAfter && iTag;
    const afterIcon = !!icon && iconAfter && iTag;
    return (
        <Fragment>
            <div class="mdc-button__ripple"></div>
            {beforeIcon}
            <span class="mdc-button__label">{children}</span>
            {afterIcon}
            <div class="mdc-button__touch"></div>
        </Fragment>
    );
}

export default async function* Button() {
    for await (const { children, disabled, icon, iconAfter, onclick, type } of this) {

        // Default to type 'text' if type unspecified
        const buttonClass = typeClass(type || 'text');

        // Throwing an error doesn't work here - it's swallowed!
        if (!buttonClass) {
            return <p>Error: unrecognized Button type: '{type}'</p>;
        }

        // For an icon button, the button body just specifies the icon name; for all other
        // button types, the button body is more complex.
        const body = type === 'icon' ? icon : buttonBody(icon, iconAfter, children);

        const promise = yield (
            <div class="mdc-touch-target-wrapper">
                <button class={buttonClass} onclick={() => onclick()} disabled={disabled}>{body}</button>
            </div>
        );
        const div = await promise; // in case children are async
        const ripple = new MDCRipple(div.firstElementChild);
        if (type === 'icon') {
            ripple.unbounded = true;
        }
    }
}