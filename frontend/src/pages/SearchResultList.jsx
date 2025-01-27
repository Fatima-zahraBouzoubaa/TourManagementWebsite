import React,{useState} from 'react'
import CommonSection from './../shared/CommonSection'
import { Container,Col,Row } from 'reactstrap'
import { useLocation } from 'react-router-dom'
import TourCard from './../shared/TourCard'
import Newsletter from './../shared/Newsletter'
const SearchResultList = () => {
  const location = useLocation()
  const [data]= useState(location.state)
  console.log(data);
  return (
    <>
    <CommonSection title="Tour Search Result" />
    <section>
      <Container>
        <Col>
          <Row>
            {
              data.length === 0 ? (<h4 className="text-center">No tour found</h4>):( data?.map(tour=> (
              <Col lg='3' className="mb-4" key={tour._id}>
                
                <TourCard tour={tour}/>
                </Col>))
                )
            }
          </Row>
        </Col>

      </Container>
    </section>
    <Newsletter />
    </>
  )
}

export default SearchResultList