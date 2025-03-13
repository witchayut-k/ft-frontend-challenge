import { render, screen } from '@testing-library/react';
import Index from '../../_temp/index';

describe('Home', () => {
  it('renders without errors', () => {
    const { container } = render(<Index />);
    expect(container).toBeDefined();
  });
});