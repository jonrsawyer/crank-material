import { MDCRadio } from "@material/radio";

// TODO This has no effect until build process generates the HTML file
// import './Radio.scss';

export default async function* RadioButton() {
    for await (const { checked, disabled, onclick } of this) {

        const divClass = 'mdc-radio' + (disabled ? ' mdc-radio--disabled' : '')
        const promise = yield (
            <div class="mdc-touch-target-wrapper">
                <div class={divClass}>
                    <input class="mdc-radio__native-control" type="radio" disabled={disabled} checked={checked} onclick={onclick} />
                    <div class="mdc-radio__background">
                        <div class="mdc-radio__outer-circle"></div>
                        <div class="mdc-radio__inner-circle"></div>
                    </div>
                    <div class="mdc-radio__ripple"></div>
                </div>
            </div>
        );
        const div = await promise; // in case children are async
        new MDCRadio(div.firstElementChild);
    }
}