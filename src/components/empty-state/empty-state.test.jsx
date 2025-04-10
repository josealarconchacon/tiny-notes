import { render, screen } from "@testing-library/react";
import EmptyState from "./EmptyState";

describe("EmptyState component", () => {
  it('renders empty state message for "all" category', () => {
    render(<EmptyState activeCategory="all" />);

    expect(screen.getByText("📝")).toBeInTheDocument();
    expect(screen.getByText("No notes found")).toBeInTheDocument();
    expect(
      screen.getByText(
        "You don't have any notes yet. Create your first note to get started!"
      )
    ).toBeInTheDocument();
  });

  it("renders category-specific empty state message for other categories", () => {
    render(<EmptyState activeCategory="work" />);

    expect(screen.getByText("📝")).toBeInTheDocument();
    expect(screen.getByText("No notes found")).toBeInTheDocument();
    expect(
      screen.getByText("You don't have any notes in this category yet.")
    ).toBeInTheDocument();
  });
});
