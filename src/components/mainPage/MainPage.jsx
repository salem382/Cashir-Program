import Pill from "../pill/Pill";
import PillControls from "../pillControls/PillControlls";
import {Container} from 'react-bootstrap';

const MainPage = () => {

    return (
        <>
            <Container>
                <div className="d-flex">
                    <PillControls />
                    <Pill />
                </div>
            </Container>
        </>
    )
}

export default MainPage;