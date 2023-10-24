import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../src/auth";
import { PublicRoute } from "../../src/router/PublicRoute";
import { MemoryRouter, Route, Routes } from "react-router-dom";


describe('Pruebas en <PublicRoute />', () => {

    test('Debe mostrar el children si no está aunteticado', () => {

        const contextValue = {
            logged: false
        }

        render(
            <AuthContext.Provider value = { contextValue }>
                <PublicRoute>
                    <h1>Ruta pública</h1>
                </PublicRoute>
            </AuthContext.Provider>
        )

        screen.debug();


        expect( screen.getByText('Ruta pública')).toBeTruthy();
    });

    test('Debe navegar si está aunteticado', () => {

        const contextValue = {
            logged: true,
            user: {
                name: 'Strider',
                id: 'ABC123'
            }
        }

        render(
            <AuthContext.Provider value = { contextValue }>
                {/*Necesito el MemoryRouter para poder hacer uso del navigate */}
                <MemoryRouter initialEntries={['/login']}>
                    <Routes>
                        <Route path="login" element={
                            <PublicRoute>
                                <h1>Ruta pública</h1>
                            </PublicRoute>
                        }/>
                        <Route path="marvel" element={<h1>Página de Marvel</h1>}/>
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        screen.debug();
        
        expect( screen.getByText('Página de Marvel')).toBeTruthy();
    });
})
