import { Card, Col, Row } from 'react-bootstrap';
import React, { Suspense } from 'react';
// hooks
import { usePageTitle } from '../../../../hooks';

import ReactPlayer from 'react-player'

const videos = [
    { url: 'https://vid.forexcellencenet.com/Master/Emotional%20vs-%20Logical%20Responses%20to%20Loss.mp4' , title: 'Emotional Vs- Logical Responses To Loss' },
    { url: 'https://vid.forexcellencenet.com/Master/How%20to%20Be%20More%20Disciplined%20in%20Trading.mp4' , title: 'How To Be More Disciplined In Trading' },
    { url: 'https://vid.forexcellencenet.com/Master/Introduction%20to%20Trading%20psychology.mp4' , title: 'Introduction To Trading Psychology' },
    { url: 'https://vid.forexcellencenet.com/Master/Over-trading.mp4' , title: 'Over-Trading' },
    { url: 'https://vid.forexcellencenet.com/Master/Revenge-Trading.mp4' , title: 'Revenge-Trading' },
    { url: 'https://vid.forexcellencenet.com/Master/The%20Fear%20of%20Missing%20Out%20(FOMO).mp4' , title: 'The Fear Of Missing Out (Fomo)' },
    { url: 'https://vid.forexcellencenet.com/Master/The%20Human%20Response%20to%20Losing.mp4' , title: 'The Human Response To Losing' },
    { url: 'https://vid.forexcellencenet.com/Master/Trading%20Discipline.mp4' , title: 'Trading Discipline' },
    { url: 'https://vid.forexcellencenet.com/Master/What%20Does%20-Losing-%20Really%20Mean.mp4' , title: 'What Does -Losing- Really Mean' },
];

const MasterCourse = () => {
    // set pagetitle
    usePageTitle({
        title: 'Master Forex Trading Master Course',
        breadCrumbItems: [
            {
                path: '/Forex Master Course/Master',
                label: 'Master Course',
            },
            {
                path: '/Forex Master Course/Master',
                label: 'Master Course',
                active: true,
            },
        ],
    });

    return (

        <Row>
            {videos.map((video, index) => (
                <Col key={index} className='d-inline-block justify-content-center text-left mx-auto' xl={10}>
                    <Card>
                        <Card.Body>
                            <h4 className="header-title">{video.title}</h4>
                            <hr />
                            <div className="ratio ratio-16x9">
                                <Suspense fallback={<div>Loading Video...</div>}>
                                    <ReactPlayer
                                        url={video.url}
                                        width='100%'
                                        height='100%'
                                        controls={true}
                                        onContextMenu={(e: any) => e.preventDefault()}
                                        config={{ file: { attributes: { controlsList: 'nodownload' } } }}
                                    />
                                </Suspense>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>


    );
};


export default MasterCourse;
