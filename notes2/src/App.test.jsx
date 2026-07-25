import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';
import noteService from './services/notes';

vi.mock('./services/notes', () => ({
  default: {
    getAll: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delNote: vi.fn(),
  },
}));

const initialNotes = [
  { id: 1, content: 'Learn React testing', important: false },
];

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    noteService.getAll.mockResolvedValue({ data: initialNotes });
  });

  it('renders notes loaded from the service', async () => {
    render(<App />);

    expect(await screen.findByText('Learn React testing')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'make important' }),
    ).toBeInTheDocument();
  });

  it('updates a note\'s importance', async () => {
    const updatedNote = { ...initialNotes[0], important: true };
    noteService.update.mockResolvedValue(updatedNote);
    render(<App />);

    await screen.findByText('Learn React testing');
    fireEvent.click(screen.getByRole('button', { name: 'make important' }));

    await waitFor(() => {
      expect(noteService.update).toHaveBeenCalledWith(1, {
        ...initialNotes[0],
        important: true,
      });
    });
    expect(
      await screen.findByRole('button', { name: 'make not important' }),
    ).toBeInTheDocument();
  });

  it('creates a new note from the form', async () => {
    const newNote = { id: 2, content: 'Test note creation', important: false };
    noteService.create.mockResolvedValue(newNote);
    render(<App />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: newNote.content } });
    fireEvent.click(screen.getByRole('button', { name: 'save' }));

    await waitFor(() => {
      expect(noteService.create).toHaveBeenCalledWith({
        content: newNote.content,
        important: expect.any(Boolean),
      });
    });
    expect(await screen.findByText(newNote.content)).toBeInTheDocument();
    expect(input).toHaveValue('');
  });
});
