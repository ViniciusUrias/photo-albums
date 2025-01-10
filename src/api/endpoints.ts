const ENDPOINTS = {
	USERS: {
		GET: "/users",
		POST: "/users",
		PUT: "/users/:id",
		DELETE: "/users/:id",
	},
	ALBUMS: {
		GET: (userId: number) => `/users/${userId}/albums`,
		POST: (userId: number) => `/users/${userId}/albums`,
		DELETE: (albumId: number) => `/albums/${albumId}`,
		PUT: (userId: number) => `/users/${userId}/albums`,
	},
	PHOTOS: {
		GET: (albumId: number) => `/albums/${albumId}/photos`,
		POST: () => `/photos`,
		DELETE: (photoId: number) => `/photos/${photoId}`,
	},
} as const;

export default ENDPOINTS;
