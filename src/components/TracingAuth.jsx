import { useEffect, useState } from "react";
import "./../styles/TracingAuth.scss";
import TracingUIService from "../services/TracingUI.service";

const TracingAuth = ({ updateServer }) => {
    const [ server, setServer ] = useState("");
    const [ hasEmptyCredentials, setHasEmptyCredentials ] = useState(false);
    const [ isCredentialsValid, setIsCredentialsValid ] = useState(true);
    const [ loading, setLoading ] = useState(false);
    const [ isServerChanged, setIsServerChanged ] = useState(false);

    const onSubmit = async () => {
        if (hasEmptyCredentials) return;

        setLoading(true);
        const isAuthorized = await TracingUIService.auth(server);
        setLoading(false);
        setIsCredentialsValid(isAuthorized);
        if (isAuthorized) {
            updateServer(TracingUIService.server);
        }
    }

    useEffect(() => {
        if (!isServerChanged) {
            setIsServerChanged(true);
            return;
        }

        let isEmpty = false;

        if (!server.trim().length) {
            isEmpty = true;
        }

        setHasEmptyCredentials(isEmpty);
    }, [ server ])

    return (
        <div className="tracing-auth">
            <div className="tracing-auth__form">
                <div className="tracing-ui__logo">Tracing UI</div>
                <input type="text"
                    placeholder="Server"
                    value={server}
                    onChange={(e) => setServer(e.target.value)}
                    onKeyPress={(e) => e.code === "Enter" ? onSubmit() : null}
                />
                {!isCredentialsValid && <div className="tracing-ui__error">Server is invalid</div>}
                {hasEmptyCredentials && <div className="tracing-ui__error">Fill server url to login</div>}
                <button disabled={loading || hasEmptyCredentials}
                    onClick={onSubmit}
                >{ loading ? "Loading..." : "Login"}</button>
            </div>
        </div>
    );
};

export default TracingAuth;