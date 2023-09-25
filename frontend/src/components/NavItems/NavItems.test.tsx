import * as ReactRouterDom from "react-router-dom";
import { render, screen } from "@testing-library/react";

import { NavItems } from ".";

let mockRole = "Supplier";
vi.mock("@hooks", () => ({
  useAuthContext: () => ({
    user: {
      address: "0xa",
      name: "John",
      role: mockRole,
    },
  }),
}));

vi.mock("react-router-dom", async () => {
  const actual: object = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useLocation: () => ({
      pathname: "localhost:3000/example/path",
    }),
  };
});

describe("NavItems", () => {
  it("Should render NavItems for Supplier Role", () => {
    render(
      <ReactRouterDom.MemoryRouter>
        <NavItems />
      </ReactRouterDom.MemoryRouter>
    );

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(5);
  });

  it("Should render NavItems for Vendor Role", () => {
    mockRole = "Vendor";
    render(
      <ReactRouterDom.MemoryRouter>
        <NavItems />
      </ReactRouterDom.MemoryRouter>
    );

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(3);
  });
});
