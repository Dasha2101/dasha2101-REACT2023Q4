import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../components/pagination/Pagination';

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

    const pageLinks = screen.getAllByRole('link');
    expect(pageLinks).toHaveLength(totalPages);

    fireEvent.click(pageLinks[2]);
    expect(onChangePage).toHaveBeenCalledWith(3);
  });

  it('render the correct URL', () => {
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

    const pageLinks = screen.getAllByRole('link');
    pageLinks.forEach((link, index) => {
      expect(link.getAttribute('href')).toBe(`/search/${index + 1}`);
    });
  });
});
