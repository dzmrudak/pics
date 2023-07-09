import React from 'react';
import { waitFor, render, screen, fireEvent } from '@testing-library/react';
import MainPage from '../components/MainPage';
import axios from 'axios';

jest.mock('axios');
global.URL.createObjectURL = jest.fn();

afterEach(() => {
    jest.clearAllMocks();
});

describe('MainPage elements', () => {

    test('header should be rendered', async () => {
        render(<MainPage />);
        const titleElement = screen.getByText('Random Pictures Grid');
        expect(titleElement).toBeInTheDocument();
    });

    test('search label should be rendered', async () => {
        render(<MainPage />);
        const searchLabelElement = screen.getByLabelText('Search Picture:');
        expect(searchLabelElement).toBeInTheDocument();
    });

    test('search input should be rendered', async () => {
        render(<MainPage />);
        const searchInput = screen.getByPlaceholderText(/Enter a picture name/i);
        expect(searchInput).toBeInTheDocument();
    });

    test('button should be rendered', async () => {
        render(<MainPage />);
        const buttonEl = screen.getByRole('button', { name: 'Submit' });
        expect(buttonEl).toBeInTheDocument();
    });

    test('picture container should be rendered', async () => {
        render(<MainPage />);
        const pictureContainerElement = screen.getByTestId('picture-container');
        expect(pictureContainerElement).toBeInTheDocument();
    });

    test("search picture input should be empty", () => {
        render(<MainPage />);
        const searchInput = screen.getByPlaceholderText(/Enter a picture name/i);
        expect(searchInput.value).toBe("");
    });

    test("button should be disabled", () => {
        render(<MainPage />);
        const buttonEl = screen.getByRole("button");
        expect(buttonEl).toBeDisabled();
    });

    test("search input should change", () => {
        render(<MainPage />);
        const searchInput = screen.getByPlaceholderText(/Enter a picture name/i);
        const testValue = "test";

        fireEvent.change(searchInput, { target: { value: testValue } });
        expect(searchInput.value).toBe(testValue);
    });

    test("button should not be disabled when input exists", () => {
        render(<MainPage />);
        const buttonEl = screen.getByRole("button");
        const searchInput = screen.getByPlaceholderText(/Enter a picture name/i);

        const testValue = "test";

        fireEvent.change(searchInput, { target: { value: testValue } });

        expect(buttonEl).not.toBeDisabled();
    });

    test('displays 9 pictures in the picture grid', async () => {
        const mockPictures = Array.from({ length: 9 }, (_, index) => ({
            picture: `picture${index + 1}`,
        }));

        axios.get.mockResolvedValue({ data: mockPictures });

        render(<MainPage />);

        await waitFor(() => {
            const pictureElements = screen.queryAllByAltText((_, element) =>
                element.alt.startsWith('Picture')
            );
            expect(pictureElements).toHaveLength(9);
        });

        expect(axios.get).toHaveBeenCalledTimes(9);
    });

});

describe('Search Picture functionality', () => {
    test('displays the searched picture with the correct src attribute', async () => {
        console.log("Test 4.1");
        const mockPicture = { picture: 'searched-picture' };
        const mockResponse = { data: mockPicture, statusText: 'OK' };
        axios.post.mockResolvedValue(mockResponse);

        const createObjectURLSpy = jest
            .spyOn(URL, 'createObjectURL')
            .mockReturnValue('picture://searched-picture');

        render(<MainPage />);

        const searchInput = screen.getByLabelText('Search Picture:');
        const submitButton = screen.getByRole('button', { name: 'Submit' });

        fireEvent.change(searchInput, { target: { value: 'cat' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            const searchedPicture = screen.getByAltText('cat');
            expect(searchedPicture).toBeInTheDocument();
            expect(searchedPicture).toHaveAttribute('src', 'picture://searched-picture');
        });

        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(axios.post).toHaveBeenCalledWith('/picture', expect.any(FormData), {
            responseType: 'blob',
        });

        expect(createObjectURLSpy).toHaveBeenCalledTimes(1);
        expect(createObjectURLSpy).toHaveBeenCalledWith(mockResponse.data);
    });

    test('displays an error message when search request fails', async () => {
        const errorMessage = 'Search request failed';
        axios.post.mockRejectedValue({ response: { statusText: errorMessage } });

        render(<MainPage />);

        const searchInput = screen.getByLabelText('Search Picture:');
        const submitButton = screen.getByRole('button', { name: 'Submit' });

        fireEvent.change(searchInput, { target: { value: 'cat' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            const errorMessageElement = screen.getByText(`Error: ${errorMessage}`);
            expect(errorMessageElement).toBeInTheDocument();
        });

        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(axios.post).toHaveBeenCalledWith(
            '/picture',
            expect.any(FormData),
            { responseType: 'blob' }
        );
    });

    test('displays an error message when processing the request fails', async () => {
        const errorMessage = 'An error occurred while processing your request.';
        axios.post.mockRejectedValue(new Error(errorMessage));

        render(<MainPage />);

        const searchInput = screen.getByLabelText('Search Picture:');
        const submitButton = screen.getByRole('button', { name: 'Submit' });

        fireEvent.change(searchInput, { target: { value: 'cat' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            const errorMessageElement = screen.getByText(`Error: ${errorMessage}`);
            expect(errorMessageElement).toBeInTheDocument();
        });

        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(axios.post).toHaveBeenCalledWith(
            '/picture',
            expect.any(FormData),
            { responseType: 'blob' }
        );
    });
});