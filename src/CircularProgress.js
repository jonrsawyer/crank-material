import { MDCCircularProgress } from '@material/circular-progress';
import { Fragment } from '@bikeshaving/crank';
import displayError from './displayError';

import './CircularProgress.scss';

const small = {
    viewBox: "0 0 48 48",
    cxy: 24,
    r: 18,
    strokeDasharray: 113.097,
    strokeDashoffset1: 113.097,
    strokeDashoffset2: 56.549
};
const medium = {
    viewBox: "0 0 32 32",
    cxy: 16,
    r: 12.5,
    strokeDasharray: 78.54,
    strokeDashoffset1: 78.54,
    strokeDashoffset2: 39.27
};
const large = {
    viewBox: "0 0 24 24",
    cxy: 12,
    r: 8.75,
    strokeDasharray: 54.978,
    strokeDashoffset1: 54.978,
    strokeDashoffset2: 27.489
};

function determinateContainer(s) {
    return (
        <div class="mdc-circular-progress__determinate-container">
            <svg class="mdc-circular-progress__determinate-circle-graphic" viewBox={s.viewBox} xmlns="http://www.w3.org/2000/svg">
                <circle class="mdc-circular-progress__determinate-circle" cx={s.cxy} cy={s.cxy} r={s.r} stroke-dasharray={s.strokeDasharray} stroke-dashoffset={s.strokeDashoffset1} />
            </svg>
        </div>
    );
}

function indeterminateContainer(s, color) {
    return (
        <div class="mdc-circular-progress__indeterminate-container">
            <div class="mdc-circular-progress__spinner-layer" mdc-circular-progress__color-1={color === 1} mdc-circular-progress__color-2={color === 2} mdc-circular-progress__color-3={color === 3} mdc-circular-progress__color-4={color === 4}>
                <div class="mdc-circular-progress__circle-clipper mdc-circular-progress__circle-left">
                    <svg class="mdc-circular-progress__indeterminate-circle-graphic" viewBox={s.viewBox} xmlns="http://www.w3.org/2000/svg">
                        <circle cx={s.cxy} cy={s.cxy} r={s.r} stroke-dasharray={s.strokeDasharray} stroke-dashoffset={s.strokeDashoffset2} />
                    </svg>
                </div><div class="mdc-circular-progress__gap-patch">
                    <svg class="mdc-circular-progress__indeterminate-circle-graphic" viewBox={s.viewBox} xmlns="http://www.w3.org/2000/svg">
                        <circle cx={s.cxy} cy={s.cxy} r={s.r} stroke-dasharray={s.strokeDasharray} stroke-dashoffset={s.strokeDashoffset2} />
                    </svg>
                </div><div class="mdc-circular-progress__circle-clipper mdc-circular-progress__circle-right">
                    <svg class="mdc-circular-progress__indeterminate-circle-graphic" viewBox={s.viewBox} xmlns="http://www.w3.org/2000/svg">
                        <circle cx={s.cxy} cy={s.cxy} r={s.r} stroke-dasharray={s.strokeDasharray} stroke-dashoffset={s.strokeDashoffset2} />
                    </svg>
                </div>
            </div>
        </div>
    );
}

function indeterminateContainers(s, animateColor) {
    if (animateColor) {
        return (
            <Fragment>
                {indeterminateContainer(s, 1)}
                {indeterminateContainer(s, 2)}
                {indeterminateContainer(s, 3)}
                {indeterminateContainer(s, 4)}
            </Fragment>
        )
    } else {
        return indeterminateContainer(s, 0);
    }
}

export default async function* CircularProgress() {
    try {
        for await (const props of this) {
            const { animateColor, determinate, label, progress, size } = props;

            const s = size === "small" ? small : size === "medium" ? medium : large;

            //const container = (determinate ? determinateContainer(s) : indeterminateContainers(s, animateColor));

            const divClass = "mdc-circular-progress mdc-circular-progress--" + size;

            const promise = yield (
                <div class={divClass} role="progressbar" aria-label={label} aria-valuemin="0" aria-valuemax="1">
                    {determinateContainer(s)}
                    {indeterminateContainers(s, animateColor)}
                </div>
            );
            const div = await promise; // Chip children are async
            const circularProgress = new MDCCircularProgress(div); // for ripple
            circularProgress.determinate = determinate;
            circularProgress.progress = progress;
        }
    } catch (error) {
        return displayError(error);
    }
}
