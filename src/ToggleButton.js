// import { MDCIconButtonToggle } from "@material/icon-button";
import { MDCRipple } from "@material/ripple";

// TODO This has no effect until build process generates the HTML file
// import './Button.scss';

export default async function* ToggleButton() {
    for await (const { disabled, icon, label, /* onchange, */ onclick, toggled, toggledIcon } of this) {

        const buttonClass = "mdc-icon-button" + (toggled ? " mdc-icon-button--on" : "")
        const promise = yield (
            <div class="mdc-touch-target-wrapper">
                <button class={buttonClass} aria-label={label} aria-pressed={toggled} onclick={onclick} disabled={disabled}>
                    <i class="material-icons mdc-icon-button__icon mdc-icon-button__icon--on">{toggledIcon}</i>
                    <i class="material-icons mdc-icon-button__icon">{icon}</i>
                </button>
            </div>
        );
        const div = await promise; // in case children are async
        // Using MDCRipple gives me the data model I want: Controller drives View, no state in View. But the visual ripple
        // stutters when I do it with MDCRipple this way.
        const ripple = new MDCRipple(div.firstElementChild);
        ripple.unbounded = true;
        // Using MDCIconButtonToggle looks better visually, but keeps toggle state in MDCIconButtonToggle class.
        // const toggle = new MDCIconButtonToggle(div.firstElementChild);
        // toggle.unbounded = true;
        // toggle.listen('MDCIconButtonToggle:change', onchange);
    }
}