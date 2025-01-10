import { User } from "@/types/user";
import { StateCreator } from "zustand";

export interface AuthState {
	user: User | null;
	signIn: ({ username, password }: { username: string; password: string }) => void;
}

export const createAuthStore: StateCreator<AuthState> = (set) => ({
	user: null,
	signIn: (data) =>
		set(() => ({
			user: {
				username: data.username,
				id: 1,
				name: "Leanne Graham",
				email: "Sincere@april.biz",
				address: {
					street: "Kulas Light",
					suite: "Apt. 556",
					city: "Gwenborough",
					zipcode: "92998-3874",
					geo: {
						lat: "-37.3159",
						lng: "81.1496",
					},
				},
				phone: "1-770-736-8031 x56442",
				website: "hildegard.org",
				company: {
					name: "Romaguera-Crona",
					catchPhrase: "Multi-layered client-server neural-net",
					bs: "harness real-time e-markets",
				},
			},
		})),
});
