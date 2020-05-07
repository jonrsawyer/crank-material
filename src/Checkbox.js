import { MDCCheckbox } from '@material/checkbox';

// TODO This has no effect until build process generates the HTML file
import './Checkbox.scss';

export default async function* Checkbox(props) {
    for await (const props of this) {
        const { checked, disabled, indeterminate, onchange } = props;
        //const buttonClass = 'mdc-button mdc-button--touch mdc-button--' + (raised ? 'raised' : 'unelevated');

        //<div class="mdc-touch-target-wrapper">
        //</div>

        const div = yield (
            <div class="mdc-checkbox">
                <input type="checkbox" class="mdc-checkbox__native-control" id="cb1" onchange={onchange} />
                <div class="mdc-checkbox__background">
                    <svg class="mdc-checkbox__checkmark"
                        viewBox="0 0 24 24">
                        <path class="mdc-checkbox__checkmark-path"
                            fill="none"
                            d="M1.73,12.91 8.1,19.28 22.79,4.59" />
                    </svg>
                    <div class="mdc-checkbox__mixedmark"></div>
                </div>
                <div class="mdc-checkbox__ripple"></div>
            </div>
        );
        // const checkbox = new MDCCheckbox(div.firstChild);
        // checkbox.checked = checked;
        // checkbox.disabled = disabled;
        // checkbox.indeterminate = indeterminate;
    }
}