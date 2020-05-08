import { MDCChipSet } from '@material/chips';

// TODO This has no effect until build process generates the HTML file
//import './ChipSet.scss';

export default async function* ChipSet() {
    for await (const props of this) {
        const { children, choice, filter } = props;
        const divClass = "mdc-chip-set" + (choice ? " mdc-chip-set--choice" : (filter ? " mdc-chip-set--filter" : ""));

        const promise = yield (
            <div class={divClass} role="grid">
                {children}
            </div>
        );
        const div = await promise; // Chip children are async
        new MDCChipSet(div); // for ripple
    }
}