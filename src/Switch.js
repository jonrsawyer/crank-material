import { MDCSwitch } from "@material/switch";

// TODO This has no effect until build process generates the HTML file
// import './Switch.scss';

export default async function* Switch() {
    for await (const { checked, disabled, onclick } of this) {

        const divClass = 'mdc-switch' + (disabled ? ' mdc-switch--disabled' : '') + (checked ? ' mdc-switch--checked' : '')
        const promise = yield (
            <div class="mdc-touch-target-wrapper">
                <div class={divClass}>
                    <div class="mdc-switch__track"></div>
                    <div class="mdc-switch__thumb-underlay">
                        <div class="mdc-switch__thumb"></div>
                        <input type="checkbox" class="mdc-switch__native-control" role="switch" disabled={disabled} aria-checked={checked} checked={checked} onclick={onclick} />
                    </div>
                </div>
            </div>
        );
        const div = await promise; // in case children are async
        new MDCSwitch(div.firstElementChild);
    }
}