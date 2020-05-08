import { MDCRipple } from "@material/ripple";

// TODO This has no effect until build process generates the HTML file
import './Button.scss';

export default async function* Button() {
    for await (const props of this) {
        const { children, disabled, icon, iconAfter, onclick, raised = true } = props;
        const buttonClass = 'mdc-button mdc-button--touch mdc-button--' + (raised ? 'raised' : 'unelevated');
        const iTag = <i class="material-icons mdc-button__icon" aria-hidden="true">{icon}</i>;
        const beforeIcon = !!icon && !iconAfter && iTag;
        const afterIcon = !!icon && iconAfter && iTag;

        const promise = yield (
            <div class="mdc-touch-target-wrapper">
                <button class={buttonClass} onclick={() => onclick()} disabled={disabled}>
                    <div class="mdc-button__ripple"></div>
                    {beforeIcon}
                    <span class="mdc-button__label">{children}</span>
                    {afterIcon}
                    <div class="mdc-button__touch"></div>
                </button>
            </div>
        );
        const div = await promise; // in case children are async
        new MDCRipple(div.firstChild);
    }
}