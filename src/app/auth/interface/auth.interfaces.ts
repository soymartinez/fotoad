export interface AuthResponse {
    ok:      boolean;
    uid?:    string;
    name?:   string;
    token?:  string;
    msj?:    string;
}

export interface Usuario {
    uid: string;
    name: string;
}