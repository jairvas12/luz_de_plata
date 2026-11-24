const API_URL =
    "http://localhost:8080/api/v1";

function limpiarSesion() {
    localStorage.removeItem("token");
    localStorage.removeItem(
        "lp_session_v1"
    );
    localStorage.removeItem("sesion");
}

export async function apiRequest(
    endpoint,
    options = {}
) {
    const token =
        localStorage.getItem("token");

    const headers = {
        "Content-Type":
            "application/json",
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

    // SESIÓN INVÁLIDA O EXPIRADA
    if (response.status === 401) {

        limpiarSesion();

        if (
            window.location.pathname
            !== "/Login"
        ) {
            window.location.replace(
                "/Login"
            );
        }

        throw new Error(
            "Tu sesión expiró. Inicia sesión nuevamente."
        );
    }

    // AUTENTICADO PERO SIN PERMISOS
    if (response.status === 403) {

        let errorData = null;

        try {
            errorData =
                await response.json();
        } catch {
            errorData = null;
        }

        throw new Error(
            errorData?.mensaje
            || "No tienes permisos para realizar esta acción."
        );
    }

    if (!response.ok) {

        let errorData = null;

        try {
            errorData =
                await response.json();
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