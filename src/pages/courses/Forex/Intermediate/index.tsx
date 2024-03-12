import { Card, Col, Row } from 'react-bootstrap';
import React, { Suspense } from 'react';
// hooks
import { usePageTitle } from '../../../../hooks';

import ReactPlayer from 'react-player'

const videos = [
    { url: 'https://vid.forexcellencenet.com/Beginner/Balance%20and%20Equity.mp4', title: 'Balance and Equity' },
    { url: 'https://vid.forexcellencenet.com/Beginner/Benefits%20of%20Using%20Candlesticks.mp4', title: 'Benefits of Using Candlesticks' },
    { url: 'https://vid.forexcellencenet.com/Beginner/Bid%20and%20Ask%20Prices.mp4', title: 'Bid and Ask Prices' },
    { url: 'https://vid.forexcellencenet.com/Beginner/Bull%20and%20Bear%20Market.mp4', title: 'Bull and Bear Market' },
    { url: 'https://vid.forexcellencenet.com/Beginner/Chart%20Types.mp4', title: 'Chart Types' },
    { url: 'https://vid.forexcellencenet.com/Beginner/History%20of%20Japanese%20Candlestick%20Analysis.mp4', title: 'History of Japanese Candlestick Analysis' },
    { url: 'https://vid.forexcellencenet.com/Beginner/How%20To%20Trade%20with%20The%20Moving%20average%20and%20RSI%20Strategy.mp4', title: 'How To Trade with The Moving average and RSI Strategy' },
    { url: 'https://vid.forexcellencenet.com/Beginner/Leverage%20and%20Margin.mp4', title: 'Leverage and Margin' },
    { url: 'https://vid.forexcellencenet.com/Beginner/Lots.mp4', title: 'Lots' },
    { url: 'https://vid.forexcellencenet.com/Beginner/Mistakes%20most%20beginners%20make%20in%20forex%20trading.mp4', title: 'Mistakes most beginners make in forex trading' },
    { url: 'https://vid.forexcellencenet.com/Beginner/Moving%20average.mp4', title: 'Moving average' },
    { url: 'https://vid.forexcellencenet.com/Beginner/Pending%20Orders.mp4', title: 'Pending Orders' },
    { url: 'https://vid.forexcellencenet.com/Beginner/RSI.mp4', title: 'RSI' },
    { url: 'https://vid.forexcellencenet.com/Beginner/Short%20and%20Long%20Position.mp4', title: 'Short and Long Position' },
    { url: 'https://vid.forexcellencenet.com/Beginner/Stop%20Loss%20and%20Take%20Profit.mp4', title: 'Stop Loss and Take Profit' },
    { url: 'https://vid.forexcellencenet.com/Beginner/support%20or%20resistance-.mp4', title: 'Support or Resistance' },
    { url: 'https://vid.forexcellencenet.com/Beginner/Technical%20indicator.mp4', title: 'Technical indicator.mp4' },
    { url: 'https://vid.forexcellencenet.com/Beginner/The%20World%20of%20Trading.mp4', title: 'The World of Trading' },
    { url: 'https://vid.forexcellencenet.com/Beginner/Timeframes%20on%20charts.mp4', title: 'Timeframes on charts.mp4' },
    { url: 'https://vid.forexcellencenet.com/Beginner/Understanding%20TREND%20&%20Trendlines.mp4', title: 'Understanding TREND & Trendlines.mp4' },
    { url: 'https://vid.forexcellencenet.com/Beginner/What%20is%20forex.mp4', title: 'What is forex' },
    { url: 'https://vid.forexcellencenet.com/Beginner/What%20is%20Fundamental%20analysis%20&%20Economic%20Calendar.mp4', title: 'What is Fundamental analysis & Economic Calendar.mp4' },
    { url: 'https://vid.forexcellencenet.com/Beginner/WHAT%20IS%20PIPS,%20POINTS%20AND%20TICKS.mp4', title: 'WHAT IS PIPS, POINTS AND TICKS.mp4' },
    { url: 'https://vid.forexcellencenet.com/Beginner/What%20is%20Technical%20Analysis.mp4', title: 'What is Technical Analysis.mp4' },

];

const IntermediateCourse = () => {
    // set pagetitle
    usePageTitle({
        title: 'Intermediate Forex Trading Master Course',
        breadCrumbItems: [
            {
                path: '/Forex Master Course/Intermediate',
                label: 'Intermediate Course',
            },
            {
                path: '/Forex Master Course/Intermediate',
                label: 'Intermediate Course',
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


export default IntermediateCourse;
