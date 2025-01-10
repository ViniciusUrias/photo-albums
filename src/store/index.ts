import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthState, createAuthStore } from "./auth";

export const useSelector = create<AuthState>()(
	persist(
		(...a) => ({
			...createAuthStore(...a),
		}),
		{ name: "auth" }
	)
);
