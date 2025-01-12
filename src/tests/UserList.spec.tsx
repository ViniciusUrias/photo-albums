import UserList from "@/components/UserList";
import { Users } from "@/types/user";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { createRoutesStub } from "react-router";

test("Renders users cards in the user list", async () => {
	const mockUsers: Users = [
		{
			id: 1,
			name: "Leanne Graham",
			username: "Bret",
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
		{
			id: 4,
			name: "Patricia Lebsack",
			username: "Karianne",
			email: "Julianne.OConner@kory.org",
			address: {
				street: "Hoeger Mall",
				suite: "Apt. 692",
				city: "South Elvis",
				zipcode: "53919-4257",
				geo: {
					lat: "29.4572",
					lng: "-164.2990",
				},
			},
			phone: "493-170-9623 x156",
			website: "kale.biz",
			company: {
				name: "Robel-Corkery",
				catchPhrase: "Multi-tiered zero tolerance productivity",
				bs: "transition cutting-edge web services",
			},
		},
	];
	const Stub = createRoutesStub([
		{
			path: "/users",
			Component: () => <UserList users={mockUsers} />,
		},
	]);

	render(<Stub initialEntries={["/users"]} />);

	const user1 = await screen.findByText(/Leanne Graham/i);
	const user2 = await screen.findByText(/Patricia Lebsack/i);
	const list = screen.getByTestId("user-list");
	expect(list.childNodes.length).toBe(2);

	expect(user1).toBeInTheDocument();
	expect(user2).toBeInTheDocument();
});
test("Renders message when user is empty", async () => {
	const Stub = createRoutesStub([
		{
			path: "/users",
			Component: () => <UserList users={[]} />,
		},
	]);

	render(<Stub initialEntries={["/users"]} />);

	const message = screen.getByRole("strong");
	expect(message).toBeInTheDocument();
});
test("User action when click in button", async () => {
	const mockUsers: Users = [
		{
			id: 1,
			name: "Leanne Graham",
			username: "Bret",
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
		{
			id: 4,
			name: "Patricia Lebsack",
			username: "Karianne",
			email: "Julianne.OConner@kory.org",
			address: {
				street: "Hoeger Mall",
				suite: "Apt. 692",
				city: "South Elvis",
				zipcode: "53919-4257",
				geo: {
					lat: "29.4572",
					lng: "-164.2990",
				},
			},
			phone: "493-170-9623 x156",
			website: "kale.biz",
			company: {
				name: "Robel-Corkery",
				catchPhrase: "Multi-tiered zero tolerance productivity",
				bs: "transition cutting-edge web services",
			},
		},
	];
	const Stub = createRoutesStub([
		{
			path: "/users",
			Component: () => <UserList users={mockUsers} />,
		},
	]);

	render(<Stub initialEntries={["/users"]} />);

	const user1 = await screen.findByText(/Leanne Graham/i);
	const user2 = await screen.findByText(/Patricia Lebsack/i);
	const list = screen.getByTestId("user-list");
	expect(list.childNodes.length).toBe(2);

	expect(user1).toBeInTheDocument();
	expect(user2).toBeInTheDocument();

	const link = screen.getAllByRole("link");
	expect(link.length === 2);
});
