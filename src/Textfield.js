import { MDCTextField } from '@material/textfield';
import { Fragment } from '@bikeshaving/crank';

// TODO This has no effect until build process generates the HTML file
//import './Checkbox.scss';

export default async function* Textfield() {
    for await (const props of this) {
        const { columns = 40, label, rows = 8, type } = props;

        // TODO What to use for "my-label-id" so it's unique for each Textfield?
        const inputTag = <input class="mdc-text-field__input" type="text" aria-labelledby="my-label-id" />;
        const labelTag = label && <span class="mdc-floating-label" id="my-label-id">{label}</span>;

        const filledLabelClass = "mdc-text-field mdc-text-field--filled" + (label ? "" : " mdc-text-field--no-label");
        const filledTags = (
            <label class={filledLabelClass}>
                <span class="mdc-text-field__ripple"></span>
                {inputTag}
                {labelTag}
                <span class="mdc-line-ripple"></span>
            </label>
        );

        const fullWidthLabelClass = "mdc-text-field mdc-text-field--filled mdc-text-field--fullwidth" + (label ? "" : " mdc-text-field--no-label");
        const fullWidthTags = (
            <label class={fullWidthLabelClass}>
                <span class="mdc-text-field__ripple"></span>
                <input class="mdc-text-field__input" type="text" placeholder={label ? label : ""} aria-label={label} />
                <span class="mdc-line-ripple"></span>
            </label>
        );

        const labelSpan = label && (
            <span class="mdc-notched-outline__notch">
                {labelTag}
            </span>
        );

        const outlinedLabelClass = "mdc-text-field mdc-text-field--outlined" + (label ? "" : " mdc-text-field--no-label");
        const outlinedTags = (
            <label class={outlinedLabelClass}>
                {inputTag}
                <span class="mdc-notched-outline">
                    <span class="mdc-notched-outline__leading"></span>
                    {labelSpan}
                    <span class="mdc-notched-outline__trailing"></span>
                </span>
            </label>
        );

        const textAreaLabelClass = "mdc-text-field mdc-text-field--outlined mdc-text-field--textarea" + (label ? "" : " mdc-text-field--no-label");
        const textareaTags = (
            <label class={textAreaLabelClass}>
                <textarea class="mdc-text-field__input" rows={rows} cols={columns} aria-label={label}></textarea>
                <span class="mdc-notched-outline">
                    <span class="mdc-notched-outline__leading"></span>
                    {labelSpan}
                    <span class="mdc-notched-outline__trailing"></span>
                </span>
            </label>
        );

        const tags = (type === "filled" ? filledTags : type === "full-width" ? fullWidthTags : type === "textarea" ? textareaTags : outlinedTags);

        const promise = yield (
            <Fragment>
                {tags}
            </Fragment>
        );
        const element = await promise; // in case children are async
        new MDCTextField(element); // for ripple
    }
}