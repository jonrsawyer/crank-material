import {MDCCheckbox} from '@material/checkbox';

// TODO This has no effect until build process generates the HTML file
import './Checkbox.scss';

export default async function* Checkbox() {
    for await (const props of this) {
        const { checked, disabled, indeterminate, onchange } = props;

        const divClass = "mdc-checkbox mdc-checkbox--touch" + (disabled ? " mdc-checkbox--disabled" : "");
        const dataIndeterminate = indeterminate ? "true" : "";

        const promise = yield (
            <div class="mdc-touch-target-wrapper">
                <div class={divClass}>
                    <input type="checkbox" class="mdc-checkbox__native-control" checked={checked} disabled={disabled} onchange={onchange} data-indeterminate={dataIndeterminate}/>
                    <div class="mdc-checkbox__background">
                        <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
                            <path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59" />
                        </svg>
                        <div class="mdc-checkbox__mixedmark"></div>
                    </div>
                    <div class="mdc-checkbox__ripple"></div>
                </div>
            </div>
        );
        const div = await promise; // in case children are async
        new MDCCheckbox(div.firstChild); // for ripple
    }
}