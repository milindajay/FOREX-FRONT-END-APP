import { Card, Col, Row } from 'react-bootstrap';
import React, { Suspense } from 'react';
// hooks
import { usePageTitle } from '../../../../hooks';

import ReactPlayer from 'react-player'

const videos = [
    { url: 'https://vid.forexcellencenet.com/Intermediate/Ascending%20and%20Descending.mp4' , title: 'Ascending And Descending' },
    { url: 'https://vid.forexcellencenet.com/Intermediate/Bearish%20Double%20candle%20pattern.mp4' , title: 'Bearish Double Candle Pattern' },
    { url: 'https://vid.forexcellencenet.com/Intermediate/Bearish%20single%20candle%20pattern.mp4' , title: 'Bearish Single Candle Pattern' },
    { url: 'https://vid.forexcellencenet.com/Intermediate/Bearish%20Triple%20candle%20pattern.mp4' , title: 'Bearish Triple Candle Pattern' },
    { url: 'https://vid.forexcellencenet.com/Intermediate/Bollinger%20Bands%20Indicator.mp4' , title: 'Bollinger Bands Indicator' },
    { url: 'https://vid.forexcellencenet.com/Intermediate/Bullish%20Double%20Candle%20Patterns.mp4' , title: 'Bullish Double Candle Patterns' },
    { url: 'https://vid.forexcellencenet.com/Intermediate/bullish%20Triple%20Candle%20Pattern.mp4' , title: 'Bullish Triple Candle Pattern' },
    { url: 'https://vid.forexcellencenet.com/Intermediate/candlestick%20patterns.mp4' , title: 'Candlestick Patterns' },
    { url: 'https://vid.forexcellencenet.com/Intermediate/Correlation%20Between%20assets%20and%20Heat%20Map%20and%20Sentiment-.mp4' , title: 'Correlation Between Assets And Heat Map And Sentiment-' },
    { url: 'https://vid.forexcellencenet.com/Intermediate/Cup%20and%20Handle.mp4' , title: 'Cup And Handle' },
    { url: 'https://vid.forexcellencenet.com/Intermediate/Divergence%20trading%20strategy%20with%20Bollinger%20Bands%20and%20Momentum%20indicator.mp4' , title: 'Divergence Trading Strategy With Bollinger Bands And Momentum Indicator' },
    { url: 'https://vid.forexcellencenet.com/Intermediate/Head%20and%20Shoulders.mp4' , title: 'Head And Shoulders' },
    { url: 'https://vid.forexcellencenet.com/Intermediate/Ichimoku%20Cloud.mp4' , title: 'Ichimoku Cloud' },
    { url: 'https://vid.forexcellencenet.com/Intermediate/Indicators.mp4' , title: 'Indicators' },
    { url: 'https://vid.forexcellencenet.com/Intermediate/Neutral%20Candle%20Pattern.mp4' , title: 'Neutral Candle Pattern' },
    { url: 'https://vid.forexcellencenet.com/Intermediate/Pivot%20points.mp4' , title: 'Pivot Points' },
    { url: 'https://vid.forexcellencenet.com/Intermediate/Rising%20and%20Falling%20Wedges.mp4' , title: 'Rising And Falling Wedges' },
    { url: 'https://vid.forexcellencenet.com/Intermediate/Smart%20Money%20Concept.mp4' , title: 'Smart Money Concept' },
    { url: 'https://vid.forexcellencenet.com/Intermediate/STOCHASTIC%20INDICATOR.mp4' , title: 'Stochastic Indicator' },
    { url: 'https://vid.forexcellencenet.com/Intermediate/The%20Average%20Directional%20Index.mp4' , title: 'The Average Directional Index' },
    { url: 'https://vid.forexcellencenet.com/Intermediate/Triangles.mp4' , title: 'Triangles' },
    { url: 'https://vid.forexcellencenet.com/Intermediate/Triple%20Top%20and%20Bottom.mp4' , title: 'Triple Top And Bottom' },
    { url: 'https://vid.forexcellencenet.com/Intermediate/types%20of%20moving%20averages.mp4' , title: 'Types Of Moving Averages' },
    { url: 'https://vid.forexcellencenet.com/Intermediate/Understanding%20DIVERGENCE.mp4' , title: 'Understanding Divergence' },
    { url: 'https://vid.forexcellencenet.com/Intermediate/volume.mp4' , title: 'Volume' },

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
