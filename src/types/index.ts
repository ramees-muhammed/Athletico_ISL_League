export type PlayerPosition = "GK" | "FW" | "CB";

export type RegistrationStatus = "Pending" | "Success";

export interface Player {
id?: string;
fullname: string;
phone: string;
place: string;
// age: number;
club: string;
position : PlayerPosition;
status: RegistrationStatus;
facePhotoUrl?: string;
fullPhotoUrl?: string;
createdAt: number;

};

export interface Admin {
    idNumber: string;
    name: string;
    password?: string;
};

export interface TableRowProps {
    player: Player;
    index: number;
    isAdmin?: boolean;
}