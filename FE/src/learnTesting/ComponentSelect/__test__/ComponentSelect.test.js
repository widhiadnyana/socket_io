// __tests__/CheckboxWithLabel-test.js
import React from "react";
import {
    cleanup,
    fireEvent,
    render,
    waitFor,
    act,
    screen,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CheckboxWithLabel from "../ComponentSelect";
// mock
import { fakeUser } from "./__mocks__/mockVariable";

import axiosMock from "axios";
jest.mock("axios");
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

// wait useeffect first request
beforeEach(async () => {
    axiosMock.get.mockResolvedValueOnce({
        data: [
            {
                id: 1,
                name: "Leanne Graham",
                username: "Bret",
                email: "Sincere@april.biz",
            },
            {
                id: 2,
                name: "Ervin Howell",
                username: "Antonette",
                email: "Shanna@melissa.tv",
            },
        ],
    });

    await act(async () => {
        render(<CheckboxWithLabel labelOn='On' labelOff='Off' />);
    });
});

it("rendered without crash", () => {
    expect(screen.getByTestId("checkboxlabel")).toBeInTheDocument();
});

it("select change after request", async () => {
    // checkbox change
    expect(screen.queryByLabelText(/off/i)).toBeTruthy();
    fireEvent.click(screen.getByLabelText(/off/i));
    expect(screen.queryByLabelText(/on/i)).toBeTruthy();

    // wait for the options request
    let options = await screen.findAllByTestId("select-option");
    fireEvent.change(screen.getByTestId("select"), { target: { value: 1 } });

    expect(options[0].selected).toBeTruthy();
    expect(axiosMock.get).toHaveBeenCalledTimes(1);
});

it("type and submit new user", async () => {
    await act(async () => {
        await axiosMock.post.mockResolvedValueOnce({
            data: [
                {
                    id: 1,
                    name: "Leanne Graham",
                    username: "Bret",
                    email: "Sincere@april.biz",
                },
                {
                    id: 2,
                    name: "Ervin Howell",
                    username: "Antonette",
                    email: "Shanna@melissa.tv",
                },
            ],
        });
    });
    // typed correctly
    fireEvent.change(screen.getByTestId("name"), {
        target: { value: fakeUser.name },
    });
    expect(screen.getByTestId("name")).toHaveDisplayValue(fakeUser.name);

    // click submit
    await act(async () => {
        fireEvent.click(screen.getByRole("button", { type: "submit" }));
    });

    expect(screen.getByText(/new user is:/)).toHaveTextContent(fakeUser.name);
    expect(axiosMock.post).toHaveBeenCalledTimes(1);
});
