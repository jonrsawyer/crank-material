export default async function displayError(error) {

    const { mapStackTrace } = require("sourcemapped-stacktrace/sourcemapped-stacktrace.js");

    const devmode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

    const promise = new Promise(resolve => mapStackTrace(error.stack, resolve));

    // mapStackTrace() seems to strip newlines; restore them for readability
    const mappedStackTrace = devmode && (await promise).map(line => line + '\n');

    return (
        <div style="border:2px solid red;">
            <h3 style="color:red;">Error: {error.message}</h3>
            <h4>Source-mapped stack:</h4>
            <pre>
                {mappedStackTrace}
            </pre>
            <h4>Original stack:</h4>
            <pre>
                {error.stack}
            </pre>
        </div>
    );
}