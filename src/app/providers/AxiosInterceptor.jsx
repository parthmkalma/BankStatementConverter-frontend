// app/providers/AxiosInterceptor.jsx
"use client";

import { useEffect } from "react";
import axios from "axios";  // ✅ using the default global axios
import { useRouter } from "next/navigation";

export default function AxiosInterceptor() {
    const router = useRouter();

    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            (response) => response,
            (error) => {
                const { response, config } = error;

                if (response && response.status === 401) {
                    if (config.url.includes("/me")) {
                        return Promise.reject(error); // don't redirect for /refresh
                    }
                    router.push("/login");
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.response.eject(interceptor);
        };
    }, [router]);

    return null; // doesn't render anything
}
