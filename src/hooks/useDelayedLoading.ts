import { useEffect, useState } from "react";

export function useDelayedLoading(loading: boolean, delay = 300) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (loading) {

            timeout = setTimeout(() => setShow(true), 100);
        } else {
            timeout = setTimeout(() => setShow(false), delay);
        }
        return () => clearTimeout(timeout);
    }, [loading, delay]);

    return show;
}
