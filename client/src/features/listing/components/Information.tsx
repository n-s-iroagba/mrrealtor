import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "react-bootstrap";

const Information:React.FC<{title:string,description:string}> = ({
    title,
    description
})=>{

    return (
        <Row className='d-flex align-items-center'>
       <Col xs={2}>
        <FontAwesomeIcon className='h-50' icon={faHouse}/>
       </Col>
     
        <Col xs={10}>
        <h6 className='mb-0'>{title}</h6>
    <p className='mb-0'>{description}</p>
    </Col>
       </Row>
    
    );
}
export default Information;