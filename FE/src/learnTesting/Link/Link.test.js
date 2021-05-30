// Link.react.test.js
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import Link from "./Link";

test("Link changes the class when hovered", () => {
    const { asFragment, getByTestId } = render(
        <Link page='http://www.facebook.com'>Facebook</Link>
    );

    let tree = asFragment(<Link page='http://www.facebook.com'>Facebook</Link>);
    expect(tree).toMatchSnapshot();

    // manually trigger the callback
    fireEvent.mouseEnter(getByTestId("link"));
    // re-rendering
    tree = asFragment(<Link page='http://www.facebook.com'>Facebook</Link>);
    expect(tree).toMatchSnapshot();

    // manually trigger the callback
    fireEvent.mouseLeave(getByTestId("link"));
    // re-rendering
    tree = asFragment(<Link page='http://www.facebook.com'>Facebook</Link>);
    expect(tree).toMatchSnapshot();
});
