import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../src/auth";
import { PrivateRoute } from "../../src/router/PrivateRoute";
import { MemoryRouter } from "react-router-dom";

describe('Pruebas en el <PrivateRoute />', () => { 

    test('Debe mostrar el children si está autenticado', () => { 

        Storage.prototype.setItem = jest.fn();

        const contextValue = {
            logged: true,
            user: {
                id: 'abc',
                name: 'Juan Carlos'
            }
        }

        render(
            <AuthContext.Provider value = { contextValue }>
                {/* Proporcionamos el router con MemoryRouter  */}
                <MemoryRouter initialEntries={['/search?q=batman']}> 
                    <PrivateRoute>
                        <h1>Ruta privada</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        screen.debug();

        expect( screen.getByText('Ruta privada')).toBeTruthy();

        expect( localStorage.setItem ).toHaveBeenLastCalledWith("lastpath","/search?q=batman");

     })
 })