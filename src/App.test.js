import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders create account form', () => {
  render(<App />);
  const createAccountElement = screen.getByText(/crear cuenta/i);
  expect(createAccountElement).toBeInTheDocument();
});

test('renders view accounts section', () => {
  render(<App />);
  const viewAccountsElement = screen.getByText(/ver cuentas/i);
  expect(viewAccountsElement).toBeInTheDocument();
});

// Agregar prueba para creación de cuenta
test('submits create account form', async () => {
  render(<App />);
  fireEvent.change(screen.getByPlaceholderText(/nombre/i), { target: { value: 'Juan' } });
  fireEvent.change(screen.getByPlaceholderText(/id de documento/i), { target: { value: '123456' } });
  fireEvent.change(screen.getByPlaceholderText(/saldo inicial/i), { target: { value: '100' } });
  fireEvent.click(screen.getByText(/crear cuenta/i));
  expect(await screen.findByText(/cuenta creada con éxito/i)).toBeInTheDocument();
});
