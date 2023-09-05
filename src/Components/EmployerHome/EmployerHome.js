import React from 'react'
import EmployerCard from '../EmployerCard/EmployerCard'
import { Row, Col, Container } from 'react-bootstrap'
import EmployerGraph from '../EmployerGraph/EmployerGraph'
import EmployerGraphCard from '../EmployerGraphCard/EmployerGraphCard'
import EmployerRecentActivity from '../EmployerRecentActivity/EmployerRecentActivity'
import EmployerHiredCard from '../EmployerHiredCard/EmployerHiredCard'
import css from './EmployerHome.module.css'
import Greeting from '../Greeting/Greeting'


const EmployerHome = ({ isTablet, isMobile }) => {
	return (
		<div className='mb-5'>
			<Greeting />
			<h1 className={css.heading}>Welcome to Employer dashboard</h1>
			<Row className='mb-3'>
				<Col>
					<EmployerGraph isTablet={isTablet} isMobile={isMobile} />
				</Col>
			</Row>
			<Row className='mb-3'>
				<Col xs={12} md={4} className='mb-3'>
					<EmployerCard
						heading={'Job Posted'}
						number={'50'}
						jobTitle={'Open jobs'}
						openJob={'20'}
						closedTitle={'Closed jobs'}
						closedJob={'20'}
						viewTitle={'Under view '}
						viewDetail={'10'}
						color={'rgba(234, 248, 255, 1)'} />
				</Col>
				<Col xs={12} md={4} className='mb-3'>
					<EmployerCard
						heading={'Total Applications'}
						number={'1000'}
						jobTitle={'Reviewed '}
						openJob={'200'}
						closedTitle={'Under process'}
						closedJob={'200'}
						viewTitle={'Wait to reivew'}
						viewDetail={'100'}
						color={'rgba(34, 159, 228, 0.25)'} />
				</Col>
				<Col xs={12} md={4} className='mb-3'>
					<EmployerCard
						heading={'Offer Given'}
						number={'100'}
						jobTitle={'Accepted'}
						openJob={'200'}
						closedTitle={'Rejected'}
						closedJob={'200'}
						viewTitle={'Wait listed'}
						viewDetail={'200'}
						color={'rgba(22, 118, 243, 0.35)'} />
				</Col>
			</Row>
			<Row className='mb-3'>
				<Col xs={6} >
					<EmployerGraphCard
						title={'jobs'}
						number={'216'}
						remote={'120 Remote'}
						onSite={'96 Onsite'}
						percentChange={'2'}
						backgroundImg={'job'}
						isMobile={isMobile}
					/>
				</Col>
				<Col xs={6}>
					<EmployerGraphCard
						title={'Applications'}
						number={'16'}
						remote={'6 Men'}
						onSite={'10 Women'}
						percentChange={'5'}
						backgroundImg={'application'}
						isMobile={isMobile}
					/>
				</Col>
			</Row>
			<Row className='mb-3'>
				<Col>
					<EmployerRecentActivity />
				</Col>
			</Row>
			<Row className='mb-3'>
				<Col className='mb-5'>
					<EmployerHiredCard isMobile={isMobile} />
				</Col>
			</Row>
		</div>
	)
}

export default EmployerHome
