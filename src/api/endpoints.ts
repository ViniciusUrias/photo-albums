const ENDPOINTS = {
	USERS: {
		GET: "/users",
		POST: "/users",
		PUT: "/users/:id",
		DELETE: "/users/:id",
	},
	ALBUMS: {
		GET: (userId: number) => `/users/${userId}/albums`,
	},
	PHOTOS: {
		GET: (albumId: number) => `/albums/${albumId}/photos`,
	},
} as const;

export default ENDPOINTS;
