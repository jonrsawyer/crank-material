const { mapStackTrace } = require("sourcemapped-stacktrace/sourcemapped-stacktrace.js");

export default async function displayError(error) {

    const devmode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
    if (devmode) {

        const mappedStackTrace = await new Promise(resolve => mapStackTrace(error.stack, resolve));

        // mapStackTrace() seems to strip newlines; restore them for readability
        const fixedStackTrace = mappedStackTrace.map(line => line + '\n');

        return (
            <div style="border:2px solid red;">
                <h3 style="color:red;">Error: {error.message}</h3>
                <h4>Source-mapped stack:</h4>
                <pre>
                    {fixedStackTrace}
                </pre>
                <h4>Original stack:</h4>
                <pre>
                    {error.stack}
                </pre>
            </div>
        );
    } else {
        // Give at least some indication of error in production mode
        return (
            <span title={error.message}>
                <i style="color:red;" class="material-icons" aria-hidden="true">report</i>
            </span>
        );
    }
}