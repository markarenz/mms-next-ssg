import '@testing-library/jest-dom';
// import '@testing-library/jest-dom/extend-expect';

const observe = jest.fn();
const unobserve = jest.fn();
const disconnect = jest.fn();
window.IntersectionObserver = jest.fn(() => ({
  observe,
  unobserve,
  disconnect,
}));

afterEach(() => {
  jest.clearAllMocks();
});
