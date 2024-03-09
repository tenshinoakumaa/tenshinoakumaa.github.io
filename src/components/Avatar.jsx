import { styled } from 'styled-components';

const StyledDiv = styled.div`
    border-radius: 100px;
    background-color: ${props => props.color};
    width: 80px;
    height: 80px;
    border: 1px solid black;
`;

export default function Avatar({ color }) {
    return (
        <StyledDiv color={color}>
        </StyledDiv>
    );
}