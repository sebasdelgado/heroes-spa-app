import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../src/auth";
import { Navbar } from "../../../src/ui";

//Esta es la funcion que se le asigna elo navigate que está en el Navbar
const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), //Exparse todo lo que viene en la libreria
    useNavigate: () => mockedUseNavigate, //Solo sobrescribimos el useNavigate
}));

describe('Pruebas en <Navbar />', () => { 

    const contextValue = {
        logged: true,
        user : {
            name: 'Juan Carlos'
        },
        logout: jest.fn()
    }

    beforeEach( () => jest.clearAllMocks() );

    test('Debe mostrar el nombre del usuario', () => {

        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect( screen.getByText('Juan Carlos')).toBeTruthy();
    });

    test('Debe llamar el logout y navigate cuando se hace click en el botón', () => { 

        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        // screen.debug();

        const botonLogout = screen.getByRole('button');

        fireEvent.click( botonLogout );

        expect( contextValue.logout ).toHaveBeenCalled();
        expect( mockedUseNavigate ).toHaveBeenCalledWith('/login', { 'replace': true })

    });
 })