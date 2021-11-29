export interface Usuario {
    uid: string,
    nombre: string,
    email: string,
    foto: string,
    rol: string,
    albumes: Album[]
}

export interface Album {
    nombre: string,
    imagenes: Imagenes[],
    visibilidad: string,
}

export interface Imagenes {
    url: string,
    nombre: string
}

export interface SubirImagen {
    url?: string
    nombre: string,
    descripcion: string,
    album: string,
    visibilidad: string,
}

// export type Visibilidad = 'Público' | 'Privado';