import { MDCRipple } from "@material/ripple";
import { Fragment } from '@bikeshaving/crank';

// TODO This has no effect until build process generates the HTML file
// import './Button.scss';

export default async function* IconButton() {
    for await (const { disabled, icon, label, onclick } of this) {
        const promise = yield (
            <div class="mdc-touch-target-wrapper">
                <button class="mdc-icon-button material-icons" aria-label={label} onclick={onclick} disabled={disabled}>{icon}</button>
            </div>
        );
        const div = await promise; // in case children are async
        const ripple = new MDCRipple(div.firstChild);
        ripple.unbounded = true;
    }
}