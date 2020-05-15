export default function displayError(error) {
    return (
        <div>
            <p>Error: {error.message}</p>
            <pre>
                {error.stack}
            </pre>
        </div>
    );
}