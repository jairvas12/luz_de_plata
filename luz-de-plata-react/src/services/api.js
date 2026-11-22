const API_URL = "http://localhost:8080/api/v1";

export async function apiRequest(
    endpoint,
    options = {}
) {
    const token = localStorage.getItem("token");

    const headers = {
        "Content-Type": "application/json",
        ...(options.headers || {})
    };

    if (token) {
        headers.Authorization =
            `Bearer ${token}`;
    }

    const response = await fetch(
        `${API_URL}${endpoint}`,
        {
            ...options,
            headers
        }
    );

    if (!response.ok) {
        let errorData = null;

        try {
            errorData = await response.json();
        } catch {
            errorData = null;
        }

        throw new Error(
            errorData?.mensaje
            || `Error HTTP ${response.status}`
        );
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
}