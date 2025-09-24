import { styled } from "styled-components";

export const TransactionsTable = styled.table`
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 0.5rem;

    margin-top: 1.5rem;


    td{
        padding: 1.25rem 2rem;
        background: ${props => props.theme["gray-700"]};

        &:first-child {
            border-top-left-radius: 6px;
            border-bottom-left-radius: 6px;
        }

        &:last-child {
            border-top-right-radius: 6px;
            border-bottom-right-radius: 6px;
        }
    }

`

interface PriceHighlightProps {
    variant: 'income' | 'outcome';
}

export const PriceHighLight = styled.span<PriceHighlightProps>`
    color: ${props => props.variant === 'income' ? props.theme['green-300'] : props.theme['red-300']};
`

export const ButtonPageContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
`

interface ButtonProps {
    active?: boolean
}

export const ButtonPage = styled.button<ButtonProps>`
    width: ${props => props.active ? "2rem" : "2.6rem"};
    height: ${props => props.active ? "2rem" : "2.6rem"};

    display: flex;
    align-items: center;
    justify-content: center;

    background: ${props => props.active ? props.theme['green-700'] : props.theme['green-500']};
    color: ${props => props.theme.white};

    margin-top: 1rem;
    margin-bottom: 1rem;

    cursor: pointer;
    font-weight: bold;
    border: 0;
    border-radius: 6px;

    transition: background-color 0.2s;

    &:hover{
        background: ${props => props.theme['green-700']};
    }

`