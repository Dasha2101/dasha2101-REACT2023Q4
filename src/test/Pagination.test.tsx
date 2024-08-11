import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../components/pagination/Pagination';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('Pagination Component', () => {
  it('call onChangePage', () => {
    const onChangePage = vi.fn();
    const currentPage = 1;
    const totalPages = 5;

    render(
      <Pagination
        currentPage={currentPage}
        total={totalPages}
        onChangePage={onChangePage}
      />
    );

    const pageButtons = screen.getAllByRole('button');
    expect(pageButtons).toHaveLength(totalPages);

    fireEvent.click(pageButtons[1]);
    expect(onChangePage).toHaveBeenCalledWith(2);
  });

  it('highlights current page btn', () => {
    const onChangePage = vi.fn();
    const currentPage = 3;
    const totalPages = 5;

    render(
      <Pagination
        currentPage={currentPage}
        total={totalPages}
        onChangePage={onChangePage}
      />
    );

    const pageButtons = screen.getAllByRole('button');
    const activeButton = pageButtons.find(
      (button) => button.textContent === '3'
    );

    expect(activeButton?.getAttribute('class')).toContain('active');

    pageButtons.forEach((button) => {
      if (button.textContent !== '3') {
        expect(button.getAttribute('class')).not.toContain('active');
      }
    });
  });
});
