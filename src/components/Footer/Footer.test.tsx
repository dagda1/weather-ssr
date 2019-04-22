import { Footer } from '.';
import { wrapComponentInReduxForTesting } from '../../tests';

describe('<Footer />', () => {
  it('should render footer', () => {
    const footer = wrapComponentInReduxForTesting(Footer, {}, {});

    expect(footer.find(Footer)).toHaveLength(1);
  });
});
