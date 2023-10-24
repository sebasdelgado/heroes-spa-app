import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { SearchPage } from "../../../src/heroes/pages/SearchPage"


//Esta es la funcion que se le asigna elo navigate que está en el Navbar
const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), //Exparse todo lo que viene en la libreria
    useNavigate: () => mockedUseNavigate, //Solo sobrescribimos el useNavigate
}));

describe('Pruebas en <SearchPage />', () => {

    beforeEach( () => jest.clearAllMocks() );

    test('Deba mostrarse correctamente con valores por defecto', () => { 

        const { container } = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        );

        expect( container ).toMatchSnapshot();

    });

    test('Deba mostrar a batman y el input con el valor de queryString', () => { 

        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox');
        expect( input.value ).toBe('batman');

        const img = screen.getByRole('img');

        expect( img.src ).toContain('/assets/heroes/dc-batman.jpg');

        const alert = screen.getByLabelText('alert-danger');

        expect( alert.style.display ).toBe('none');

    });

    test('Debe mostrar un error si no se encuentra el hero (batman123)', () => { 

        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage />
            </MemoryRouter>
        );

        const alert = screen.getByLabelText('alert-danger');
        expect( alert.style.display ).toBe('');

    });

    test('Debe llamar el navigate a la pantalla nueva', () => { 

        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage />
            </MemoryRouter>
        );

        const inputValue = 'superman';

        const input = screen.getByRole('textbox');
        const form = screen.getByRole('form');

        fireEvent.input( input, { target: { name: 'searchText', value: inputValue } } );

        fireEvent.submit( form );

        screen.debug();
        
        
        expect( mockedUseNavigate ).toHaveBeenCalledWith(`?q=${inputValue}`);

    });



});