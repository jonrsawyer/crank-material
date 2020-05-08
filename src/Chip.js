import { MDCChip } from "@material/chips";

// TODO This has no effect until build process generates the HTML file
// import './ChipSet.scss';

export default async function* Chip() {
    for await (const props of this) {
        const { cancel, children, filterCheck, input, leadingIcon, onclick, selected } = props;

        const iconDivClass = "material-icons mdc-chip__icon mdc-chip__icon--leading" + (selected ? " mdc-chip__icon--leading-hidden" : "")
        const firstIcon = leadingIcon && (
            <i class={iconDivClass}>{leadingIcon}</i>
        );

        const secondIcon = filterCheck && (
            <span class="mdc-chip__checkmark" >
                <svg class="mdc-chip__checkmark-svg" viewBox="-2 -3 30 30">
                    <path class="mdc-chip__checkmark-path" fill="none" stroke="black" d="M1.73,12.91 8.1,19.28 22.79,4.59" />
                </svg>
            </span>
        );

        const thirdIcon = cancel && (
            <span role="gridcell">
                <i class="material-icons mdc-chip__icon mdc-chip__icon--trailing" tabindex="-1" role="button">cancel</i>
            </span>
        );

        const divClass = "mdc-chip" + (selected ? " mdc-chip--selected" : "") + (input ? " mdc-chip-set--input" : "");

        const promise = yield (
            <div class={divClass} role="row">
                <div class="mdc-chip__ripple"></div>
                {firstIcon}
                {secondIcon}
                <span role="gridcell">
                    <span role="button" tabindex="0" class="mdc-chip__primary-action">
                        <span class="mdc-chip__text">{children}</span>
                    </span>
                </span>
                {thirdIcon}
            </div>
        );
        const div = await promise;
        const chip = new MDCChip(div);
    }
}